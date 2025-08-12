import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wand2, Calculator, Calendar, BarChart3, Target, Zap } from "lucide-react";
import ContentGenerator from "@/components/marketing/ContentGenerator";
import RoiCalculator from "@/components/marketing/RoiCalculator";
import SocialMediaScheduler from "@/components/marketing/SocialMediaScheduler";

const MarketingToolkit = () => {
  return (
    <div className="container mx-auto p-4 md:p-8 bg-background">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
            <Zap className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Marketing Toolkit</h1>
            <p className="text-muted-foreground">
              AI-powered tools to supercharge your practice's marketing efforts
            </p>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className="flex items-center gap-1">
            <Wand2 className="h-3 w-3" />
            AI-Powered
          </Badge>
          <Badge variant="outline">Premier Feature</Badge>
          <Badge variant="outline">Real-time Analytics</Badge>
        </div>
      </div>

      <Tabs defaultValue="content-generator" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
          <TabsTrigger value="content-generator" className="flex items-center gap-2">
            <Wand2 className="h-4 w-4" />
            Content Generator
          </TabsTrigger>
          <TabsTrigger value="roi-calculator" className="flex items-center gap-2">
            <Calculator className="h-4 w-4" />
            ROI Calculator
          </TabsTrigger>
          <TabsTrigger value="social-scheduler" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Social Scheduler
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="content-generator">
          <ContentGenerator />
        </TabsContent>

        <TabsContent value="roi-calculator">
          <RoiCalculator />
        </TabsContent>

        <TabsContent value="social-scheduler">
          <SocialMediaScheduler />
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-blue-500" />
                Marketing Analytics Dashboard
              </CardTitle>
              <CardDescription>
                Track the performance of your marketing campaigns and content
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <div className="p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="h-5 w-5 text-blue-600" />
                    <span className="font-semibold text-blue-900">Campaign Performance</span>
                  </div>
                  <p className="text-2xl font-bold text-blue-900">87%</p>
                  <p className="text-sm text-blue-700">Success Rate</p>
                </div>

                <div className="p-6 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border border-green-200">
                  <div className="flex items-center gap-2 mb-2">
                    <BarChart3 className="h-5 w-5 text-green-600" />
                    <span className="font-semibold text-green-900">Engagement Rate</span>
                  </div>
                  <p className="text-2xl font-bold text-green-900">12.4%</p>
                  <p className="text-sm text-green-700">+2.1% from last month</p>
                </div>

                <div className="p-6 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg border border-purple-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Calculator className="h-5 w-5 text-purple-600" />
                    <span className="font-semibold text-purple-900">Average ROI</span>
                  </div>
                  <p className="text-2xl font-bold text-purple-900">245%</p>
                  <p className="text-sm text-purple-700">Across all campaigns</p>
                </div>
              </div>

              <div className="mt-8 p-6 bg-muted/50 rounded-lg text-center">
                <BarChart3 className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="font-semibold mb-2">Detailed Analytics Coming Soon</h3>
                <p className="text-sm text-muted-foreground">
                  Advanced campaign tracking, conversion funnels, and performance insights will be available in the next update.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MarketingToolkit;