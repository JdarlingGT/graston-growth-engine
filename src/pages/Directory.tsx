"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ProviderCard from "@/components/directory/ProviderCard";
import {
  DirectoryFilters,
  FullProviderProfile,
  SortOption,
} from "@/types";
import { Search, Filter, RefreshCw } from "lucide-react";
import LeafletDirectoryMap from "@/components/directory/LeafletDirectoryMap";
import FilterPanel from "@/components/directory/FilterPanel";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useMediaQuery } from "@/hooks/use-mobile";
import { showSuccess } from "@/utils/toast";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { mockProviders, specialties } from "@/lib/mockData";
import { useDebounce } from '@/hooks/useDebounce';
import ComparisonBar from "@/components/directory/ComparisonBar";
import { Skeleton } from "@/components/ui/skeleton";

const Directory: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery("(max-width: 1023px)");

  const [providers, setProviders] = useState<FullProviderProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState<DirectoryFilters>({ sortBy: "premier-first" });
  const [hoveredProviderId, setHoveredProviderId] = useState<string | null>(null);
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [compareList, setCompareList] = useState<string[]>([]);
  
  const [mapCenter, setMapCenter] = useState({ lat: 39.8283, lng: -98.5795 });
  const [mapZoom, setMapZoom] = useState(4);
  const [mapBounds, setMapBounds] = useState<any>(null);
  
  // Simulate fetching data
  useEffect(() => {
    setIsLoading(true);
    // In a real app, you'd fetch this from your backend
    const allProviders = [...mockProviders]; 
    setProviders(allProviders);
    setTimeout(() => setIsLoading(false), 1000); // Simulate network delay
  }, []);

  // URL Sync Effect
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const newFilters: DirectoryFilters = { sortBy: "premier-first" };
    // ... logic to parse filters from URL ...
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, [location.search]);

  useEffect(() => {
    const params = new URLSearchParams();
    // ... logic to set URL from filters ...
    navigate(`?${params.toString()}`, { replace: true });
  }, [filters, navigate]);

  const handleFilterChange = (newFilters: DirectoryFilters) => {
    setFilters(newFilters);
  };

  const handleToggleFavorite = (providerId: string) => {
    setProviders(prevProviders =>
      prevProviders.map(p =>
        p.id === providerId ? { ...p, isFavorite: !p.isFavorite } : p
      )
    );
    showSuccess("Favorite status updated! (This is a demo and won't be saved)");
  };

  const handleToggleCompare = (providerId: string) => {
    setCompareList(prev =>
      prev.includes(providerId)
        ? prev.filter(id => id !== providerId)
        : [...prev, providerId]
    );
  };

  const visibleProviders = useMemo(() => {
    if (!mapBounds) {
      return providers; // Initially show all, or could be empty
    }
    
    let filtered = providers.filter(p =>
      p.coordinates && mapBounds.contains([p.coordinates.lat, p.coordinates.lng])
    );

    // Add other filtering logic here (from `filters` state)

    // Add sorting logic here
    filtered.sort((a, b) => {
      const tierOrder = { Premier: 3, Preferred: 2, Free: 1 };
      return tierOrder[b.tier] - tierOrder[a.tier];
    });

    return filtered;
  }, [providers, mapBounds, filters]);

  const providersInCompareList = useMemo(() => 
    providers.filter(p => compareList.includes(p.id)),
    [providers, compareList]
  );

  const ResultsList = () => (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-brand-gray">
        <FilterPanel
          filters={filters}
          onFilterChange={handleFilterChange}
          specialties={specialties}
        />
      </div>
      <div className="flex-grow overflow-y-auto p-4">
        {isLoading ? (
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
            {[...Array(6)].map((_, i) => <Skeleton key={i} className="h-48 w-full" />)}
          </div>
        ) : (
          <>
            <p className="mb-4 text-sm text-brand-text/80">
              Showing {visibleProviders.length} of {providers.length} providers in this map area.
            </p>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
              {visibleProviders.map(provider => (
                <ProviderCard
                  key={provider.id}
                  provider={provider}
                  onMouseEnter={() => setHoveredProviderId(provider.id)}
                  onMouseLeave={() => setHoveredProviderId(null)}
                  onToggleFavorite={handleToggleFavorite}
                  onToggleCompare={handleToggleCompare}
                  isComparing={compareList.includes(provider.id)}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-80px)]"> {/* Adjust height based on header */}
      {isMobile ? (
        <div className="flex flex-col h-full">
          <div className="h-1/3 border-b border-brand-gray">
            <LeafletDirectoryMap
              providers={providers}
              center={mapCenter}
              zoom={mapZoom}
              onBoundsChanged={setMapBounds}
            />
          </div>
          <div className="h-2/3">
            <ResultsList />
          </div>
        </div>
      ) : (
        <>
          <div className="lg:w-3/5 h-full">
            <ResultsList />
          </div>
          <div className="lg:w-2/5 h-full">
            <LeafletDirectoryMap
              providers={providers}
              center={mapCenter}
              zoom={mapZoom}
              onBoundsChanged={setMapBounds}
            />
          </div>
        </>
      )}
      <ComparisonBar 
        providers={providersInCompareList}
        onClear={() => setCompareList([])}
        onRemove={handleToggleCompare}
      />
    </div>
  );
};

export default Directory;