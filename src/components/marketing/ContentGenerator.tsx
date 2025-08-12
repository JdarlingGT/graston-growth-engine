import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Wand2, Copy, RefreshCw } from "lucide-react";
import { showSuccess } from "@/utils/toast";

const ContentGenerator = () => {
  const [contentType, setContentType] = useState("");
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("");
  const [generatedContent, setGeneratedContent] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!contentType || !topic || !tone) return;
    
    setIsGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockContent = {
      "social-post": `🌟 Transform your health journey with expert ${topic} care! Our certified practitioners use evidence-based techniques to help you achieve lasting results. #HealthcareExcellence #${topic.replace(/\s+/g, '')}`,
      "email-campaign": `Subject: Discover the Power of ${topic}\n\nDear [Patient Name],\n\nAre you ready to take control of your health and wellness? Our specialized ${topic} treatments have helped thousands achieve remarkable results.\n\nBest regards,\n[Your Name]`,
      "blog-post": `# The Complete Guide to ${topic}\n\n${topic} has revolutionized healthcare and wellness. This guide explores everything you need to know about this innovative treatment approach.`
    };

    setGeneratedContent(mockContent[contentType as keyof typeof mockContent] || "Generated content would appear here...");
    setIsGenerating(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedContent);
    showSuccess("Content copied to clipboard!");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wand2 className="h-5 w-5 text-purple-500" />
          AI Content Generator
        </CardTitle>
        <CardDescription>Generate compelling marketing content powered by AI</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="content-type">Content Type</Label>
            <Select value={contentType} onValueChange={setContentType}>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="social-post">Social Media Post</SelectItem>
                <SelectItem value="email-campaign">Email Campaign</SelectItem>
                <SelectItem value="blog-post">Blog Post</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="topic">Topic/Service</Label>
            <Input
              id="topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g., Physical Therapy"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="tone">Tone</Label>
            <Select value={tone} onValueChange={setTone}>
              <SelectTrigger>
                <SelectValue placeholder="Select tone" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="professional">Professional</SelectItem>
                <SelectItem value="friendly">Friendly</SelectItem>
                <SelectItem value="authoritative">Authoritative</SelectItem>
                <SelectItem value="conversational">Conversational</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button 
          onClick={handleGenerate} 
          disabled={!contentType || !topic || !tone || isGenerating}
          className="w-full"
        >
          {isGenerating ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Wand2 className="mr-2 h-4 w-4" />
              Generate Content
            </>
          )}
        </Button>

        {generatedContent && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge variant="secondary">Generated Content</Badge>
                <Badge variant="outline">{contentType}</Badge>
              </div>
              <Button variant="outline" size="sm" onClick={copyToClipboard}>
                <Copy className="mr-2 h-4 w-4" />
                Copy
              </Button>
            </div>
            <Textarea
              value={generatedContent}
              onChange={(e) => setGeneratedContent(e.target.value)}
              rows={8}
              className="font-mono text-sm"
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ContentGenerator;