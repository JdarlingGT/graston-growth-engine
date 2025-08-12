import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Bot, AlertTriangle, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const alerts = [
    {
        icon: <AlertTriangle className="h-5 w-5 text-destructive" />,
        title: "Churn Risk Anomaly",
        description: "Sudden drop in engagement from Premier providers in California.",
        action: "View Cohort"
    },
    {
        icon: <TrendingUp className="h-5 w-5 text-emerald-500" />,
        title: "Upgrade Opportunity",
        description: "12 Free-tier providers have high profile views but low conversion. Suggest upgrade.",
        action: "Launch Campaign"
    },
    {
        icon: <Bot className="h-5 w-5 text-primary" />,
        title: "Automation Copilot",
        description: "Create a reactivation campaign for providers with engagement drops.",
        action: "Build Automation"
    }
]

const AiAssistantAlerts = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-primary" />
          <span>AI Assistant Alerts</span>
        </CardTitle>
        <CardDescription>Proactive insights and actions from your AI copilot.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {alerts.map((alert, index) => (
            <div key={index} className="flex items-start gap-4">
                <div className="mt-1">{alert.icon}</div>
                <div className="flex-1">
                    <p className="font-semibold">{alert.title}</p>
                    <p className="text-sm text-muted-foreground">{alert.description}</p>
                </div>
                <Button variant="outline" size="sm">{alert.action}</Button>
            </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default AiAssistantAlerts;