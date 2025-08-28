import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Eye, Mail, Link, Facebook, Twitter, Linkedin, Instagram, Calendar, Phone, MapPin } from "lucide-react";

const analyticsData = {
  profile_views: 1234,
  form_submissions: 45,
  website_clicks: 120,
  facebook_clicks: 30,
  twitter_clicks: 15,
  linkedin_clicks: 25,
  instagram_clicks: 50,
  booking_url_clicks: 60,
  email_clicks: 22,
  phone_clicks: 18,
  map_clicks: 42,
};

const MetricItem = ({ icon: Icon, label, value }: { icon: React.ElementType, label: string, value: number }) => (
  <div className="flex items-center space-x-3">
    <Icon className="h-5 w-5 text-muted-foreground" />
    <div className="flex-1">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="text-xl font-bold">{value.toLocaleString()}</p>
    </div>
  </div>
);

const PerformanceAnalyticsCard = () => {
  return (
    <Card className="md:col-span-2">
      <CardHeader>
        <CardTitle>Performance Analytics</CardTitle>
        <CardDescription>How your profile is performing. Last synced: Just now.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-8">
          <MetricItem icon={Eye} label="Profile Views" value={analyticsData.profile_views} />
          <MetricItem icon={Mail} label="Form Submissions" value={analyticsData.form_submissions} />
          <MetricItem icon={Link} label="Website Clicks" value={analyticsData.website_clicks} />
          <MetricItem icon={Calendar} label="Booking Clicks" value={analyticsData.booking_url_clicks} />
          <MetricItem icon={Phone} label="Phone Clicks" value={analyticsData.phone_clicks} />
          <MetricItem icon={MapPin} label="Map Clicks" value={analyticsData.map_clicks} />
          <MetricItem icon={Facebook} label="Facebook Clicks" value={analyticsData.facebook_clicks} />
          <MetricItem icon={Instagram} label="Instagram Clicks" value={analyticsData.instagram_clicks} />
          <MetricItem icon={Linkedin} label="LinkedIn Clicks" value={analyticsData.linkedin_clicks} />
          <MetricItem icon={Twitter} label="Twitter Clicks" value={analyticsData.twitter_clicks} />
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceAnalyticsCard;