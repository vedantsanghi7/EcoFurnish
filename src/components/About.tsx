import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Target, Eye, Heart, Lightbulb, Users, Globe } from 'lucide-react';
import aadiShravanImg from '@/assets/AadiShravan.png';
import vedantSanghiImg from '@/assets/VedantSanghi.png';
import samarMalikImg from '@/assets/SamarMalik.png';
import aarushBagdiyaImg from '@/assets/AarushBagdiya.png';

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const values = [
    {
      icon: <Lightbulb className="w-6 h-6" />,
      title: 'Innovation',
      description: 'Pioneering new ways to transform waste into value',
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: 'Sustainability',
      description: 'Every decision considers environmental impact',
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Community',
      description: 'Partnering with local collectors and NGOs',
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: 'Transparency',
      description: 'Clear about our processes and impact',
    },
  ];

  return (
    <section id="about" className="eco-section bg-background relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-lime/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-4">
            About EcoFurnish
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Where Sustainability Meets{' '}
            <span className="text-primary">Beautiful Design</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            We're not just making furniture. We're reshaping the way 
            the world perceives waste and inspiring a global movement.
          </p>
        </motion.div>

        {/* Vision & Mission */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="eco-card"
          >
            <div className="w-14 h-14 rounded-2xl bg-gradient-ocean flex items-center justify-center text-primary-foreground mb-6">
              <Eye className="w-7 h-7" />
            </div>
            <h3 className="font-display text-2xl font-bold text-foreground mb-4">
              Our Vision
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              We envision a world where sustainability and innovation intersect seamlessly, 
              transforming plastic waste into exquisite, functional, and eco-conscious furniture pieces. 
              Our vision is about reshaping how we perceive waste, inspiring a global movement 
              towards a circular economy where resources are valued, reused, and repurposed 
              to their fullest potential.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="eco-card"
          >
            <div className="w-14 h-14 rounded-2xl bg-gradient-coral flex items-center justify-center text-primary-foreground mb-6">
              <Target className="w-7 h-7" />
            </div>
            <h3 className="font-display text-2xl font-bold text-foreground mb-4">
              Our Mission
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Our mission is to redefine sustainable living by harnessing the power of 
              plastic waste transformation. Through relentless innovation, uncompromising quality, 
              and transparent practices, we aim to revolutionize the furniture industry, 
              offering a diverse range of stunning, durable, and planet-friendly furnishings 
              that make a real difference.
            </p>
          </motion.div>
        </div>

        {/* Core Values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8">
            Our Core Values
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                  {value.icon}
                </div>
                <h4 className="font-semibold text-foreground mb-2">{value.title}</h4>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Our Team */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-12 text-center">
            Meet Our Team
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-8 max-w-5xl mx-auto">
            {[
              { image: aadiShravanImg, initials: 'AS', name: 'Aadi Shravan', position: 'CEO', desc: 'Founder & Visionary', color: 'bg-gradient-ocean' },
              { image: vedantSanghiImg, initials: 'VS', name: 'Vedant Sanghi', position: 'CTO', desc: 'Technology Lead', color: 'bg-lime' },
              { image: samarMalikImg, initials: 'SM', name: 'Samar Malik', position: 'CMO', desc: 'Marketing Lead', color: 'bg-gradient-coral' },
              { image: aarushBagdiyaImg, initials: 'AB', name: 'Aarush Bagdiya', position: 'CFO', desc: 'Finance Lead', color: 'bg-primary' },
              { image: null, initials: 'MT', name: 'Mudit Thakur', position: 'CPO', desc: 'Product Lead', color: 'bg-secondary' },
            ].map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.05 }}
                className="text-center"
              >
                <div className="relative mb-4 mx-auto">
                  {member.image ? (
                    <div className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden shadow-lg mb-3 mx-auto transition-all duration-300 ring-2 ring-primary/20">
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className={`w-24 h-24 md:w-28 md:h-28 rounded-full ${member.color} flex items-center justify-center text-primary-foreground font-display text-2xl md:text-3xl font-bold shadow-lg mb-3 mx-auto transition-all duration-300`}>
                      {member.initials}
                    </div>
                  )}
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-lime rounded-full border-2 border-background"></div>
                </div>
                <h4 className="font-semibold text-foreground mb-1 text-sm md:text-base">
                  {member.name}
                </h4>
                <p className="text-xs md:text-sm text-primary font-medium mb-1">
                  {member.position}
                </p>
                <p className="text-xs text-muted-foreground">
                  {member.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* The Problem We Solve */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="p-8 md:p-12 rounded-3xl bg-gradient-to-r from-ocean-dark to-primary text-primary-foreground"
        >
          <h3 className="font-display text-2xl md:text-3xl font-bold mb-6 text-center">
            The Problems We're Solving
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { problem: 'Plastic Waste', detail: 'Growing accumulation of non-recyclables in landfills' },
              { problem: 'Deforestation', detail: 'High furniture demand driving timber depletion' },
              { problem: 'Scaling Gaps', detail: 'Current recycling tech is inefficient and unscalable' },
              { problem: 'Rising Costs', detail: 'Increasing prices of traditional raw wood' },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-lime mb-2">{item.problem}</div>
                <p className="text-sm text-primary-foreground/80">{item.detail}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
