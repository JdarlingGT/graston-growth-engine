import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const MembershipTierCard = () => (
  <Card>
    <CardHeader>
      <CardTitle>Membership Tier</CardTitle>
      <CardDescription>Your current plan.</CardDescription>
    </CardHeader>
    <CardContent>
      <p className="text-2xl font-bold">Premier</p>
      <p className="text-sm text-muted-foreground">Trial ends in 14 days.</p>
    </CardContent>
    <CardFooter>
      <Button variant="outline">Manage Subscription</Button>
    </CardFooter>
  </Card>
);

export default MembershipTierCard;