"use client";

import React from "react";
import { useParams } from "react-router-dom";
import { useProvider } from "@/hooks/useProvider";
import ProfileHeader from "@/components/ProfileHeader";
import ContactCard from "@/components/ContactCard";
import LocationCard from "@/components/LocationCard";
import ProfileBody from "@/components/ProfileBody";
import { Skeleton } from "@/components/ui/skeleton";

const ProviderDetail = () => {
  const { providerId } = useParams<{ providerId: string }>();
  // We use a mock ID, but in a real app this would come from the URL
  const id = providerId ? parseInt(providerId, 10) : 101;
  const { data: provider, isLoading, isError } = useProvider(id);

  if (isLoading) return <ProviderDetailSkeleton />;
  if (isError || !provider) return <p className="text-center p-8 text-destructive">Error: Profile could not be loaded.</p>;

  return (
    <div className="bg-muted/40">
      <ProfileHeader provider={provider} />
      <main className="container mx-auto py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            <ProfileBody provider={provider} />
          </div>
          <aside className="lg:col-span-4 space-y-8">
            <ContactCard provider={provider} />
            <LocationCard provider={provider} />
          </aside>
        </div>
      </main>
    </div>
  );
};

const ProviderDetailSkeleton = () => (
    <div className="bg-muted/40">
        <div className="bg-white p-6 flex items-end space-x-6 shadow">
            <Skeleton className="h-32 w-32 rounded-full" />
            <div className="flex-1 space-y-2">
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-6 w-1/2" />
                <Skeleton className="h-5 w-1/3" />
            </div>
        </div>
        <main className="container mx-auto py-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-8 space-y-6">
                    <div className="flex space-x-1 border-b">
                        <Skeleton className="h-10 w-24" />
                        <Skeleton className="h-10 w-24" />
                        <Skeleton className="h-10 w-24" />
                    </div>
                    <Skeleton className="h-96 w-full rounded-lg" />
                </div>
                <aside className="lg:col-span-4 space-y-8">
                    <Skeleton className="h-64 w-full rounded-lg" />
                    <Skeleton className="h-64 w-full rounded-lg" />
                </aside>
            </div>
        </main>
    </div>
);

export default ProviderDetail;