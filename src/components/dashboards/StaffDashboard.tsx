import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

const StaffDashboard = () => {
  return (
    <div className="container mx-auto p-4 md:p-8 bg-background">
      <h1 className="text-3xl font-bold mb-6 text-foreground">Admin/Staff Dashboard</h1>
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Providers</CardTitle>
            <CardDescription>View and manage all providers.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Provider list with filters (Tier, Trial status, Activity, Churn risk) will be displayed here.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Admin Actions</CardTitle>
            <CardDescription>Perform actions on selected providers.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Actions like applying tags, sending Slack alerts, and triggering funnels will be available here.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StaffDashboard;