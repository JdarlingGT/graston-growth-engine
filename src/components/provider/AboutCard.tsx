import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FullProviderProfile } from "@/types";

interface AboutCardProps {
  provider: FullProviderProfile;
}

const AboutCard = ({ provider }: AboutCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">About {provider.name}</CardTitle>
      </CardHeader>
      <CardContent className="text-muted-foreground space-y-4">
        <p className="leading-relaxed whitespace-pre-line">{provider.bio || "No bio provided yet."}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
          {provider.experience && (
            <div>
              <h4 className="font-semibold text-foreground">Experience</h4>
              <p>{provider.experience}</p>
            </div>
          )}
          {provider.education && (
            <div>
              <h4 className="font-semibold text-foreground">Education</h4>
              <p>{provider.education}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AboutCard;