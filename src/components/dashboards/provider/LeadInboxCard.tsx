import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

const LeadInboxCard = () => (
  <Card className="md:col-span-2 lg:col-span-3">
    <CardHeader>
      <CardTitle>Lead Inbox</CardTitle>
      <CardDescription>Recent form submissions.</CardDescription>
    </CardHeader>
    <CardContent>
      <p className="text-muted-foreground">A list of leads from your profile form will appear here.</p>
      {/* Placeholder for lead list */}
      <div className="mt-4 border rounded-md p-4">
        <p className="text-sm text-muted-foreground">No new leads.</p>
      </div>
    </CardContent>
  </Card>
);

export default LeadInboxCard;