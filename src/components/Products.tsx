import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { ShoppingBag, Plus } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

// Import product images
import pepBoardImg from '@/assets/pep-board-product.png';
import ecoTableImg from '@/assets/eco-table.png';
import ecoShelfImg from '@/assets/eco-shelf.png';
import ecoBenchImg from '@/assets/eco-bench.png';
import PencilBoxImg from '@/assets/pencil-box.png';
import ChairImg from '@/assets/chair.png';

const products = [
  {
    id: '1',
    name: 'PEP Board (1 m²)',
    description: 'Waterproof, insect-resistant board made from 100% recycled plastic',
    price: 425,
    image: pepBoardImg,
    category: 'Boards',
    features: ['Waterproof', 'UV Resistant', 'Fire Safe'],
    badge: 'Best Seller',
  },
  {
    id: '2',
    name: 'Pencil Box',
    description: 'Premium handcrafted pencil box made from recycled PEP composite',
    price: 129,
    image: PencilBoxImg,
    category: 'Stationery',
    features: ['Lightweight', 'Durable', 'Scratch Resistant'],
  },
  {
    id: '3',
    name: 'Wave Dining Table',
    description: 'Stunning dining table with ocean-wave pattern from recycled plastic',
    price: 12500,
    image: ecoTableImg,
    category: 'Furniture',
    features: ['6 Seater', 'Scratch Resistant', 'Easy Clean'],
  },
  {
    id: '4',
    name: 'Bookshelf',
    description: 'Modern 5-tier bookshelf crafted from recycled PEP boards',
    price: 4800,
    image: ecoShelfImg,
    category: 'Furniture',
    features: ['5 Tiers', 'Wall Mount', 'Lightweight'],
  },
  {
    id: '5',
    name: 'Garden Bench',
    description: 'Weather-resistant outdoor bench perfect for gardens and patios',
    price: 3200,
    image: ecoBenchImg,
    category: 'Outdoor',
    features: ['All Weather', '3 Seater', '10yr Warranty'],
    badge: 'New',
  },
  {
    id: '6',
    name: 'Chair',
    description: 'Minimal chair in recycled PEP composite with natural wood finish',
    price: 800,
    image: ChairImg,
    category: 'Furniture',
    features: ['Waterproof', 'Low Maintenance', 'Sustainable'],
  },
];

const categories = ['All', 'Boards', 'Furniture', 'Outdoor', 'Stationery', 'Decor'];

const ProductCard = ({ product, index }: { product: typeof products[0]; index: number }) => {
  const { addToCart } = useCart();
  const { isAuthenticated, setIsAuthModalOpen, setAuthMode } = useAuth();
  const { toast } = useToast();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      setAuthMode('login');
      setIsAuthModalOpen(true);
      toast({
        title: "Please login first",
        description: "You need to be logged in to add items to cart",
      });
      return;
    }
    
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
    });
    
    toast({
      title: "Added to cart!",
      description: `${product.name} has been added to your cart`,
    });
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <div className="eco-card overflow-hidden h-full flex flex-col">
        {/* Image Container */}
        <div className="relative overflow-hidden rounded-xl aspect-square mb-4">
          <motion.img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          
          {product.badge && (
            <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold ${
              product.badge === 'Best Seller' 
                ? 'bg-coral text-white' 
                : 'bg-lime text-foreground'
            }`}>
              {product.badge}
            </span>
          )}
          
          {/* Quick Add Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileHover={{ scale: 1.1 }}
            onClick={handleAddToCart}
            className="absolute bottom-3 right-3 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-eco-glow"
          >
            <Plus className="w-6 h-6" />
          </motion.button>
        </div>
        
        {/* Content */}
        <div className="flex-1 flex flex-col">
          <span className="text-xs font-medium text-primary uppercase tracking-wider">
            {product.category}
          </span>
          <h3 className="font-display text-xl font-semibold text-foreground mt-1 mb-2">
            {product.name}
          </h3>
          <p className="text-sm text-muted-foreground mb-4 flex-1">
            {product.description}
          </p>
          
          {/* Features */}
          <div className="flex flex-wrap gap-2 mb-4">
            {product.features.map((feature, i) => (
              <span
                key={i}
                className="px-2 py-1 text-xs bg-ocean-light/50 text-ocean-dark rounded-md"
              >
                {feature}
              </span>
            ))}
          </div>
          
          {/* Price & CTA */}
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div>
              <span className="text-2xl font-bold text-foreground">₹{product.price.toLocaleString()}</span>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddToCart}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium transition-all hover:shadow-eco-glow"
            >
              <ShoppingBag className="w-4 h-4" />
              Add to Cart
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Products = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Check URL parameters for category filter (works with hash routing)
  useEffect(() => {
    // Handle both hash-based (#products?category=Stationery) and regular query params
    const hash = window.location.hash;
    const hashMatch = hash.match(/[?&]category=([^&]+)/);
    const categoryParam = hashMatch 
      ? decodeURIComponent(hashMatch[1]) 
      : new URLSearchParams(window.location.search).get('category');
    
    if (categoryParam && categories.includes(categoryParam)) {
      setSelectedCategory(categoryParam);
      // Scroll to products section
      setTimeout(() => {
        document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, []);

  // Filter products based on selected category
  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    // Update URL hash without page reload (for hash-based routing)
    const currentHash = window.location.hash.split('?')[0] || '#products';
    if (category === 'All') {
      window.history.pushState({}, '', currentHash);
    } else {
      window.history.pushState({}, '', `${currentHash}?category=${encodeURIComponent(category)}`);
    }
  };

  return (
    <section id="products" className="eco-section bg-background relative pb-3 md:pb-4">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-lime/20 text-secondary-foreground text-sm font-medium mb-4">
            Our Products
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Sustainable Furniture,{' '}
            <span className="text-primary">Stunning Design</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Each piece is crafted from non-recyclable plastic waste, 
            transforming environmental problems into beautiful solutions for your space.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => handleCategoryClick(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                category === selectedCategory
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground">No products found in this category.</p>
            </div>
          )}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-3 mb-2"
        >
          <p className="text-muted-foreground mb-4">
            Looking for custom sizes or bulk orders?
          </p>
          <motion.a
            href="tel:+918860978067"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="eco-button-secondary inline-block"
          >
            Contact for Custom Orders
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Products;
