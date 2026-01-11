import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from './AuthContext';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  category: string;
}

interface CartItemDB {
  id: string;
  user_id: string;
  product_id: string;
  quantity: number;
  product_data?: {
    name: string;
    price: number;
    image: string;
    category: string;
  };
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { isAuthenticated, user } = useAuth();

  // Load cart from Supabase when user logs in
  useEffect(() => {
    if (isAuthenticated && user) {
      loadCartFromDB();
    } else {
      // Clear cart when user logs out
      setItems([]);
    }
  }, [isAuthenticated, user?.id]);

  const loadCartFromDB = async () => {
    if (!user?.id) return;
    
    try {
      const { data, error } = await supabase
        .from('cart_items')
        .select('*')
        .eq('user_id', user.id);

      if (error) {
        console.error('Error loading cart:', error);
        return;
      }

      if (data && data.length > 0) {
        // Convert DB items to CartItem format
        const cartItems: CartItem[] = data
          .map((dbItem: any) => {
            // product_data is stored as JSONB in Supabase
            const productData = dbItem.product_data;

            // If product_data exists, use it
            if (productData && typeof productData === 'object') {
              return {
                id: dbItem.product_id,
                name: productData.name || 'Product',
                price: productData.price || 0,
                image: productData.image || '',
                category: productData.category || '',
                quantity: dbItem.quantity,
              };
            }
            
            // Fallback: create minimal cart item (shouldn't happen if data was saved correctly)
            return null;
          })
          .filter((item: CartItem | null) => item !== null) as CartItem[];
        
        setItems(cartItems);
      }
    } catch (error) {
      console.error('Error loading cart from database:', error);
    }
  };

  const saveCartToDB = async (cartItems: CartItem[]) => {
    if (!user?.id || !isAuthenticated) return;

    try {
      // Get current cart items from DB
      const { data: existingItems } = await supabase
        .from('cart_items')
        .select('*')
        .eq('user_id', user.id);

      // Delete all existing items
      if (existingItems && existingItems.length > 0) {
        await supabase
          .from('cart_items')
          .delete()
          .eq('user_id', user.id);
      }

      // Insert new items
      if (cartItems.length > 0) {
        const itemsToInsert = cartItems.map(item => ({
          user_id: user.id,
          product_id: item.id,
          quantity: item.quantity,
          product_data: {
            name: item.name,
            price: item.price,
            image: item.image,
            category: item.category,
          },
        }));

        const { error } = await supabase
          .from('cart_items')
          .upsert(itemsToInsert, { onConflict: 'user_id,product_id' });

        if (error) {
          console.error('Error saving cart:', error);
        }
      }
    } catch (error) {
      console.error('Error saving cart to database:', error);
    }
  };

  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    setItems(prev => {
      const existingItem = prev.find(i => i.id === item.id);
      let newItems;
      if (existingItem) {
        newItems = prev.map(i =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        newItems = [...prev, { ...item, quantity: 1 }];
      }
      
      // Save to DB if authenticated
      if (isAuthenticated) {
        saveCartToDB(newItems);
      }
      
      return newItems;
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setItems(prev => {
      const newItems = prev.filter(item => item.id !== id);
      
      // Save to DB if authenticated
      if (isAuthenticated) {
        saveCartToDB(newItems);
      }
      
      return newItems;
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setItems(prev => {
      const newItems = prev.map(item => (item.id === id ? { ...item, quantity } : item));
      
      // Save to DB if authenticated
      if (isAuthenticated) {
        saveCartToDB(newItems);
      }
      
      return newItems;
    });
  };

  const clearCart = () => {
    setItems([]);
    
    // Clear from DB if authenticated
    if (isAuthenticated && user?.id) {
      supabase
        .from('cart_items')
        .delete()
        .eq('user_id', user.id)
        .then(({ error }) => {
          if (error) console.error('Error clearing cart:', error);
        });
    }
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
