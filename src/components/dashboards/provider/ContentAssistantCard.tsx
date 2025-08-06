import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const ContentAssistantCard = () => (
  <Card className="md:col-span-2 lg:col-span-1">
    <CardHeader>
      <CardTitle>Content Assistant</CardTitle>
      <CardDescription>Generate bio, video scripts, and more.</CardDescription>
    </CardHeader>
    <CardContent className="space-y-4">
      <div>
        <Label htmlFor="content-prompt">What content do you need?</Label>
        <Textarea id="content-prompt" placeholder="e.g., 'Write a short bio for my profile' or 'Suggest a video script for patient testimonials'" rows={4} />
      </div>
      <Button className="w-full">Generate Content</Button>
    </CardContent>
  </Card>
);

export default ContentAssistantCard;