import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ServicesCardProps {
  services: string[];
}

const ServicesCard = ({ services }: ServicesCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">Specialties & Services</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {services.map((service, index) => (
            <Badge key={index} variant="outline" className="px-3 py-1 text-base">
              {service}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ServicesCard;