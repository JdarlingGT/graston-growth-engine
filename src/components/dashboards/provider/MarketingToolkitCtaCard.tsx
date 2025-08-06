import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Rocket } from "lucide-react";
import { Link } from "react-router-dom";

interface MarketingToolkitCtaCardProps {
  providerId: string;
}

const MarketingToolkitCtaCard = ({ providerId }: MarketingToolkitCtaCardProps) => {
  return (
    <Card className="bg-primary text-primary-foreground">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Rocket />
          Marketing Toolkit
        </CardTitle>
        <CardDescription className="text-primary-foreground/80">
          Access guides, templates, and resources to grow your practice.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button asChild variant="secondary" className="w-full">
          <Link to={`/provider/${providerId}/toolkit`}>Explore Resources</Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default MarketingToolkitCtaCard;