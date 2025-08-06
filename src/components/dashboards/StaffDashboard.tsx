import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { DataTable } from "@/components/data-table/data-table";
import { columns } from "@/components/data-table/columns";
import { Button } from "@/components/ui/button";
import { FullProviderProfile } from "@/types"; // Import FullProviderProfile

const StaffDashboard = () => {
  // Dummy data for demonstration, now using FullProviderProfile
  const providers: FullProviderProfile[] = [
    { id: "1", name: "John Doe", email: "john@example.com", tier: "Premier", trialStatus: "N/A", activity: 1200, churnRisk: false, first_name: "John", last_name: "Doe" },
    { id: "2", name: "Jane Smith", email: "jane@example.com", tier: "Preferred", trialStatus: "Active", activity: 350, churnRisk: false, first_name: "Jane", last_name: "Smith" },
    { id: "3", name: "Peter Jones", email: "peter@example.com", tier: "Free", trialStatus: "Expired", activity: 50, churnRisk: true, first_name: "Peter", last_name: "Jones" },
    { id: "4", name: "Alice Brown", email: "alice@example.com", tier: "Premier", trialStatus: "N/A", activity: 800, churnRisk: false, first_name: "Alice", last_name: "Brown" },
    { id: "5", name: "Bob White", email: "bob@example.com", tier: "Preferred", trialStatus: "Active", activity: 200, churnRisk: true, first_name: "Bob", last_name: "White" },
  ];

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
            <DataTable columns={columns} data={providers} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Admin Actions</CardTitle>
            <CardDescription>Perform actions on selected providers.</CardDescription>
          </CardHeader>
          <CardContent className="flex gap-4">
            <Button>Apply Tags</Button>
            <Button variant="secondary">Send Slack Alert</Button>
            <Button variant="destructive">Trigger Funnel</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StaffDashboard;