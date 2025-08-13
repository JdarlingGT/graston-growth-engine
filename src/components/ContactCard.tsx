import React from "react";
import { Provider } from "@/types/provider";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, Mail, Globe, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

interface ContactCardProps {
  provider: Provider;
}

const socialIcons: Record<keyof Provider['social_media'], React.ReactNode> = {
  facebook_url: <Facebook className="h-5 w-5" />,
  instagram_url: <Instagram className="h-5 w-5" />,
  linkedin_url: <Linkedin className="h-5 w-5" />,
  twitter_url: <Twitter className="h-5 w-5" />,
};

const ContactCard: React.FC<ContactCardProps> = ({ provider }) => (
  <Card>
    <CardHeader>
      <h2 className="text-lg font-medium">Contact & Links</h2>
    </CardHeader>
    <CardContent className="space-y-3">
      <div className="flex items-center gap-2">
        <Phone className="h-5 w-5 text-muted-foreground" />
        <a href={`tel:${provider.contact.clinic_phone}`} className="hover:underline">{provider.contact.clinic_phone}</a>
      </div>
      <div className="flex items-center gap-2">
        <Mail className="h-5 w-5 text-muted-foreground" />
        <a href={`mailto:${provider.contact.provider_email}`} className="hover:underline">{provider.contact.provider_email}</a>
      </div>
      <div className="flex items-center gap-2">
        <Globe className="h-5 w-5 text-muted-foreground" />
        <a href={provider.contact.clinic_website_url} target="_blank" rel="noopener noreferrer" className="hover:underline">
          Website
        </a>
      </div>
      <div className="flex items-center gap-2 pt-2 border-t">
        {Object.entries(provider.social_media).map(([key, url]) => {
          if (typeof url !== 'string' || !url) return null;
          return (
            <Button key={key} variant="ghost" size="icon" asChild>
              <a href={url} target="_blank" rel="noopener noreferrer" aria-label={key.replace('_url', '')}>
                {socialIcons[key as keyof typeof socialIcons]}
              </a>
            </Button>
          );
        })}
      </div>
    </CardContent>
  </Card>
);

export default ContactCard;