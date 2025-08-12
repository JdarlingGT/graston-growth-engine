import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Facebook, Twitter, Instagram, Linkedin, Plus } from "lucide-react";
import { showSuccess } from "@/utils/toast";

interface ScheduledPost {
  id: string;
  content: string;
  platform: string;
  scheduledDate: string;
  scheduledTime: string;
  status: 'scheduled' | 'published' | 'failed';
}

const SocialMediaScheduler = () => {
  const [content, setContent] = useState("");
  const [platform, setPlatform] = useState("");
  const [scheduledDate, setScheduledDate] = useState("");
  const [scheduledTime, setScheduledTime] = useState("");
  const [scheduledPosts, setScheduledPosts] = useState<ScheduledPost[]>([
    {
      id: "1",
      content: "🌟 Transform your health journey with expert physical therapy care!",
      platform: "facebook",
      scheduledDate: "2024-01-15",
      scheduledTime: "09:00",
      status: "scheduled"
    }
  ]);

  const platformIcons = {
    facebook: <Facebook className="h-4 w-4" />,
    twitter: <Twitter className="h-4 w-4" />,
    instagram: <Instagram className="h-4 w-4" />,
    linkedin: <Linkedin className="h-4 w-4" />
  };

  const platformColors = {
    facebook: "bg-blue-500",
    twitter: "bg-sky-500",
    instagram: "bg-pink-500",
    linkedin: "bg-blue-700"
  };

  const handleSchedulePost = () => {
    if (!content || !platform || !scheduledDate || !scheduledTime) return;

    const newPost: ScheduledPost = {
      id: Date.now().toString(),
      content,
      platform,
      scheduledDate,
      scheduledTime,
      status: 'scheduled'
    };

    setScheduledPosts([newPost, ...scheduledPosts]);
    setContent("");
    setPlatform("");
    setScheduledDate("");
    setScheduledTime("");
    
    showSuccess("Post scheduled successfully!");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'published': return 'bg-green-100 text-green-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-blue-500" />
          Social Media Scheduler
        </CardTitle>
        <CardDescription>Schedule and manage your social media posts across platforms</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="post-content">Post Content</Label>
            <Textarea
              id="post-content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your social media post..."
              rows={4}
            />
            <p className="text-xs text-muted-foreground">{content.length}/280 characters</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="platform">Platform</Label>
              <Select value={platform} onValueChange={setPlatform}>
                <SelectTrigger>
                  <SelectValue placeholder="Select platform" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="facebook">Facebook</SelectItem>
                  <SelectItem value="twitter">Twitter</SelectItem>
                  <SelectItem value="instagram">Instagram</SelectItem>
                  <SelectItem value="linkedin">LinkedIn</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="scheduled-date">Date</Label>
              <Input
                id="scheduled-date"
                type="date"
                value={scheduledDate}
                onChange={(e) => setScheduledDate(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="scheduled-time">Time</Label>
              <Input
                id="scheduled-time"
                type="time"
                value={scheduledTime}
                onChange={(e) => setScheduledTime(e.target.value)}
              />
            </div>
          </div>

          <Button 
            onClick={handleSchedulePost}
            disabled={!content || !platform || !scheduledDate || !scheduledTime}
            className="w-full"
          >
            <Plus className="mr-2 h-4 w-4" />
            Schedule Post
          </Button>
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Scheduled Posts</h3>
          
          {scheduledPosts.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No scheduled posts yet.</p>
          ) : (
            <div className="space-y-3">
              {scheduledPosts.map((post) => (
                <div key={post.id} className="p-4 border rounded-lg space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`p-1 rounded text-white ${platformColors[post.platform as keyof typeof platformColors]}`}>
                        {platformIcons[post.platform as keyof typeof platformIcons]}
                      </div>
                      <span className="font-medium capitalize">{post.platform}</span>
                      <Badge className={getStatusColor(post.status)}>
                        {post.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      {post.scheduledDate}
                      <Clock className="h-4 w-4" />
                      {post.scheduledTime}
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-700 line-clamp-2">{post.content}</p>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Edit</Button>
                    <Button variant="outline" size="sm">Delete</Button>
                    {post.status === 'scheduled' && (
                      <Button variant="outline" size="sm">Post Now</Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SocialMediaScheduler;