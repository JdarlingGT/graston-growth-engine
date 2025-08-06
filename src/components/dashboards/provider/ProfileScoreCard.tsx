import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const ProfileScoreCard = () => (
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
);

export default ProfileScoreCard;