import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const CtaSection = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold">
            Ready to Get Started?
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Whether you're a patient seeking care or a provider looking to grow, your journey starts here.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" asChild>
              <Link to="/directory">Find a Provider Near You</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/onboarding">Join the Directory</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CtaSection;