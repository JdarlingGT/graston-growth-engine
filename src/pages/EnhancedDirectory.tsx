"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import EnhancedProviderCard from "@/components/enhanced-directory/EnhancedProviderCard";
import EnhancedDirectoryMap from "@/components/enhanced-directory/EnhancedDirectoryMap";
import { EnhancedSearch } from "@/components/ui/enhanced-search";
import { EnhancedButton } from "@/components/ui/enhanced-button";
import { EnhancedCard, EnhancedCardContent } from "@/components/ui/enhanced-card";
import { EnhancedTooltip, EnhancedTooltipContent, EnhancedTooltipTrigger, EnhancedTooltipProvider } from "@/components/ui/enhanced-tooltip";
import { EmptyState } from "@/components/ui/empty-state";
import { ProviderCardSkeleton, MapSidebarSkeleton } from "@/components/ui/skeleton-loader";
import { SuccessAnimation } from "@/components/ui/success-animation";
import { PageTransition } from "@/components/ui/page-transition";
import FilterPanel from "@/components/directory/FilterPanel";
import ComparisonBar from "@/components/directory/ComparisonBar";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  DirectoryFilters,
  FullProviderProfile,
  SortOption,
  Tier,
  TrainingLevel,
  Language,
  Condition,
  PatientDemographic,
  RadiusOption,
  ClinicianType,
} from "@/types";
import { 
  Search, 
  Filter, 
  RefreshCw, 
  List, 
  Map, 
  Star, 
  MapPin,
  Users,
  TrendingUp,
  Settings,
  Heart,
  Grid3X3,
  LayoutList
} from "lucide-react";
import { useMediaQuery } from "@/hooks/use-mobile";
import { showSuccess, showError } from "@/utils/toast";
import { getGeocode, getLatLng } from "use-places-autocomplete";
import { mockProviders, specialties } from "@/lib/mockData";
import Fuse from 'fuse.js';
import { useDebounce } from '@/hooks/useDebounce';
import smallProvidersRaw from '@/lib/smallProviderData.json';

// Type definition for external raw providers JSON
type RawProvider = {
  provider_name: string;
  clinic_name: string;
  city: string;
  state: string;
  phone: string;
  email: string;
  website: string;
  specialties: string[];
  languages_spoken: string[];
  clinician_type: string;
  provider_tier: string;
  latitude: number;
  longitude: number;
  bio?: string;
};

