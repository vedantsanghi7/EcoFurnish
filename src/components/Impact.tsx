import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Droplets, Factory, Flame, Shield, Recycle, Dumbbell,BicepsFlexed, BadgeCheck } from 'lucide-react';

const stats = [
  {
    icon: <Factory className="w-8 h-8" />,
    value: 70,
    suffix: '%',
    label: 'Cost Reduction',
    description: 'Compared to traditional wood',
  },
  {
    icon: <Droplets className="w-8 h-8" />,
    value: 100,
    suffix: '%',
    label: 'Waterproof',
    description: 'Zero moisture absorption',
  },
  {
    icon: <BicepsFlexed className="w-8 h-8" />,
    value: 40,
    suffix: '%',
    label: 'Increase in Tensile Strength',
    description: 'Compared to traditional wood',
  },
  {
    icon: <BadgeCheck className="w-8 h-8" />,
    value: 40,
    suffix: '%',
    label: 'Immediate Audience',
    description: 'Willing to Buy our sample products',
  },
];

const properties = [
  { icon: <Flame className="w-5 h-5" />, title: 'Fire Resistant', desc: '1000°C ignition point' },
  { icon: <Shield className="w-5 h-5" />, title: 'UV Resistant', desc: 'No sun damage' },
  { icon: <Droplets className="w-5 h-5" />, title: 'Chemical Resistant', desc: 'Safe for any use' },
  { icon: <Recycle className="w-5 h-5" />, title: '100% Recyclable', desc: 'Same process again' },
];

const AnimatedCounter = ({ value, suffix = '', duration = 2 }: { value: number; suffix?: string; duration?: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);
      
      // Easing function
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * value));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, value, duration]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  );
};

const Impact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="impact" className="eco-section bg-foreground text-primary-foreground relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-lime/20 text-lime text-sm font-medium mb-4">
            Our Impact
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Making a{' '}
            <span className="text-lime">Real Difference</span>
          </h2>
          <p className="text-lg text-primary-foreground/80">
            Every product you purchase contributes to reducing plastic waste 
            and protecting our forests. Here's the impact we've made together.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-20">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center p-6 rounded-2xl bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/10"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-lime/20 text-lime mb-4">
                {stat.icon}
              </div>
              <div className="font-display text-3xl md:text-4xl font-bold text-lime mb-1">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="font-semibold text-primary-foreground mb-1">
                {stat.label}
              </div>
              <div className="text-sm text-primary-foreground/60">
                {stat.description}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h3 className="font-display text-2xl md:text-3xl font-bold text-center mb-8">
            PEP Boards vs Traditional Wood
          </h3>
          
          <div className="overflow-hidden rounded-2xl border border-primary-foreground/20">
            <table className="w-full">
              <thead>
                <tr className="bg-lime/20">
                  <th className="text-left p-4 font-semibold">Property</th>
                  <th className="text-center p-4 font-semibold text-lime">PEP Board</th>
                  <th className="text-center p-4 font-semibold text-coral-light">Wood</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-primary-foreground/10">
                {[
                  ['Waterproof', '100%', 'No'],
                  ['Insect Resistant', 'Yes', 'No'],
                  ['Tensile Strength', '7000-10000 psi', '~4000 psi'],
                  ['UV Resistant', 'Highly', 'Low'],
                  ['Maintenance', 'Negligible', 'Regular'],
                  ['Recyclable', 'Yes', 'Limited'],
                  ['Cost (8x4 ft)', '₹350', '₹1200+'],
                ].map(([prop, pep, wood], index) => (
                  <tr key={index} className="hover:bg-primary-foreground/5 transition-colors">
                    <td className="p-4 font-medium">{prop}</td>
                    <td className="p-4 text-center text-lime font-semibold">{pep}</td>
                    <td className="p-4 text-center text-primary-foreground/60">{wood}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Properties */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {properties.map((prop, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-4 rounded-xl bg-primary-foreground/5 border border-primary-foreground/10"
            >
              <div className="w-10 h-10 rounded-full bg-lime/20 flex items-center justify-center text-lime">
                {prop.icon}
              </div>
              <div>
                <div className="font-semibold text-sm">{prop.title}</div>
                <div className="text-xs text-primary-foreground/60">{prop.desc}</div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Impact;
