"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ProviderCard from "@/components/directory/ProviderCard";
import { FullProviderProfile, Condition, Language } from "@/types"; // Import Condition and Language types
import DirectoryMap from "@/components/directory/DirectoryMap";
import FilterPanel from "@/components/directory/FilterPanel";
import { useMediaQuery } from "@/hooks/use-mobile";
import { mockProviders } from "@/lib/mockData";
import { useDebounce } from '@/hooks/useDebounce';
import { Skeleton } from "@/components/ui/skeleton";
import { useFilterStore } from "@/hooks/useFilterStore";
import { motion, AnimatePresence } from "framer-motion";

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "";

const Directory: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery("(max-width: 1023px)");

  // Global filter state from Zustand
  const { searchTerm, clinicianType, condition, language, tiers, acceptingNewPatients, setSearchTerm, setClinicianType, setCondition, setLanguage, setTiers } = useFilterStore();

  // Local UI state
  const [providers, setProviders] = useState<FullProviderProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredProviderId, setHoveredProviderId] = useState<string | null>(null);
  
  // Map state - always start at default values
  const [mapCenter, setMapCenter] = useState({ lat: 39.8283, lng: -98.5795 });
  const [mapZoom, setMapZoom] = useState(4);
  const [mapBounds, setMapBounds] = useState<google.maps.LatLngBounds | null>(null);
  const debouncedBounds = useDebounce(mapBounds, 500);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const debouncedClinicianType = useDebounce(clinicianType, 500);
  const debouncedCondition = useDebounce(condition, 500);
  const debouncedLanguage = useDebounce(language, 500);
  const debouncedTiers = useDebounce(tiers, 500);
  const debouncedAcceptingNewPatients = useDebounce(acceptingNewPatients, 500);

  // Refs for scrolling to provider cards
  const providerCardRefs = useRef<Map<string, HTMLDivElement | null>>(new Map());

  // URL State Synchronization - Read from URL on mount (only filters, not map state)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSearchTerm(params.get('search') || '');
    setClinicianType(params.get('clinicianType') || null);
    setCondition(params.get('condition') as Condition || null);
    setLanguage(params.get('language') as Language || null);
    setTiers(params.get('tiers')?.split(',') || ['Premier', 'Preferred', 'Free']);
  }, [location.search, setSearchTerm, setClinicianType, setCondition, setLanguage, setTiers]);

  // URL State Synchronization - Write to URL on filter state change (not map state change)
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchTerm) params.set('search', searchTerm);
    if (clinicianType) params.set('clinicianType', clinicianType);
    if (condition) params.set('condition', condition);
    if (language) params.set('language', language);
    if (tiers.length < 3) params.set('tiers', tiers.join(','));
    
    if (params.toString() !== new URLSearchParams(location.search).toString()) {
      navigate(`?${params.toString()}`, { replace: true });
    }
  }, [searchTerm, clinicianType, condition, language, tiers, navigate, location.search]);

  // Fetch and filter data from mock data source
  useEffect(() => {
    const processDemoData = () => {
      setIsLoading(true);

      let filteredData: FullProviderProfile[] = [...mockProviders];

      // Apply text search filter
      if (debouncedSearchTerm) {
        const lowercasedTerm = debouncedSearchTerm.toLowerCase();
        filteredData = filteredData.filter(p =>
          p.name?.toLowerCase().includes(lowercasedTerm) ||
          p.specialty?.toLowerCase().includes(lowercasedTerm) ||
          p.clinic_address?.toLowerCase().includes(lowercasedTerm) ||
          p.location?.toLowerCase().includes(lowercasedTerm)
        );
      }

      // Apply clinician type filter
      if (debouncedClinicianType) {
        filteredData = filteredData.filter(p => p.clinician_type === debouncedClinicianType);
      }

      // Apply condition filter
      if (debouncedCondition) {
        filteredData = filteredData.filter(p => p.conditions_treated?.includes(debouncedCondition));
      }

      // Apply language filter
      if (debouncedLanguage) {
        filteredData = filteredData.filter(p => p.languages_spoken?.includes(debouncedLanguage));
      }

      // Apply tier filter
      if (debouncedTiers && debouncedTiers.length > 0 && debouncedTiers.length < 3) {
        filteredData = filteredData.filter(p => p.tier && debouncedTiers.includes(p.tier));
      }

      // Apply accepting new patients filter
      if (debouncedAcceptingNewPatients) {
        filteredData = filteredData.filter(p => p.accepting_new_patients === true);
      }

      // Apply map bounds filter
      if (debouncedBounds) {
        filteredData = filteredData.filter(p =>
          p.coordinates && debouncedBounds.contains(new google.maps.LatLng(p.coordinates.lat, p.coordinates.lng))
        );
      }

      setProviders(filteredData);
      setIsLoading(false);
    };

    // Use a timeout to simulate network latency for a better demo experience
    const timer = setTimeout(() => {
      processDemoData();
    }, 300); 

    return () => clearTimeout(timer);
  }, [debouncedBounds, debouncedSearchTerm, debouncedClinicianType, debouncedCondition, debouncedLanguage, debouncedTiers, debouncedAcceptingNewPatients]);

  const handleMapCameraChanged = useCallback((ev: any) => {
    const newBounds = ev.map.getBounds();
    const newCenter = ev.map.getCenter();
    const newZoom = ev.map.getZoom();
    if (newBounds) {
      setMapBounds(newBounds);
      setMapCenter({ lat: newCenter.lat(), lng: newCenter.lng() });
      setMapZoom(newZoom);
    }
  }, []);

  const handleMarkerClick = useCallback((providerId: string) => {
    const cardElement = providerCardRefs.current.get(providerId);
    if (cardElement) {
      cardElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, []);

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
            <AnimatePresence mode="wait">
              {providers.map(provider => (
                <motion.div
                  key={provider.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  ref={el => providerCardRefs.current.set(provider.id, el)}
                >
                  <ProviderCard
                    provider={provider}
                    onMouseEnter={() => setHoveredProviderId(provider.id)}
                    onMouseLeave={() => setHoveredProviderId(null)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
            {!isLoading && providers.length === 0 && (
              <div className="text-center text-brand-text/70 p-4">
                No providers found matching your criteria in this area. Try adjusting your filters or moving the map.
              </div>
            )}
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