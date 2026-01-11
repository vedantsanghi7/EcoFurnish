import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Recycle, Scissors, Beaker, Factory, Package, CheckCircle2 } from 'lucide-react';
import processImg from '@/assets/process-illustration.png';

const processSteps = [
  {
    icon: <Recycle className="w-8 h-8" />,
    title: 'Collection',
    description: 'We collect non-recyclable plastic waste - multilayer wrappers, dirty films, mixed rejects that would otherwise go to landfills.',
    color: 'bg-coral',
  },
  {
    icon: <Scissors className="w-8 h-8" />,
    title: 'Sorting & Shredding',
    description: 'Plastic is sorted by type, washed thoroughly, dried, and shredded into small pieces ready for processing.',
    color: 'bg-lime',
  },
  {
    icon: <Beaker className="w-8 h-8" />,
    title: 'Epoxy Mixing',
    description: 'Shredded plastic (60-80%) is mixed with epoxy resin and hardener, creating a strong thermoset matrix.',
    color: 'bg-primary',
  },
  {
    icon: <Factory className="w-8 h-8" />,
    title: 'Molding & Curing',
    description: 'The mixture is poured into molds and cured at room temperature - no high heat or harmful emissions.',
    color: 'bg-sky',
  },
  {
    icon: <Package className="w-8 h-8" />,
    title: 'Finishing',
    description: 'Cured boards are cut, shaped, and finished. They can be drilled, CNC-machined, and assembled like wood.',
    color: 'bg-sand-dark',
  },
  {
    icon: <CheckCircle2 className="w-8 h-8" />,
    title: 'Quality Testing',
    description: 'Every product undergoes rigorous testing for strength, water resistance, and durability before shipping.',
    color: 'bg-secondary',
  },
];

const Process = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="process" className="eco-section relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-ocean-light/20 to-background" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium mb-4">
            Our Process
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            How We Transform{' '}
            <span className="text-primary">Plastic Into Possibility</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Our innovative upcycling process converts non-recyclable plastic waste 
            into durable, beautiful, and sustainable building materials.
          </p>
        </motion.div>

        {/* Process Illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative mb-20"
        >
          <img
            src={processImg}
            alt="EcoFurnish Manufacturing Process"
            className="w-full max-w-5xl mx-auto rounded-3xl shadow-eco-card"
          />
          
          {/* Decorative blobs */}
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-lime/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-primary/20 rounded-full blur-3xl" />
        </motion.div>

        {/* Process Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {processSteps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              <div className="eco-card h-full">
                {/* Step Number */}
                <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-background border-4 border-primary flex items-center justify-center font-bold text-primary">
                  {index + 1}
                </div>
                
                {/* Icon */}
                <div className={`w-16 h-16 rounded-2xl ${step.color} text-primary-foreground flex items-center justify-center mb-4`}>
                  {step.icon}
                </div>
                
                <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-muted-foreground">
                  {step.description}
                </p>
              </div>
              
              {/* Connector Line */}
              {index < processSteps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-border" />
              )}
            </motion.div>
          ))}
        </div>

        {/* Key Differentiator */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 p-8 md:p-12 rounded-3xl bg-gradient-ocean text-primary-foreground text-center"
        >
          <h3 className="font-display text-2xl md:text-3xl font-bold mb-4">
            This is NOT Melting-Based Recycling
          </h3>
          <p className="text-lg text-primary-foreground/90 max-w-3xl mx-auto">
            Our process is <strong>upcycling into a structural composite</strong>. 
            The plastic is locked permanently in an epoxy matrix, providing 
            water resistance, chemical resistance, and strength that surpasses traditional wood.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Process;
