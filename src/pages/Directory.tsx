"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ProviderCard from "@/components/directory/ProviderCard";
import { FullProviderProfile } from "@/types";
import DirectoryMap from "@/components/directory/DirectoryMap";
import FilterPanel from "@/components/directory/FilterPanel";
import { useMediaQuery } from "@/hooks/use-mobile";
import { mockProviders } from "@/lib/mockData";
import { useDebounce } from '@/hooks/useDebounce';
import { Skeleton } from "@/components/ui/skeleton";
import { useFilterStore } from "@/hooks/useFilterStore";
// Note: React Query would be used here for real data fetching.
// import { useQuery } from "@tanstack/react-query";

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "";

const Directory: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery("(max-width: 1023px)");

  // Global filter state from Zustand
  const filters = useFilterStore();

  // Local UI state
  const [providers, setProviders] = useState<FullProviderProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredProviderId, setHoveredProviderId] = useState<string | null>(null);
  
  // Map state
  const [mapCenter, setMapCenter] = useState({ lat: 39.8283, lng: -98.5795 });
  const [mapZoom, setMapZoom] = useState(4);
  const [mapBounds, setMapBounds] = useState<google.maps.LatLngBounds | null>(null);
  const debouncedBounds = useDebounce(mapBounds, 500);

  // Simulate fetching data based on filters and map bounds
  useEffect(() => {
    setIsLoading(true);
    console.log("Fetching data for bounds:", debouncedBounds);
    // In a real app, this would be a useQuery call with dependencies on `debouncedBounds` and `filters`
    const filteredProviders = mockProviders.filter(p => {
      const inBounds = debouncedBounds 
        ? p.coordinates && debouncedBounds.contains(p.coordinates)
        : true;
      
      const tierMatch = filters.tiers.includes(p.tier);
      const typeMatch = !filters.clinicianType || p.specialty === filters.clinicianType;
      const searchMatch = filters.searchTerm === '' || 
        p.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        p.specialty.toLowerCase().includes(filters.searchTerm.toLowerCase());

      return inBounds && tierMatch && typeMatch && searchMatch;
    });

    setProviders(filteredProviders);
    setTimeout(() => setIsLoading(false), 500); // Simulate network delay
  }, [debouncedBounds, filters]);

  const handleMapCameraChanged = useCallback((ev: any) => {
    const newBounds = ev.map.getBounds();
    if (newBounds) {
      setMapBounds(newBounds);
    }
  }, []);

  const handleMarkerClick = (providerId: string) => {
    // Logic to scroll list to provider card
    console.log("Marker clicked:", providerId);
  };

  const ResultsList = () => (
    <div className="flex flex-col h-full bg-brand-background">
      <FilterPanel />
      <div className="flex-grow overflow-y-auto p-4 space-y-4">
        {isLoading ? (
          [...Array(5)].map((_, i) => <Skeleton key={i} className="h-48 w-full rounded-lg" />)
        ) : (
          <>
            <p className="text-sm text-brand-text/80 px-2">
              Showing {providers.length} providers in this map area.
            </p>
            {providers.map(provider => (
              <ProviderCard
                key={provider.id}
                provider={provider}
                onMouseEnter={() => setHoveredProviderId(provider.id)}
                onMouseLeave={() => setHoveredProviderId(null)}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );

  const mainContent = (
    <div className="grid grid-cols-1 lg:grid-cols-12 h-full">
      <div className="lg:col-span-5 xl:col-span-4 h-full">
        <ResultsList />
      </div>
      <div className="lg:col-span-7 xl:col-span-8 h-full">
        <DirectoryMap
          providers={providers}
          apiKey={GOOGLE_MAPS_API_KEY}
          center={mapCenter}
          zoom={mapZoom}
          onCameraChanged={handleMapCameraChanged}
          hoveredProviderId={hoveredProviderId}
          onMarkerClick={handleMarkerClick}
        />
      </div>
    </div>
  );

  return (
    <div className="h-[calc(100vh-80px)]"> {/* Adjust height based on header */}
      {isMobile ? (
        <div className="flex flex-col h-full">
          <div className="h-1/2">
            <DirectoryMap
              providers={providers}
              apiKey={GOOGLE_MAPS_API_KEY}
              center={mapCenter}
              zoom={mapZoom}
              onCameraChanged={handleMapCameraChanged}
              hoveredProviderId={hoveredProviderId}
              onMarkerClick={handleMarkerClick}
            />
          </div>
          <div className="h-1/2">
            <ResultsList />
          </div>
        </div>
      ) : mainContent}
    </div>
  );
};

export default Directory;