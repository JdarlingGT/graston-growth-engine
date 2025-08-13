import HeroSection from '../components/about/HeroSection';
import MissionSection from '../components/about/MissionSection';
import StatsSection from '../components/about/StatsSection';
import HowItWorksSection from '../components/about/HowItWorksSection';
import TierComparisonSection from '../components/about/TierComparisonSection';
import CtaSection from '../components/about/CtaSection';

const AboutPage = () => {
  return (
    <div className="bg-background">
      <HeroSection />
      <MissionSection />
      <StatsSection />
      <HowItWorksSection />
      <TierComparisonSection />
      <CtaSection />
    </div>
  );
};

export default AboutPage;