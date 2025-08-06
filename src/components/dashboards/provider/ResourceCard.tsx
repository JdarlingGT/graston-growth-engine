import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { MarketingResource, Tier } from "@/types";
import { Download, Lock, CheckCircle } from "lucide-react";

interface ResourceCardProps {
  resource: MarketingResource;
  userTier: Tier;
  status?: 'read' | 'downloaded';
}

const tierLevel: Record<Tier, number> = {
  Free: 0,
  Preferred: 1,
  Premier: 2,
};

const ResourceCard = ({ resource, userTier, status }: ResourceCardProps) => {
  const hasAccess = tierLevel[userTier] >= tierLevel[resource.tier];

  return (
    <Card className="flex flex-col">
      <CardHeader className="p-0">
        <img src={resource.image} alt={resource.title} className="rounded-t-lg object-cover aspect-video" />
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <Badge variant="secondary" className="mb-2">{resource.category}</Badge>
        <h3 className="font-semibold text-lg">{resource.title}</h3>
        <p className="text-sm text-muted-foreground mt-1">{resource.description}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        {hasAccess ? (
          <Button asChild className="w-full">
            <a href={resource.filePath} download>
              <Download className="mr-2 h-4 w-4" />
              Download
            </a>
          </Button>
        ) : (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button disabled className="w-full">
                <Lock className="mr-2 h-4 w-4" />
                Upgrade to {resource.tier}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>This resource is available for {resource.tier} and Premier members.</p>
            </TooltipContent>
          </Tooltip>
        )}
      </CardFooter>
    </Card>
  );
};

export default ResourceCard;