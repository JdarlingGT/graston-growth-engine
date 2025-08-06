import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const UpgradeCtaCard = () => (
  <Card>
    <CardHeader>
      <CardTitle>Upgrade Your Plan</CardTitle>
      <CardDescription>Unlock more features and leads.</CardDescription>
    </CardHeader>
    <CardContent className="space-y-3">
      <Button className="w-full">Upgrade to Preferred</Button>
      <Button variant="secondary" className="w-full">Upgrade to Premier</Button>
      <Button variant="outline" className="w-full">Compare Plans</Button>
    </CardContent>
  </Card>
);

export default UpgradeCtaCard;