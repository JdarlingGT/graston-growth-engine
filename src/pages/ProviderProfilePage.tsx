import { useParams } from 'react-router-dom';
import { mockProviderData } from '@/lib/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Phone, Mail, MapPin } from 'lucide-react';

const ProviderProfilePage = () => {
  const { providerId } = useParams();
  const provider = mockProviderData.find(p => p.id.toString() === providerId);

  if (!provider) {
    return <div className="text-center py-16">Provider not found.</div>;
  }

  const tierColors: { [key: string]: string } = {
    Premier: 'bg-purple-600 text-white',
    Preferred: 'bg-blue-500 text-white',
    Free: 'bg-gray-200 text-gray-800',
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <Card className="mb-8">
          <CardHeader>
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src={provider.profile_photo.url} />
                <AvatarFallback>{provider.provider_name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl font-bold">{provider.provider_name}</h1>
                <p className="text-lg text-gray-600">{provider.practitioner_type.name}</p>
                <div className="mt-2 flex items-center justify-center md:justify-start space-x-2">
                  <Badge className={tierColors[provider.membership_tier]}>{provider.membership_tier}</Badge>
                  <Badge variant="outline">{provider.bio_experience.graston_level}</Badge>
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Tabs defaultValue="about">
              <TabsList>
                <TabsTrigger value="about">About</TabsTrigger>
                {provider.membership_tier !== 'Free' && <TabsTrigger value="specialties">Specialties</TabsTrigger>}
                {provider.membership_tier !== 'Free' && <TabsTrigger value="reviews">Reviews</TabsTrigger>}
                {provider.membership_tier === 'Premier' && <TabsTrigger value="media">Media</TabsTrigger>}
              </TabsList>
              <TabsContent value="about" className="mt-4">
                <Card>
                  <CardContent className="pt-6">
                    <p>{provider.bio_experience.provider_bio}</p>
                  </CardContent>
                </Card>
              </TabsContent>
              {provider.membership_tier !== 'Free' && (
                <TabsContent value="specialties" className="mt-4">
                  <Card>
                    <CardHeader><CardTitle>Conditions Treated</CardTitle></CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {provider.specialties?.conditions_treated?.map(c => <Badge key={c} variant="secondary">{c}</Badge>)}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              )}
              {provider.membership_tier !== 'Free' && (
                <TabsContent value="reviews" className="mt-4">
                  <Card>
                    <CardHeader><CardTitle>Testimonials</CardTitle></CardHeader>
                    <CardContent>
                      {provider.reviews_and_faqs?.testimonials?.map((t, i) => (
                        <div key={i} className="border-b last:border-0 pb-2 mb-2">
                          <p className="italic">"{t.text}"</p>
                          <p className="text-right text-sm font-semibold">- {"★".repeat(t.rating)}</p>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </TabsContent>
              )}
              {provider.membership_tier === 'Premier' && (
                <TabsContent value="media" className="mt-4">
                  <Card className="mb-4">
                    <CardHeader><CardTitle>Intro Video</CardTitle></CardHeader>
                    <CardContent>
                      <iframe className="w-full aspect-video rounded-md" src={provider.media_content.video_intro} title="Intro Video" allowFullScreen></iframe>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader><CardTitle>Photo Gallery</CardTitle></CardHeader>
                    <CardContent className="grid grid-cols-2 gap-4">
                      {provider.media_content.clinic_gallery?.map(img => <img key={img.url} src={img.url} alt="" className="rounded-md" />)}
                    </CardContent>
                  </Card>
                </TabsContent>
              )}
            </Tabs>
          </div>
          <div>
            <Card>
              <CardHeader><CardTitle>Contact & Location</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2"><Phone className="h-4 w-4" /><span>{provider.contact.clinic_phone}</span></div>
                <div className="flex items-center space-x-2"><Mail className="h-4 w-4" /><span>{provider.contact.provider_email}</span></div>
                <div className="flex items-center space-x-2"><MapPin className="h-4 w-4" /><span>{provider.location.clinic_street}, {provider.location.clinic_city}, {provider.location.clinic_state} {provider.location.clinic_zip}</span></div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderProfilePage;