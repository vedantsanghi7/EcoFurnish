import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/lib/supabase';
import type { User as SupabaseUser } from '@supabase/supabase-js';

interface User {
  id: string;
  email: string;
  name: string;
  avatar_url?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAuthModalOpen: boolean;
  authMode: 'login' | 'signup';
  setIsAuthModalOpen: (open: boolean) => void;
  setAuthMode: (mode: 'login' | 'signup') => void;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [loading, setLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    // Check initial session
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) {
        console.warn('Supabase session check error:', error);
      }
      if (session?.user) {
        loadUserProfile(session.user).catch(console.error);
      }
      setLoading(false);
    }).catch((error) => {
      console.warn('Supabase not configured:', error);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event, session?.user?.email);
      if (session?.user) {
        await loadUserProfile(session.user).catch(console.error);
      } else {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const loadUserProfile = async (supabaseUser: SupabaseUser) => {
    try {
      // Try to get profile from profiles table
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', supabaseUser.id)
        .single();

      if (profile && !profileError) {
        const userData = {
          id: supabaseUser.id,
          email: supabaseUser.email || '',
          name: profile.name || supabaseUser.user_metadata?.full_name || supabaseUser.email?.split('@')[0] || 'User',
          avatar_url: profile.avatar_url || supabaseUser.user_metadata?.avatar_url,
        };
        console.log('Setting user from profile:', userData);
        setUser(userData);
      } else {
        // Create profile if it doesn't exist
        const name = supabaseUser.user_metadata?.full_name || supabaseUser.email?.split('@')[0] || 'User';
        const { error } = await supabase.from('profiles').insert({
          id: supabaseUser.id,
          email: supabaseUser.email,
          name: name,
          avatar_url: supabaseUser.user_metadata?.avatar_url,
        });

        const userData = {
          id: supabaseUser.id,
          email: supabaseUser.email || '',
          name: name,
          avatar_url: supabaseUser.user_metadata?.avatar_url,
        };
        console.log('Setting user (new profile):', userData);
        setUser(userData);
      }
    } catch (error) {
      console.error('Error loading user profile:', error);
      // Fallback to basic user info
      const userData = {
        id: supabaseUser.id,
        email: supabaseUser.email || '',
        name: supabaseUser.user_metadata?.full_name || supabaseUser.email?.split('@')[0] || 'User',
        avatar_url: supabaseUser.user_metadata?.avatar_url,
      };
      console.log('Setting user (fallback):', userData);
      setUser(userData);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Login error:', error);
        return false;
      }

      if (data.user) {
        // Immediately load user profile to update state
        await loadUserProfile(data.user);
        setIsAuthModalOpen(false);
        // Force a re-render by checking session again
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          await loadUserProfile(session.user);
        }
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
          },
        },
      });

      if (error) {
        console.error('Signup error:', error);
        return false;
      }

      if (data.user) {
        // Create profile
        await supabase.from('profiles').insert({
          id: data.user.id,
          email: data.user.email,
          name: name,
        });

        // Immediately load user profile to update state
        await loadUserProfile(data.user);
        setIsAuthModalOpen(false);
        // Force a re-render by checking session again
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          await loadUserProfile(session.user);
        }
        return true;
      }
      return false;
    } catch (error) {
      console.error('Signup error:', error);
      return false;
    }
  };

  const loginWithGoogle = async (): Promise<void> => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}`,
        },
      });

      if (error) {
        console.error('Google login error:', error);
      }
      // Modal will close automatically after redirect
    } catch (error) {
      console.error('Google login error:', error);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await supabase.auth.signOut();
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Don't block rendering - just show app while checking session
  // if (loading) {
  //   return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  // }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAuthModalOpen,
        authMode,
        setIsAuthModalOpen,
        setAuthMode,
        login,
        signup,
        loginWithGoogle,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
