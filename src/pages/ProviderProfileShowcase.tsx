import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Crown, Star, Shield } from 'lucide-react';
import FreeProfile from '@/components/provider-profiles/FreeProfile';
import PreferredProfile from '@/components/provider-profiles/PreferredProfile';
import PremierProfile from '@/components/provider-profiles/PremierProfile';
import { freeProfiles, preferredProfiles, premierProfiles } from '@/data/mockProviderProfiles';

const ProviderProfileShowcase = () => {
  const [selectedFree, setSelectedFree] = useState(0);
  const [selectedPreferred, setSelectedPreferred] = useState(0);
  const [selectedPremier, setSelectedPremier] = useState(0);

  const tierFeatures = {
    free: [
      'Basic provider information',
      'Location (city/state only)',
      'Specialties display',
      'Certification badges',
      'Availability status',
      'Mobile responsive'
    ],
    preferred: [
      'Everything in Free, plus:',
      'Professional profile photo',
      'Full contact information',
      'Interactive location map',
      'Detailed bio (150 words)',
      'Office hours display',
      'Social media links',
      'Insurance information',
      'Star ratings & reviews',
      'Enhanced card layout'
    ],
    premier: [
      'Everything in Preferred, plus:',
      'Hero banner section',
      'Video introduction',
      'Photo gallery with lightbox',
      'Extended bio (300+ words)',
      'Published articles showcase',
      'Event & workshop promotion',
      'Patient testimonials',
      'Interactive FAQ section',
      'Direct contact form',
      'Community activity feed',
      'Custom content sections',
      'Premium conversion tools'
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Provider Profile Tiers
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our three distinct profile tiers, each designed to showcase the unique value proposition 
            of Free, Preferred, and Premier memberships.
          </p>
        </div>

        {/* Tier Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="border-2 border-gray-200">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                <Shield className="h-6 w-6 text-gray-600" />
              </div>
              <CardTitle className="text-xl">Free Tier</CardTitle>
              <Badge variant="secondary">Digital Business Card</Badge>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                {tierFeatures.free.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-2 border-blue-200 bg-blue-50/30">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                <Star className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle className="text-xl">Preferred Tier</CardTitle>
              <Badge className="bg-blue-100 text-blue-800">Professional Showcase</Badge>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                {tierFeatures.preferred.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-blue-50">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full flex items-center justify-center mb-3">
                <Crown className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-xl">Premier Tier</CardTitle>
              <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">Conversion Engine</Badge>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                {tierFeatures.premier.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Profile Previews */}
        <Tabs defaultValue="free" className="space-y-8">
          <div className="flex justify-center">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="free">Free</TabsTrigger>
              <TabsTrigger value="preferred">Preferred</TabsTrigger>
              <TabsTrigger value="premier">Premier</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="free">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-gray-600" />
                    Free Tier Profile
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Sample:</span>
                    <select 
                      value={selectedFree}
                      onChange={(e) => setSelectedFree(Number(e.target.value))}
                      className="text-sm border rounded px-2 py-1"
                    >
                      {freeProfiles.slice(0, 5).map((_, index) => (
                        <option key={index} value={index}>
                          Provider {index + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg overflow-hidden">
                  <FreeProfile provider={freeProfiles[selectedFree]} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preferred">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-blue-600" />
                    Preferred Tier Profile
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Sample:</span>
                    <select 
                      value={selectedPreferred}
                      onChange={(e) => setSelectedPreferred(Number(e.target.value))}
                      className="text-sm border rounded px-2 py-1"
                    >
                      {preferredProfiles.slice(0, 5).map((_, index) => (
                        <option key={index} value={index}>
                          Provider {index + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg overflow-hidden">
                  <PreferredProfile provider={preferredProfiles[selectedPreferred]} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="premier">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Crown className="h-5 w-5 text-purple-600" />
                    Premier Tier Profile
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Sample:</span>
                    <select 
                      value={selectedPremier}
                      onChange={(e) => setSelectedPremier(Number(e.target.value))}
                      className="text-sm border rounded px-2 py-1"
                    >
                      {premierProfiles.slice(0, 5).map((_, index) => (
                        <option key={index} value={index}>
                          Provider {index + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg overflow-hidden">
                  <PremierProfile provider={premierProfiles[selectedPremier]} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProviderProfileShowcase;