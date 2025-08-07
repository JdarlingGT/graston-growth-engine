import { FullProviderProfile } from "@/types";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, Star, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

interface ProviderCardProps {
  provider: FullProviderProfile;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onToggleFavorite: (providerId: string) => void;
  onToggleCompare: (providerId: string) => void;
  isComparing: boolean;
}

const ProviderCard = ({ provider, onMouseEnter, onMouseLeave, onToggleFavorite, onToggleCompare, isComparing }: ProviderCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/directory/provider/${provider.id}`);
  };

  return (
    <Card 
      className="overflow-hidden transition-shadow hover:shadow-lg cursor-pointer flex flex-col"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <CardContent className="p-4 flex-grow">
        <div className="flex items-start gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={provider.profileImage} alt={provider.name}/>
            <AvatarFallback>{provider.name.split(' ').map(n=>n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="font-heading text-lg font-bold text-brand-blue">{provider.name}</h3>
            <p className="text-sm text-brand-text/90">{provider.specialty}</p>
            <div className="flex items-center mt-1 text-sm">
              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
              <span className="font-bold">{provider.rating?.toFixed(1)}</span>
              <span className="text-brand-text/70 ml-1">({provider.reviewCount} reviews)</span>
            </div>
          </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {provider.services?.slice(0, 3).map(service => (
            <Badge key={service} variant="secondary" className="bg-brand-gray/20 text-brand-blue">{service}</Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="p-3 bg-slate-50 border-t flex justify-between items-center">
        <Button 
          onClick={handleClick}
          className="w-full bg-brand-orange hover:bg-brand-orange/90 text-white"
        >
          View Profile
        </Button>
        {provider.can_compare && (
          <div className="flex items-center space-x-2 pl-3" onClick={e => e.stopPropagation()}>
            <Checkbox id={`compare-${provider.id}`} checked={isComparing} onCheckedChange={() => onToggleCompare(provider.id)} />
            <Label htmlFor={`compare-${provider.id}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer">Compare</Label>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default ProviderCard;