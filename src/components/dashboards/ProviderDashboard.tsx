import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const ProviderDashboard = () => {
  return (
    <div className="container mx-auto p-4 md:p-8 bg-background">
      <h1 className="text-3xl font-bold mb-6 text-foreground">Provider Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Profile Score</CardTitle>
            <CardDescription>Your profile completion status.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">85%</span>
              <Progress value={85} className="w-2/3" />
            </div>
            <p className="text-sm text-muted-foreground mt-2">Complete your profile to reach 100%.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Membership Tier</CardTitle>
            <CardDescription>Your current plan.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">Premier</p>
            <p className="text-sm text-muted-foreground">Trial ends in 14 days.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Analytics</CardTitle>
            <CardDescription>Your profile performance.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Views, leads, and clicks will be shown here.</p>
          </CardContent>
        </Card>
        <Card className="md:col-span-2 lg:col-span-3">
          <CardHeader>
            <CardTitle>Lead Inbox</CardTitle>
            <CardDescription>Recent form submissions.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">A list of leads from your profile form will appear here.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProviderDashboard;