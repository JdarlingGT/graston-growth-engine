import { useParams } from "react-router-dom";
import { mockProviders } from "@/lib/mockData";
import { FullProviderProfile } from "@/types";
import ProfileSidebar from "@/components/provider/ProfileSidebar";
import { useState } from "react";
import AboutCard from "@/components/provider/AboutCard";
import ServicesCard from "@/components/provider/ServicesCard";
import MediaCard from "@/components/provider/MediaCard";
import TestimonialsCard from "@/components/provider/TestimonialsCard";
import FaqCard from "@/components/provider/FaqCard";
import ContactCard from "@/components/provider/ContactCard";

const PublicProviderProfilePage = () => {
  const { id } = useParams<{ id: string }>();
  // In a real app, this would be a fetch from Supabase.
  const [provider, setProvider] = useState<FullProviderProfile | undefined>(
    mockProviders.find((p) => p.id === id)
  );

  const handleToggleFavorite = (providerId: string) => {
    setProvider(prev => {
      if (!prev) return prev;
      // This would be a mutation to update the user's favorites in the DB.
      console.log(`Toggling favorite for ${providerId}`);
      return {
        ...prev,
        isFavorite: !prev.isFavorite,
      };
    });
  };

  if (!provider) {
    return (
      <div className="container mx-auto p-8 text-center">
        <h1 className="text-2xl font-bold">Provider not found</h1>
        <p>The provider you are looking for does not exist.</p>
      </div>
    );
  }

  return (
    <div className="bg-muted/20">
      <div className="container mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          
          {/* Left Column: Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              <ProfileSidebar provider={provider} onToggleFavorite={handleToggleFavorite} />
            </div>
          </div>

          {/* Right Column: Main Content */}
          <div className="lg:col-span-3 space-y-8">
            <AboutCard provider={provider} />
            
            {provider.services && provider.services.length > 0 && (
              <ServicesCard services={provider.services} />
            )}

            {provider.tier === 'Premier' && (provider.galleryImages || provider.galleryVideos) && (
              <MediaCard 
                galleryImages={provider.galleryImages || []} 
                galleryVideos={provider.galleryVideos || []} 
              />
            )}

            {provider.testimonials && provider.testimonials.length > 0 && (
              <TestimonialsCard testimonials={provider.testimonials} />
            )}

            {provider.faqs && provider.faqs.length > 0 && (
              <FaqCard faqs={provider.faqs} />
            )}
            
            {provider.tier === 'Premier' && (
              <div id="contact-form">
                <ContactCard provider={provider} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicProviderProfilePage;