"use client";

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Phone, MapPin, Mail, CheckCircle } from 'lucide-react';
import { FullProviderProfile } from '@/types';

interface ProfileSidebarProps {
  provider: FullProviderProfile;
}

const ProfileSidebar: React.FC<ProfileSidebarProps> = ({ provider }) => {
  return (
    <Card className="sticky top-24 hidden lg:block w-80">
      <CardHeader>
        <CardTitle>Contact & Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {provider.contactInfo?.phone && (
          <Button variant="outline" className="w-full justify-start" asChild>
            <a href={`tel:${provider.contactInfo.phone}`}>
              <Phone className="mr-2 h-4 w-4" />
              {provider.contactInfo.phone}
            </a>
          </Button>
        )}
        {provider.location && (
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="mr-2 h-4 w-4" />
            {provider.location}
          </div>
        )}
        {provider.email && (
          <Button variant="outline" className="w-full justify-start" asChild>
            <a href={`mailto:${provider.email}`}>
              <Mail className="mr-2 h-4 w-4" />
              {provider.email}
            </a>
          </Button>
        )}
        {/* Example GT Verification Badge */}
        <div className="flex items-center space-x-2">
          <CheckCircle className="h-5 w-5 text-green-500" />
          <span className="text-sm">GT Certified</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileSidebar;