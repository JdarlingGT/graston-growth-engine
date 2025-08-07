import React from "react";
import { mockProviders } from "@/lib/mockData";
import ProviderCard from "@/components/directory/ProviderCard";
import { FullProviderProfile } from "@/types";

const Directory: React.FC = () => {
  const specialties: string[] = Array.from(
    new Set<string>(
      mockProviders.flatMap(
        (p: FullProviderProfile) => (p.specialty ? [p.specialty] : [])
      )
    )
  );

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Provider Directory</h1>
      <p className="text-sm text-muted-foreground mb-4">
        Browse {mockProviders.length} providers{specialties.length > 0 && ` across ${specialties.length} specialties`}.
      </p>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {mockProviders.map((provider) => (
          <ProviderCard key={provider.id} provider={provider} />
        ))}
      </div>
      {mockProviders.length === 0 && (
        <p className="text-center text-muted-foreground mt-8">No providers found.</p>
      )}
    </div>
  );
};

export default Directory;