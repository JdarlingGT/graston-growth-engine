import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 md:py-32 overflow-hidden">
      <div className="container mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            The Official Home for Verified Graston Technique® Care
          </h1>
          <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-blue-100">
            Connecting patients with elite, certified clinicians to ensure the highest standard of care and optimal recovery outcomes.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <Button size="lg" asChild>
              <Link to="/directory">Find a Provider</Link>
            </Button>
            <Button size="lg" variant="secondary" asChild>
              <Link to="/onboarding">Join the Directory</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;