const EnhancedDirectory: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  // State management
  const [filters, setFilters] = useState<DirectoryFilters>({ sortBy: "premier-first" });
  const [hoveredProviderId, setHoveredProviderId] = useState<string | null>(null);
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('map');
  const [listViewMode, setListViewMode] = useState<'grid' | 'list'>('grid');
  const [compareList, setCompareList] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState<any[]>([]);

  // Generate enhanced provider data
  const [localProviders, setLocalProviders] = useState<FullProviderProfile[]>(() => {
    const external = (smallProvidersRaw as RawProvider[]).map((p: RawProvider, idx: number) => ({
      ...p,
      id: `ext-${idx}`,
      name: p.provider_name,
      specialty: p.specialties.join(', '),
      profileImage: `https://i.pravatar.cc/150?u=ext-${idx}`,
      location: `${p.city}, ${p.state}`,
      clinicAddress: p.clinic_name,
      coordinates: { lat: p.latitude, lng: p.longitude },
      tier: (p.provider_tier === 'Basic' ? 'Free' : p.provider_tier) as Tier,
      clinicianType: p.clinician_type as ClinicianType,
      languagesSpoken: p.languages_spoken as Language[],
      email: p.email,
      phone: p.phone,
      website: p.website,
      bio: p.bio || '',
      trialStatus: 'N/A',
      activity: 0,
      churnRisk: false,
      rating: 4 + Math.random(),
      reviewCount: Math.floor(Math.random() * 200) + 10,
      isFavorite: false,
      engagementScore: Math.floor(Math.random() * 100),
      views: Math.floor(Math.random() * 1000),
      can_compare: p.provider_tier !== 'Basic',
    } as FullProviderProfile));
    
    const base = [...mockProviders, ...external];
    const list: FullProviderProfile[] = [];
    for (let i = 0; i < 100; i++) {
      const p = base[i % base.length];
      list.push({ 
        ...p, 
        id: `${p.id}-${i}`, 
        can_compare: p.tier !== 'Free',
        engagementScore: p.engagementScore || Math.floor(Math.random() * 100),
        views: p.views || Math.floor(Math.random() * 1000)
      });
    }
    return list;
  });

  const [mapCenter, setMapCenter] = useState({ lat: 39.8283, lng: -98.5795 });
  const [mapZoom, setMapZoom] = useState(4);
  const [searchOnMapMove, setSearchOnMapMove] = useState(true);
  const [mapBounds, setMapBounds] = useState<google.maps.LatLngBounds | null>(null);
  const [displayCount, setDisplayCount] = useState(12);

  // Intersection observer for infinite scroll
  const { ref: loadMoreRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  // Search functionality
  const fuse = useMemo(() =>
    new Fuse(localProviders, { 
      keys: ['name', 'specialty', 'bio', 'location'], 
      threshold: 0.4,
      includeScore: true 
    }),
  [localProviders]);

  // Enhanced search with suggestions
  const handleSearch = async (query: string) => {
    setIsLoading(true);
    
    // Simulate API delay for better UX
    await new Promise(resolve => setTimeout(resolve, 300));
    
    setFilters(prev => ({ ...prev, searchTerm: query }));
    
    // Geocode if it looks like a location
    if (query.includes(',') || /\d{5}/.test(query)) {
      try {
        const results = await getGeocode({ address: query });
        const { lat, lng } = await getLatLng(results[0]);
        setMapCenter({ lat, lng });
        setMapZoom(10);
      } catch (error) {
        console.error("Geocoding error:", error);
      }
    }
    
    setIsLoading(false);
  };

  // Filter and sort providers
  const filteredAndSortedProviders = useMemo(() => {
    let filtered = localProviders;

    // Apply all filters
    if (filters.searchTerm) {
      const searchResults = fuse.search(filters.searchTerm);
      filtered = searchResults.map(result => result.item);
    }

    if (filters.city) {
      filtered = filtered.filter(p => p.location?.toLowerCase().includes(filters.city!.toLowerCase()));
    }
    if (filters.state && filters.state !== 'All') {
      filtered = filtered.filter(p => p.location?.toLowerCase().includes(filters.state!.toLowerCase()));
    }
    if (filters.clinicianType && filters.clinicianType !== 'All') {
      filtered = filtered.filter(p => p.clinicianType === filters.clinicianType);
    }
    if (filters.specialty && filters.specialty !== 'All') {
      filtered = filtered.filter(p => p.specialty === filters.specialty);
    }
    if (filters.tier && filters.tier !== 'All') {
      filtered = filtered.filter(p => p.tier === filters.tier);
    }
    if (filters.favoritesOnly) {
      filtered = filtered.filter(p => p.isFavorite);
    }

    // Filter by map bounds when enabled
    if (viewMode === 'map' && searchOnMapMove && mapBounds) {
      filtered = filtered.filter(p =>
        p.coordinates && mapBounds.contains(p.coordinates)
      );
    }

    // Sort results
    filtered.sort((a, b) => {
      if (filters.sortBy === 'premier-first') {
        const tierOrder: Record<Tier, number> = { Premier: 3, Preferred: 2, Free: 1 };
        return tierOrder[b.tier] - tierOrder[a.tier];
      } else if (filters.sortBy === 'top-rated') {
        return (b.rating || 0) - (a.rating || 0);
      } else if (filters.sortBy === 'most-reviewed') {
        return (b.reviewCount || 0) - (a.reviewCount || 0);
      }
      return 0;
    });

    return filtered;
  }, [localProviders, filters, searchOnMapMove, mapBounds, viewMode, fuse]);

  // Infinite scroll effect
  useEffect(() => {
    if (inView && displayCount < filteredAndSortedProviders.length) {
      setDisplayCount(prev => Math.min(prev + 12, filteredAndSortedProviders.length));
    }
  }, [inView, filteredAndSortedProviders.length, displayCount]);

  // Displayed providers for current view
  const displayedProviders = filteredAndSortedProviders.slice(0, displayCount);
  const providersInCompareList = useMemo(() => 
    localProviders.filter(p => compareList.includes(p.id)),
    [localProviders, compareList]
  );

  // Event handlers
  const handleToggleFavorite = (providerId: string) => {
    setLocalProviders(prevProviders =>
      prevProviders.map(p =>
        p.id === providerId ? { ...p, isFavorite: !p.isFavorite } : p
      )
    );
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  const handleToggleCompare = (providerId: string) => {
    setCompareList(prev => {
      const newList = prev.includes(providerId)
        ? prev.filter(id => id !== providerId)
        : [...prev, providerId];
      
      if (newList.length > prev.length) {
        showSuccess("Provider added to comparison");
      }
      
      return newList;
    });
  };

  const resetFilters = () => {
    setFilters({ sortBy: "premier-first" });
    setDisplayCount(12);
  };

  // Stats for the header
  const stats = useMemo(() => ({
    total: filteredAndSortedProviders.length,
    premier: filteredAndSortedProviders.filter(p => p.tier === 'Premier').length,
    avgRating: filteredAndSortedProviders.reduce((acc, p) => acc + (p.rating || 0), 0) / filteredAndSortedProviders.length,
  }), [filteredAndSortedProviders]);

  return (
    <EnhancedTooltipProvider>
      <PageTransition>
        <div className="container mx-auto p-4 md:p-8 space-y-6">
          {/* Enhanced Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Provider Directory</h1>
                <p className="text-muted-foreground mt-1">
                  Discover and connect with healthcare professionals in your area
                </p>
              </div>
              
              {/* Stats */}
              <div className="flex gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{stats.total}</div>
                  <div className="text-xs text-muted-foreground">Providers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{stats.premier}</div>
                  <div className="text-xs text-muted-foreground">Premier</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600 flex items-center gap-1">
                    <Star className="h-5 w-5" />
                    {stats.avgRating.toFixed(1)}
                  </div>
                  <div className="text-xs text-muted-foreground">Avg Rating</div>
                </div>
              </div>
            </div>

            {/* Enhanced Search */}
            <EnhancedSearch
              onSearch={handleSearch}
              suggestions={searchSuggestions}
              loading={isLoading}
              placeholder="Search providers, specialties, or locations..."
            />
          </motion.div>

          {/* Controls */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          >
            <div className="flex items-center gap-2">
              <EnhancedButton
                onClick={() => setIsFilterPanelOpen(true)}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Filter className="h-4 w-4" />
                Filters
                {Object.keys(filters).length > 1 && (
                  <Badge variant="secondary" className="ml-1">
                    {Object.keys(filters).length - 1}
                  </Badge>
                )}
              </EnhancedButton>
              
              <EnhancedTooltip>
                <EnhancedTooltipTrigger asChild>
                  <EnhancedButton variant="outline" onClick={resetFilters}>
                    <RefreshCw className="h-4 w-4" />
                  </EnhancedButton>
                </EnhancedTooltipTrigger>
                <EnhancedTooltipContent>Reset all filters</EnhancedTooltipContent>
              </EnhancedTooltip>
            </div>

            <div className="flex items-center gap-2">
              {/* View mode toggle */}
              <ToggleGroup 
                type="single" 
                value={viewMode} 
                onValueChange={(value: 'list' | 'map') => value && setViewMode(value)}
              >
                <EnhancedTooltip>
                  <EnhancedTooltipTrigger asChild>
                    <ToggleGroupItem value="map" aria-label="Map view">
                      <Map className="h-4 w-4" />
                    </ToggleGroupItem>
                  </EnhancedTooltipTrigger>
                  <EnhancedTooltipContent>Map view</EnhancedTooltipContent>
                </EnhancedTooltip>
                
                <EnhancedTooltip>
                  <EnhancedTooltipTrigger asChild>
                    <ToggleGroupItem value="list" aria-label="List view">
                      <List className="h-4 w-4" />
                    </ToggleGroupItem>
                  </EnhancedTooltipTrigger>
                  <EnhancedTooltipContent>List view</EnhancedTooltipContent>
                </EnhancedTooltip>
              </ToggleGroup>

              {/* List view mode toggle */}
              {viewMode === 'list' && (
                <ToggleGroup 
                  type="single" 
                  value={listViewMode} 
                  onValueChange={(value: 'grid' | 'list') => value && setListViewMode(value)}
                >
                  <EnhancedTooltip>
                    <EnhancedTooltipTrigger asChild>
                      <ToggleGroupItem value="grid" aria-label="Grid layout">
                        <Grid3X3 className="h-4 w-4" />
                      </ToggleGroupItem>
                    </EnhancedTooltipTrigger>
                    <EnhancedTooltipContent>Grid layout</EnhancedTooltipContent>
                  </EnhancedTooltip>
                  
                  <EnhancedTooltip>
                    <EnhancedTooltipTrigger asChild>
                      <ToggleGroupItem value="list" aria-label="List layout">
                        <LayoutList className="h-4 w-4" />
                      </ToggleGroupItem>
                    </EnhancedTooltipTrigger>
                    <EnhancedTooltipContent>List layout</EnhancedTooltipContent>
                  </EnhancedTooltip>
                </ToggleGroup>
              )}
            </div>
          </motion.div>

          {/* Main Content */}
          <div className="grid gap-6 grid-cols-1 lg:grid-cols-4">
            {/* Filter Panel */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-1"
            >
              <div className="hidden lg:block">
                <FilterPanel
                  filters={filters}
                  onFilterChange={setFilters}
                  specialties={specialties}
                />
              </div>
            </motion.div>

            {/* Main Content Area */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="lg:col-span-3"
            >
              <AnimatePresence mode="wait">
                {viewMode === 'map' ? (
                  <motion.div
                    key="map-view"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    {googleMapsApiKey ? (
                      <div className="grid gap-4 grid-cols-1 xl:grid-cols-3">
                        {/* Map */}
                        <div className="xl:col-span-2">
                          <EnhancedCard className="h-[600px] w-full overflow-hidden">
                            <EnhancedDirectoryMap
                              providers={filteredAndSortedProviders}
                              apiKey={googleMapsApiKey}
                              center={mapCenter}
                              zoom={mapZoom}
                              onBoundsChanged={setMapBounds}
                              hoveredProviderId={hoveredProviderId}
                              onProviderHover={setHoveredProviderId}
                            />
                          </EnhancedCard>
                          
                          <div className="flex items-center space-x-2 mt-4">
                            <Checkbox
                              id="search-on-move"
                              checked={searchOnMapMove}
                              onCheckedChange={(checked) => setSearchOnMapMove(Boolean(checked))}
                            />
                            <Label htmlFor="search-on-move" className="text-sm font-medium">
                              Filter results as I move the map
                            </Label>
                          </div>
                        </div>
                        
                        {/* Provider List Sidebar */}
                        <div className="xl:col-span-1">
                          <EnhancedCard className="h-[600px] overflow-hidden">
                            <EnhancedCardContent className="p-4 h-full">
                              <div className="flex justify-between items-center mb-4">
                                <h3 className="font-semibold text-lg">
                                  Providers ({filteredAndSortedProviders.length})
                                </h3>
                              </div>
                              <div className="space-y-3 overflow-y-auto h-full">
                                {isLoading ? (
                                  <MapSidebarSkeleton />
                                ) : filteredAndSortedProviders.length === 0 ? (
                                  <EmptyState
                                    icon={<MapPin className="h-12 w-12" />}
                                    title="No providers found"
                                    description="Try adjusting your search criteria or expanding the map area."
                                    action={{
                                      label: "Reset Filters",
                                      onClick: resetFilters
                                    }}
                                  />
                                ) : (
                                  filteredAndSortedProviders.map((provider, index) => (
                                    <motion.div
                                      key={provider.id}
                                      initial={{ opacity: 0, y: 20 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      transition={{ delay: index * 0.05 }}
                                      className="p-3 border rounded-lg hover:bg-muted/50 cursor-pointer transition-all duration-200 hover:shadow-sm"
                                      onMouseEnter={() => setHoveredProviderId(provider.id)}
                                      onMouseLeave={() => setHoveredProviderId(null)}
                                      onClick={() => navigate(`/directory/provider/${provider.id}`)}
                                    >
                                      <div className="flex items-start gap-3">
                                        <motion.img
                                          whileHover={{ scale: 1.05 }}
                                          src={provider.profileImage}
                                          alt={provider.name}
                                          className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                                        />
                                        <div className="flex-1 min-w-0">
                                          <h4 className="font-medium text-sm truncate hover:text-primary transition-colors">
                                            {provider.name}
                                          </h4>
                                          <p className="text-xs text-muted-foreground truncate">
                                            {provider.specialty}
                                          </p>
                                          <p className="text-xs text-muted-foreground truncate">
                                            {provider.location}
                                          </p>
                                          <div className="flex items-center mt-1">
                                            <Star className="h-3 w-3 text-yellow-500 mr-1" />
                                            <span className="text-xs">{provider.rating?.toFixed(1)}</span>
                                          </div>
                                        </div>
                                      </div>
                                    </motion.div>
                                  ))
                                )}
                              </div>
                            </EnhancedCardContent>
                          </EnhancedCard>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-lg">
                        <p className="font-bold">Google Maps API Key Missing</p>
                        <p>To enable the interactive map, please set the `VITE_GOOGLE_MAPS_API_KEY` environment variable.</p>
                      </div>
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    key="list-view"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    {isLoading ? (
                      <div className={`grid gap-6 ${listViewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
                        {Array.from({ length: 6 }).map((_, i) => (
                          <ProviderCardSkeleton key={i} />
                        ))}
                      </div>
                    ) : filteredAndSortedProviders.length === 0 ? (
                      <EmptyState
                        icon={<Users className="h-16 w-16" />}
                        title="No providers found"
                        description="We couldn't find any providers matching your search criteria. Try adjusting your filters or search terms."
                        action={{
                          label: "Reset Filters",
                          onClick: resetFilters
                        }}
                      />
                    ) : (
                      <>
                        <div className={`grid gap-6 ${listViewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
                          <AnimatePresence>
                            {displayedProviders.map((provider, index) => (
                              <motion.div
                                key={provider.id}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ delay: index * 0.05 }}
                              >
                                <EnhancedProviderCard
                                  provider={provider}
                                  onMouseEnter={() => setHoveredProviderId(provider.id)}
                                  onMouseLeave={() => setHoveredProviderId(null)}
                                  onToggleFavorite={handleToggleFavorite}
                                  onToggleCompare={handleToggleCompare}
                                  isComparing={compareList.includes(provider.id)}
                                  viewMode={listViewMode}
                                />
                              </motion.div>
                            ))}
                          </AnimatePresence>
                        </div>

                        {/* Load more trigger */}
                        {displayCount < filteredAndSortedProviders.length && (
                          <div ref={loadMoreRef} className="text-center mt-8">
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="text-sm text-muted-foreground"
                            >
                              Loading more providers...
                            </motion.div>
                          </div>
                        )}
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Mobile Filter Sheet */}
          <Sheet open={isFilterPanelOpen} onOpenChange={setIsFilterPanelOpen}>
            <SheetContent side="left" className="w-full sm:max-w-sm overflow-y-auto">
              <div className="p-4">
                <FilterPanel
                  filters={filters}
                  onFilterChange={setFilters}
                  specialties={specialties}
                />
                <EnhancedButton 
                  className="w-full mt-4" 
                  onClick={() => setIsFilterPanelOpen(false)}
                >
                  Apply Filters
                </EnhancedButton>
              </div>
            </SheetContent>
          </Sheet>

          {/* Comparison Bar */}
          <AnimatePresence>
            {compareList.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 100 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <ComparisonBar 
                  providers={providersInCompareList}
                  onClear={() => setCompareList([])}
                  onRemove={handleToggleCompare}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Success Animation */}
          <SuccessAnimation
            show={showSuccess}
            message="Added to favorites!"
            onComplete={() => setShowSuccess(false)}
          />
        </div>
      </PageTransition>
    </EnhancedTooltipProvider>
  );
};

export default EnhancedDirectory;