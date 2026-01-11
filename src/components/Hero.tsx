import { motion } from 'framer-motion';
import { ArrowDown, Recycle, TreePine, Factory, BicepsFlexed } from 'lucide-react';
import heroImage from '@/assets/hero-illustration.png';
import chipsPacketImg from '@/assets/emojis.com chips-packet-in-red-color.png';
import plasticBottle2LtrImg from '@/assets/emojis.com plastic-bottle-with-2-litr-text.png';
import plasticBottlePinkImg from '@/assets/emojis.com plastic-bottle-with-crystaline-pink-liquid.png';

const Hero = () => {
  const floatingPlasticItems = [
    { image: plasticBottle2LtrImg, delay: 0, x: '10%', y: '20%', rotation: -15 },
    { image: plasticBottle2LtrImg, delay: 0.5, x: '85%', y: '30%', rotation: 20 },
    { image: plasticBottlePinkImg, delay: 1, x: '75%', y: '70%', rotation: 25 },
    { image: plasticBottle2LtrImg, delay: 1.5, x: '15%', y: '65%', rotation: -20 },
    { image: plasticBottlePinkImg, delay: 2, x: '5%', y: '45%', rotation: 10 },
    { image: plasticBottlePinkImg, delay: 2.5, x: '90%', y: '55%', rotation: -25 },
  ];

  return (
    <section id="home" className="relative min-h-screen overflow-hidden wave-bg">
      {/* Floating plastic items */}
      {floatingPlasticItems.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 100, rotate: 0 }}
          animate={{ 
            opacity: 0.4, 
            y: 0,
            rotate: item.rotation,
          }}
          transition={{ delay: item.delay, duration: 1 }}
          className="absolute animate-float-slow pointer-events-none"
          style={{ 
            left: item.x, 
            top: item.y,
            animationDelay: `${item.delay}s`,
            transformOrigin: 'center center'
          }}
        >
          <motion.img 
            src={item.image} 
            alt="Plastic waste item" 
            className="w-16 h-16 md:w-24 md:h-24 object-contain drop-shadow-lg"
            animate={{
              y: [0, -10, 0],
              rotate: [item.rotation, item.rotation + 5, item.rotation],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: item.delay
            }}
          />
        </motion.div>
      ))}

      <div className="container mx-auto px-4 pt-32 pb-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/20 backdrop-blur-sm text-foreground mb-6"
            >
              <Recycle className="w-4 h-4" />
              <span className="text-sm font-medium">Transforming Waste Into Wonder</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight mb-6"
            >
              From{' '}
              <span className="relative inline-block">
                <span className="relative z-10">Plastic Waste</span>
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  className="absolute bottom-2 left-0 right-0 h-3 bg-coral/30 -z-0 origin-left"
                />
              </span>
              <br />
              To{' '}
              <span className="text-primary">Beautiful</span>{' '}
              Furniture
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl text-foreground/80 mb-8 max-w-xl mx-auto lg:mx-0"
            >
              EcoFurnish creates stunning, durable furniture from non-recyclable plastic using innovative epoxy technology. 
              Join us in protecting the planet while furnishing your dreams.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <motion.a
                href="#products"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="eco-button-primary text-lg"
              >
                Shop Now
              </motion.a>
              <motion.a
                href="#process"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="eco-button-secondary text-lg"
              >
                Learn Our Process
              </motion.a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-3 gap-4 mt-12 pt-8 border-t border-foreground/10"
            >
              {[
                { icon: <Factory className="w-5 h-5" />, value: '70%', label: 'Cost Reduction' },
                { icon: <Recycle className="w-5 h-5" />, value: '100%', label: 'Recyclable' },
                { icon: <BicepsFlexed className="w-5 h-5" />, value: '40%', label: (
                  <>
                    Increase in<br />Tensile Strength
                  </>
                ) },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/20 text-primary mb-2">
                    {stat.icon}
                  </div>
                  <div className="font-display text-2xl md:text-3xl font-bold text-foreground">
                    {stat.value}
                  </div>
                  <div className="text-sm text-foreground/60">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="relative z-10">
              <motion.img
                src={heroImage}
                alt="EcoFurnish - Transforming Plastic Waste"
                className="w-full max-w-lg mx-auto rounded-3xl shadow-2xl"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />
              
              {/* Decorative Elements */}
              <motion.div
                className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-lime/50 blur-xl"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              <motion.div
                className="absolute -bottom-4 -left-4 w-32 h-32 rounded-full bg-coral/30 blur-2xl"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 5, repeat: Infinity }}
              />
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.a
            href="#products"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-foreground/60 hover:text-primary transition-colors"
          >
            <span className="text-sm font-medium">Scroll to explore</span>
            <ArrowDown className="w-5 h-5" />
          </motion.a>
        </motion.div>
      </div>

      {/* Wave Bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path
            d="M0 60L48 55C96 50 192 40 288 45C384 50 480 70 576 75C672 80 768 70 864 60C960 50 1056 40 1152 45C1248 50 1344 70 1392 80L1440 90V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0V60Z"
            fill="hsl(var(--background))"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
