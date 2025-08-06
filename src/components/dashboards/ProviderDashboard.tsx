import ProfileScoreCard from "./provider/ProfileScoreCard.tsx";
import MembershipTierCard from "./provider/MembershipTierCard.tsx";
import PerformanceAnalyticsCard from "./provider/PerformanceAnalyticsCard.tsx";
import AudienceOverviewCard from "./provider/AudienceOverviewCard.tsx";
import LeadInboxCard from "./provider/LeadInboxCard.tsx";
import RoiCalculatorCard from "./provider/RoiCalculatorCard.tsx";
import UpgradeCtaCard from "./provider/UpgradeCtaCard.tsx";
import ContentAssistantCard from "./provider/ContentAssistantCard.tsx";

const ProviderDashboard = () => {
  return (
    <div className="container mx-auto p-4 md:p-8 bg-background">
      <h1 className="text-3xl font-bold mb-6 text-foreground">Provider Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <ProfileScoreCard />
        <MembershipTierCard />
        <AudienceOverviewCard />
        
        <PerformanceAnalyticsCard />

        <LeadInboxCard />

        <RoiCalculatorCard />
        <UpgradeCtaCard />
        <ContentAssistantCard />
      </div>
    </div>
  );
};

export default ProviderDashboard;