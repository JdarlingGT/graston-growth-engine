"use client";

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UpdateProfileForm } from "@/components/UpdateProfileForm";
import { FullProviderProfile } from "@/types";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const fetchProviderProfile = async (id: string): Promise<FullProviderProfile | null> => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error("Error fetching provider profile:", error);
    return null;
  }

  if (!data) return null;

  // Map DB fields to FullProviderProfile type
  return {
    id: data.id,
    name: data.name || '',
    email: data.email || '',
    specialty: data.specialty || undefined,
    bio: data.bio || undefined,
    experience: data.experience || undefined,
    education: data.education || undefined,
    profileImage: data.profile_image || undefined,
    phone: data.phone || undefined,
    website: data.website || undefined,
    linkedin: data.linkedin || undefined,
    facebook: data.facebook || undefined,
    instagram: data.instagram || undefined,
    twitter: data.twitter || undefined,
    services: data.services || [],
    certifications: data.certifications || [],
    location: data.location || undefined,
    clinicAddress: data.clinic_address || undefined,
    coordinates: data.coordinates || undefined,
    gtCertifications: data.gt_certifications || [],
    verificationBadges: data.verification_badges || [],
    accreditationLogos: data.accreditation_logos || [],
    languagesSpoken: data.languages_spoken || [],
    patientTypes: data.patient_types || [],
    conditionsTreated: data.conditions_treated || [],
    rating: data.rating || undefined,
    reviewCount: data.review_count || undefined,
    isFavorite: data.is_favorite || false,
    tier: data.tier || 'Free',
    clinicianType: data.clinician_type || undefined,
    // These fields are not directly from DB for now, keep as mock or derive
    trialStatus: "N/A", 
    activity: 0,
    churnRisk: false,
  };
};

const UpdateProfilePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: provider, isLoading, isError, refetch } = useQuery<FullProviderProfile | null, Error>({
    queryKey: ['providerProfile', id],
    queryFn: () => (id ? fetchProviderProfile(id) : Promise.resolve(null)),
    enabled: !!id, // Only run query if id is available
  });

  const handleUpdate = (updatedProvider: FullProviderProfile) => {
    // When the form successfully updates, refetch the data to ensure consistency
    refetch(); 
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto py-6">
          <div className="mb-6">
            <Skeleton className="h-10 w-32 mb-4" />
          </div>
          <Card>
            <CardHeader>
              <Skeleton className="h-8 w-1/2 mb-2" />
              <Skeleton className="h-4 w-3/4" />
            </CardHeader>
            <CardContent className="space-y-6">
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (isError || !provider) {
    return (
      <div className="container mx-auto p-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Provider not found</h1>
        <p className="text-muted-foreground mb-4">The provider you are looking for does not exist or an error occurred.</p>
        <Button onClick={() => navigate("/admin")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Admin
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-6">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate(`/provider/${provider.id}`)}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Profile
          </Button>
        </div>
        
        <UpdateProfileForm 
          providerId={provider.id} 
          onUpdate={handleUpdate}
        />
      </div>
    </div>
  );
};

export default UpdateProfilePage;