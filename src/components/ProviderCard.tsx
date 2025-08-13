import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

const ProviderCard = ({ provider }: { provider: any }) => {
  const tierColors: { [key: string]: string } = {
    Premier: 'bg-purple-600 text-white',
    Preferred: 'bg-blue-500 text-white',
    Free: 'bg-gray-200 text-gray-800',
  };

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="flex items-center space-x-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={provider.profile_photo.url} alt={provider.provider_name} />
            <AvatarFallback>{provider.provider_name.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle>{provider.provider_name}</CardTitle>
            <p className="text-sm text-gray-500">{provider.practitioner_type.name}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-gray-600 line-clamp-2">{provider.bio_experience.provider_bio}</p>
        <div className="mt-4 flex items-center space-x-2">
          <Badge className={tierColors[provider.membership_tier]}>{provider.membership_tier}</Badge>
          <Badge variant="outline">{provider.bio_experience.graston_level}</Badge>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link to={`/provider/${provider.id}`}>View Profile</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProviderCard;