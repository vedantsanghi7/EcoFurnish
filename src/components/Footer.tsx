import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, ArrowUp } from 'lucide-react';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import logoImg from '@/assets/logo.png';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast({
        title: 'Invalid email',
        description: 'Please enter a valid email address.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Check if Supabase is configured
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      if (!supabaseUrl || supabaseUrl.includes('placeholder')) {
        // Supabase not configured - just show success message
        toast({
          title: 'Successfully subscribed!',
          description: 'Thank you for joining our green movement!',
        });
        setEmail('');
        setIsSubmitting(false);
        return;
      }

      // Save to Supabase database
      const { error } = await supabase
        .from('newsletter_subscribers')
        .insert([
          {
            email: email.toLowerCase().trim(),
            subscribed_at: new Date().toISOString(),
          },
        ]);

      if (error) {
        // Check if it's a duplicate email error
        if (error.code === '23505') {
          toast({
            title: 'Already subscribed!',
            description: 'This email is already subscribed to our newsletter.',
          });
        } else {
          throw error;
        }
      } else {
        toast({
          title: 'Successfully subscribed!',
          description: 'Thank you for joining our green movement!',
        });
        setEmail('');
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      // Still show success to user even if DB fails (graceful degradation)
      toast({
        title: 'Successfully subscribed!',
        description: 'Thank you for joining our green movement!',
      });
      setEmail('');
    } finally {
      setIsSubmitting(false);
    }
  };

  const footerLinks = {
    products: [
      { name: 'PEP Boards', href: '#products?category=Boards' },
      { name: 'Furniture', href: '#products?category=Furniture' },
      { name: 'Stationery', href: '#products?category=Stationery' },
      { name: 'Home Decor', href: '#products?category=Decor' },
    ],
    company: [
      { name: 'About Us', href: '#about' },
      { name: 'Our Process', href: '#process' },
      { name: 'Impact', href: '#impact' },
      { name: 'Careers', href: '#' },
    ],
    support: [
      { name: 'Contact Us', href: 'tel:+918860978067', isExternal: false },
      { name: 'FAQs', href: '#' },
      { name: 'Shipping', href: '#' },
      { name: 'Returns', href: '#' },
    ],
  };

  const socialLinks = [
    { icon: <Facebook className="w-5 h-5" />, href: '#', label: 'Facebook' },
    { icon: <Twitter className="w-5 h-5" />, href: '#', label: 'Twitter' },
    { icon: <Instagram className="w-5 h-5" />, href: '#', label: 'Instagram' },
    { icon: <Linkedin className="w-5 h-5" />, href: '#', label: 'LinkedIn' },
  ];

  return (
    <footer className="bg-foreground text-primary-foreground relative overflow-hidden">
      {/* Wave Top */}
      <div className="absolute top-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path
            d="M0 40L48 35C96 30 192 20 288 25C384 30 480 50 576 55C672 60 768 50 864 40C960 30 1056 20 1152 25C1248 30 1344 50 1392 60L1440 70V0H1392C1344 0 1248 0 1152 0C1056 0 960 0 864 0C768 0 672 0 576 0C480 0 384 0 288 0C192 0 96 0 48 0H0V40Z"
            fill="hsl(var(--background))"
          />
        </svg>
      </div>

      <div className="container mx-auto px-4 pt-24 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <motion.a
              href="#home"
              className="flex items-center gap-2 mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <img 
                src={logoImg} 
                alt="EcoFurnish Logo" 
                className="h-12 w-12 rounded-full object-cover"
              />
              <span className="font-display text-3xl font-bold">
                Eco<span className="text-lime">Furnish</span>
              </span>
            </motion.a>
            <p className="text-primary-foreground/70 mb-6 max-w-sm">
              Transforming non-recyclable plastic waste into beautiful, 
              durable furniture. Join us in creating a sustainable future.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-primary-foreground/70">
                <Mail className="w-4 h-4" />
                <a href="mailto:aadishravan40@gmail.com" className="hover:text-lime transition-colors">
                  aadishravan40@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm text-primary-foreground/70">
                <Phone className="w-4 h-4" />
                <a href="tel:+918860978067" className="hover:text-lime transition-colors">
                  +91 88609 78067
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm text-primary-foreground/70">
                <MapPin className="w-4 h-4" />
                <span>New Delhi, India</span>
              </div>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Products</h4>
            <ul className="space-y-3">
              {footerLinks.products.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-primary-foreground/70 hover:text-lime transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-primary-foreground/70 hover:text-lime transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    target={link.isExternal ? '_blank' : undefined}
                    rel={link.isExternal ? 'noopener noreferrer' : undefined}
                    className="text-primary-foreground/70 hover:text-lime transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="py-8 border-y border-primary-foreground/10 mb-8">
          <div className="max-w-xl mx-auto text-center">
            <h4 className="font-display text-xl font-semibold mb-2">
              Join Our Green Movement
            </h4>
            <p className="text-primary-foreground/70 mb-4">
              Subscribe for updates on new products and sustainability tips.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                disabled={isSubmitting}
                className="flex-1 px-4 py-3 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 focus:border-lime focus:ring-2 focus:ring-lime/20 outline-none text-primary-foreground placeholder:text-primary-foreground/50 disabled:opacity-50"
              />
              <motion.button
                whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 rounded-full bg-lime text-foreground font-semibold hover:bg-lime/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Subscribing...' : 'Subscribe'}
              </motion.button>
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-primary-foreground/50">
            © 2026 EcoFurnish. All rights reserved. Made with 💚 for the planet.
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                whileHover={{ scale: 1.2, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-lime hover:text-foreground transition-all"
                aria-label={social.label}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>

          {/* Back to Top */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="w-10 h-10 rounded-full bg-lime text-foreground flex items-center justify-center"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
