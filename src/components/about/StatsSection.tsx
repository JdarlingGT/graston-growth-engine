import { motion } from 'framer-motion';
import AnimatedCounter from './AnimatedCounter';
import { Search, UserCheck, BarChart } from 'lucide-react';

const stats = [
  {
    icon: Search,
    value: 57000,
    label: 'Patient Searches Last Year',
    suffix: '+',
  },
  {
    icon: UserCheck,
    value: 1800,
    label: 'Verified Providers',
    suffix: '+',
  },
  {
    icon: BarChart,
    value: 98,
    label: 'Patient Satisfaction Rate',
    suffix: '%',
  },
];

const StatsSection = () => {
  return (
    <section className="py-16 md:py-24 bg-muted/40">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
        >
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="p-4 bg-white rounded-full shadow-md mb-4">
                <stat.icon className="h-8 w-8 text-primary" />
              </div>
              <div className="text-4xl md:text-5xl font-bold text-primary">
                <AnimatedCounter to={stat.value} />
                {stat.suffix}
              </div>
              <p className="mt-2 text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;