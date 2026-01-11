import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Earth,BadgeCheck, MapPin, Globe, BarChart3, Users, Building2, Leaf, Filter, DollarSign, PieChart} from 'lucide-react';

const marketData = [
  {
    title: 'Total Available Market',
    abbr: 'TAM',
    value: '₹1,05,000 Cr',
    description: 'Global sustainable furniture market',
    icon: <Earth className="w-6 h-6" />,
    color: 'bg-coral',
  },
  {
    title: 'Served Available Market',
    abbr: 'SAM',
    value: '₹29,000 Cr',
    description: 'Our focused market segments',
    icon: <Filter className="w-6 h-6" />,
    color: 'bg-lime',
  },
  {
    title: 'Serviceable Obtainable Market',
    abbr: 'SOM',
    value: '₹100 Cr',
    description: 'Realistic near-term market capture',
    icon: <BadgeCheck className="w-6 h-6" />,
    color: 'bg-slate-800',
  },
];

const targetSegments = [
  {
    icon: <Building2 className="w-6 h-6" />,
    title: 'Furniture Manufacturing',
    description: 'Interior design and architecture firms seeking unique, eco-friendly materials.',
    percentage: 35,
  },
  {
    icon: <Leaf className="w-6 h-6" />,
    title: 'Eco-Conscious Customers',
    description: 'Individuals willing to pay premium for sustainable, recycled products.',
    percentage: 28,
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: 'DIY Enthusiasts',
    description: 'Makers using PEP boards for organizing spaces, workshops, and garages.',
    percentage: 20,
  },
  {
    icon: <DollarSign className="w-6 h-6" />,
    title: 'Municipal & Parks',
    description: 'Outdoor recreational facilities needing weather-resistant solutions.',
    percentage: 17,
  },
];

const strengths = [
  { label: 'Cost-effective', icon: '💰' },
  { label: 'Durable', icon: '🛡️' },
  { label: 'Versatile', icon: '🔧' },
  { label: 'Lightweight', icon: '🪶' },
  { label: 'Eco-friendly', icon: '🌱' },
];

const MarketValidation = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="eco-section bg-gradient-to-b from-background to-ocean-light/20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-coral/20 text-coral text-sm font-medium mb-4">
            Market Research
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Validated{' '}
            <span className="text-primary">Market Opportunity</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            The sustainable furniture market is rapidly growing. 
            Our research confirms strong demand for eco-friendly alternatives.
          </p>
        </motion.div>

        {/* Target Segments */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h3 className="font-display text-2xl md:text-3xl font-bold text-center text-foreground mb-12">
            Target Market Segments
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {targetSegments.map((segment, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="eco-card h-full"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                  {segment.icon}
                </div>
                <h4 className="font-display text-lg font-semibold text-foreground mb-2">
                  {segment.title}
                </h4>
                <p className="text-sm text-muted-foreground flex-1">
                  {segment.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* SWOT Summary - Strengths */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="p-8 md:p-12 rounded-3xl bg-card border border-border"
        >
          <h3 className="font-display text-2xl font-bold text-center text-foreground mb-8">
            Our Competitive Strengths
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {strengths.map((strength, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-center gap-2 px-5 py-3 rounded-full bg-primary/10 border border-primary/20"
              >
                <span className="text-2xl">{strength.icon}</span>
                <span className="font-medium text-foreground">{strength.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MarketValidation;
