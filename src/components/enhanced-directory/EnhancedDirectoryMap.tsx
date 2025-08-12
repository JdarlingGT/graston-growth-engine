"use client";

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { GoogleMap, MarkerF, InfoWindowF, useLoadScript } from '@react-google-maps/api';
import { motion, AnimatePresence } from 'framer-motion';
import { FullProviderProfile } from '@/types';
import { Star, MapPin, Phone, Globe, Navigation, Maximize2 } from 'lucide-react';
import { EnhancedButton } from '@/components/ui/enhanced-button';
import { EnhancedTooltip, EnhancedTooltipContent, EnhancedTooltipTrigger } from '@/components/ui/enhanced-tooltip';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useNavigate } from 'react-router-dom';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

const mapContainerStyle = {
  width: '100%',
  height: '100%',
};

const mapOptions = {
  disableDefaultUI: true,
  zoomControl: true,
  mapTypeControl: false,
  scaleControl: true,
  streetViewControl: false,
  rotateControl: false,
  fullscreenControl: false,
  gestureHandling: 'greedy',
  styles: [
    {
      featureType: "poi",
      elementType: "labels",
      stylers: [{ visibility: "off" }]
    },
    {
      featureType: "transit",
      elementType: "labels",
      stylers: [{ visibility: "off" }]
    }
  ]
};

interface EnhancedDirectoryMapProps {
  providers: FullProviderProfile[];
  apiKey: string;
  center: { lat: number; lng: number };
  zoom: number;
  onBoundsChanged: (bounds: google.maps.LatLngBounds) => void;
  hoveredProviderId?: string | null;
  onProviderHover?: (providerId: string | null) => void;
}

const EnhancedDirectoryMap: React.FC<EnhancedDirectoryMapProps> = ({
  providers,
  apiKey,
  center,
  zoom,
  onBoundsChanged,
  hoveredProviderId,
  onProviderHover,
}) => {
  const mapRef = useRef<google.maps.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<FullProviderProfile | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const navigate = useNavigate();

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: apiKey,
    libraries: ['places'],
  });

  const onLoad = useCallback(function callback(map: google.maps.Map) {
    mapRef.current = map;
    setMapLoaded(true);
  }, []);

  const onUnmount = useCallback(function callback() {
    mapRef.current = null;
    setMapLoaded(false);
  }, []);

  const onIdle = useCallback(() => {
    if (mapRef.current) {
      const bounds = mapRef.current.getBounds();
      if (bounds) {
        onBoundsChanged(bounds);
      }
    }
  }, [onBoundsChanged]);

  // Get user's current location
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(location);
          if (mapRef.current) {
            mapRef.current.setCenter(location);
            mapRef.current.setZoom(12);
          }
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  };

  useEffect(() => {
    if (mapLoaded && mapRef.current) {
      mapRef.current.setCenter(center);
      mapRef.current.setZoom(zoom);
    }
  }, [center, zoom, mapLoaded]);

  const getMarkerIcon = (provider: FullProviderProfile, isHovered: boolean) => {
    let color = '#dc2626'; // red for Free tier
    let size = 8;
    
    if (provider.tier === 'Premier') {
      color = '#7c3aed'; // purple for Premier
      size = 12;
    } else if (provider.tier === 'Preferred') {
      color = '#2563eb'; // blue for Preferred
      size = 10;
    }
    
    if (isHovered) {
      size += 4;
    }

    return {
      path: google.maps.SymbolPath.CIRCLE,
      fillColor: color,
      fillOpacity: 0.9,
      strokeColor: '#ffffff',
      strokeWeight: 3,
      scale: size,
      anchor: new google.maps.Point(0, 0),
    };
  };

  if (loadError) {
    return (
      <div className="h-full flex items-center justify-center bg-muted/20 rounded-lg">
        <div className="text-center">
          <p className="text-destructive font-medium">Error loading maps</p>
          <p className="text-sm text-muted-foreground mt-1">Please check your internet connection</p>
        </div>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="h-full flex items-center justify-center bg-muted/20 rounded-lg">
        <LoadingSpinner size="lg" text="Loading interactive map..." />
      </div>
    );
  }

  return (
    <div className="relative h-full w-full rounded-lg overflow-hidden">
      {/* Map controls */}
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
        <EnhancedTooltip>
          <EnhancedTooltipTrigger asChild>
            <EnhancedButton
              variant="secondary"
              size="icon"
              onClick={getCurrentLocation}
              className="shadow-lg bg-white/90 backdrop-blur-sm"
            >
              <Navigation className="h-4 w-4" />
            </EnhancedButton>
          </EnhancedTooltipTrigger>
          <EnhancedTooltipContent>Find my location</EnhancedTooltipContent>
        </EnhancedTooltip>

        <EnhancedTooltip>
          <EnhancedTooltipTrigger asChild>
            <EnhancedButton
              variant="secondary"
              size="icon"
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="shadow-lg bg-white/90 backdrop-blur-sm"
            >
              <Maximize2 className="h-4 w-4" />
            </EnhancedButton>
          </EnhancedTooltipTrigger>
          <EnhancedTooltipContent>Toggle fullscreen</EnhancedTooltipContent>
        </EnhancedTooltip>
      </div>

      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={zoom}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onIdle={onIdle}
        options={mapOptions}
      >
        {/* User location marker */}
        {userLocation && (
          <MarkerF
            position={userLocation}
            icon={{
              path: google.maps.SymbolPath.CIRCLE,
              fillColor: '#4285f4',
              fillOpacity: 1,
              strokeColor: '#ffffff',
              strokeWeight: 3,
              scale: 8,
            }}
            title="Your location"
          />
        )}

        {/* Provider markers */}
        {providers.map((provider) => {
          if (!provider.<think>Deciding which files are relevant...

["src/components/SearchBar.tsx", "src/components/directory/DirectoryMap.tsx", "src/pages/Directory.tsx", "src/components/ui/input.tsx", "src/components/ui/button.tsx"]</think><think>Ranked files:

src/components/SearchBar.tsx: 0.98

src/components/directory/DirectoryMap.tsx: 0.92

src/pages/Directory.tsx: 0.92

src/components/ui/input.tsx: 0.79

src/components/ui/button.tsx: 0.74

src/components/ui/command.tsx: 0.58

src/components/directory/ProviderCard.tsx: 0.47

src/pages/Index.tsx: 0.45

src/components/ui/card.tsx: 0.40

src/components/directory/FilterPanel.tsx: 0.39

src/App.tsx: 0.37

src/components/ui/sheet.tsx: 0.35

src/components/ui/toaster.tsx: 0.33

src/components/directory/ComparisonBar.tsx: 0.30

src/components/ui/popover.tsx: 0.28

src/components/ui/label.tsx: 0.27

src/components/ui/skeleton.tsx: 0.26

src/utils/toast.ts: 0.25

src/components/ui/checkbox.tsx: 0.25

src/pages/Provider.tsx: 0.24

src/components/directory/MiniProfileCard.tsx: 0.22

src/components/FeaturedProviderCard.tsx: 0.22

src/components/ui/sonner.tsx: 0.22

src/hooks/use-mobile.tsx: 0.21

src/components/ui/tooltip.tsx: 0.21

src/pages/ComparePage.tsx: 0.18

src/components/TierBadge.tsx: 0.18

src/components/FeaturedProviders.tsx: 0.18

src/components/ui/select.tsx: 0.17

src/components/ui/toast.tsx: 0.17

src/components/ui/alert.tsx: 0.16

src/components/ui/dialog.tsx: 0.16

src/components/provider/ServicesCard.tsx: 0.16

src/components/ui/drawer.tsx: 0.16

src/components/ui/badge.tsx: 0.14

src/main.tsx: 0.13

src/components/ui/avatar.tsx: 0.13

src/components/provider/ContactCard.tsx: 0.12

src/components/ui/hover-card.tsx: 0.12

src/components/ui/scroll-area.tsx: 0.11

src/components/layout/Header.tsx: 0.11

src/components/ui/toggle-group.tsx: 0.11

src/components/ui/radio-group.tsx: 0.10

src/components/ui/textarea.tsx: 0.10

src/pages/Reports.tsx: 0.10

src/components/layout/Breadcrumbs.tsx: 0.10

src/components/dashboards/admin/ProviderTierChart.tsx: 0.10

src/components/made-with-dyad.tsx: 0.09

src/components/provider/ProfileSidebar.tsx: 0.09

src/pages/PublicProviderProfilePage.tsx: 0.09

src/components/layout/Layout.tsx: 0.09

src/components/provider/AboutCard.tsx: 0.09

src/components/ui/switch.tsx: 0.09

src/components/dashboards/ProviderDashboard.tsx: 0.08

src/components/ui/toggle.tsx: 0.08

src/components/ui/alert-dialog.tsx: 0.08

src/components/ui/pagination.tsx: 0.08

src/pages/UpdateProfile.tsx: 0.07

src/components/ui/dropdown-menu.tsx: 0.07

src/components/ui/sidebar.tsx: 0.07

src/pages/Admin.tsx: 0.07

src/components/dashboards/admin/TopViewedProviders.tsx: 0.07

src/components/ui/form.tsx: 0.07

src/components/dashboards/provider/ProfileScoreCard.tsx: 0.07

src/pages/MarketingToolkit.tsx: 0.07

src/components/provider/MediaCard.tsx: 0.06

src/components/ui/separator.tsx: 0.06

src/components/dashboards/provider/MembershipTierCard.tsx: 0.06

src/components/dashboards/provider/AudienceOverviewCard.tsx: 0.05

src/pages/Support.tsx: 0.05

src/components/UpdateProfileForm.tsx: 0.05

src/components/dashboards/provider/ResourceCard.tsx: 0.05

src/components/dashboards/StaffDashboard.tsx: 0.05

src/components/data-table/data-table.tsx: 0.05

src/pages/Onboarding.tsx: 0.05

src/components/ui/tabs.tsx: 0.05

src/components/provider/TestimonialsCard.tsx: 0.05

src/components/ui/collapsible.tsx: 0.05

src/components/dashboards/provider/ResourceCardSkeleton.tsx: 0.05

src/components/provider/FaqCard.tsx: 0.05

src/components/layout/Footer.tsx: 0.04

src/components/dashboards/provider/LeadInboxCard.tsx: 0.04

src/components/ui/resizable.tsx: 0.04

src/components/layout/ListItem.tsx: 0.04

src/components/dashboards/admin/MetricCard.tsx: 0.04

src/components/dashboards/provider/ContentAssistantCard.tsx: 0.04

src/components/AnalyticsTracker.tsx: 0.04

src/components/dashboards/admin/EngagementByTypeChart.tsx: 0.04

src/components/ui/table.tsx: 0.03

src/components/ui/breadcrumb.tsx: 0.03

src/components/dashboards/provider/PerformanceAnalyticsCard.tsx: 0.03

src/components/data-table/columns.tsx: 0.03

src/components/dashboards/provider/RoiCalculatorCard.tsx: 0.03

src/components/ui/accordion.tsx: 0.03

src/components/ui/progress.tsx: 0.03

src/pages/NotFound.tsx: 0.03

src/components/dashboards/provider/UpgradeCtaCard.tsx: 0.03

src/components/dashboards/provider/MarketingToolkitCtaCard.tsx: 0.03

src/components/ui/aspect-ratio.tsx: 0.02

src/components/ui/carousel.tsx: 0.02

src/components/ui/slider.tsx: 0.02

src/components/ui/navigation-menu.tsx: 0.02

src/components/ui/context-menu.tsx: 0.02

src/components/ui/input-otp.tsx: 0.01

src/components/ui/chart.tsx: 0.01

src/components/ui/menubar.tsx: 0.01

src/components/ui/calendar.tsx: 0.01</think><dyad-codebase-context files="src/components/SearchBar.tsx,src/components/directory/DirectoryMap.tsx,src/pages/Directory.tsx,src/components/ui/input.tsx,src/components/ui/button.tsx"></dyad-codebase-context>coordinates) return null;
          const isHovered = hoveredProviderId === provider.id;
          
          return (
            <MarkerF
              key={provider.id}
              position={provider.coordinates}
              icon={getMarkerIcon(provider, isHovered)}
              title={provider.name}
              onClick={() => setSelectedProvider(provider)}
              onMouseOver={() => onProviderHover?.(provider.id)}
              onMouseOut={() => onProviderHover?.(null)}
              animation={isHovered ? google.maps.Animation.BOUNCE : undefined}
            />
          );
        })}

        {/* Enhanced info window */}
        {selectedProvider && selectedProvider.coordinates && (
          <InfoWindowF
            position={selectedProvider.coordinates}
            onCloseClick={() => setSelectedProvider(null)}
            options={{
              pixelOffset: new google.maps.Size(0, -10),
              maxWidth: 320,
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
              className="p-4 max-w-sm"
            >
              <div className="flex items-start gap-3 mb-3">
                <Avatar className="h-12 w-12 border-2 border-white shadow-sm">
                  <AvatarImage
                    src={selectedProvider.profileImage}
                    alt={selectedProvider.name}
                  />
                  <AvatarFallback>
                    {selectedProvider.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-lg leading-tight">{selectedProvider.name}</h3>
                    <Badge variant={selectedProvider.tier === 'Premier' ? 'default' : 'secondary'}>
                      {selectedProvider.tier}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{selectedProvider.specialty}</p>
                  <div className="flex items-center mt-2">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                    <span className="text-sm font-medium">{selectedProvider.rating?.toFixed(1)}</span>
                    <span className="text-sm text-gray-500 ml-1">
                      ({selectedProvider.reviewCount} reviews)
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center text-sm text-gray-600 mb-3">
                <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                <span className="truncate">{selectedProvider.location}</span>
              </div>
              
              {selectedProvider.bio && (
                <p className="text-sm text-gray-700 mb-4 line-clamp-2 leading-relaxed">
                  {selectedProvider.bio}
                </p>
              )}
              
              <div className="flex gap-2">
                <EnhancedButton
                  size="sm"
                  onClick={() => navigate(`/directory/provider/${selectedProvider.id}`)}
                  className="flex-1"
                >
                  View Profile
                </EnhancedButton>
                <div className="flex gap-1">
                  {selectedProvider.phone && (
                    <EnhancedTooltip>
                      <EnhancedTooltipTrigger asChild>
                        <EnhancedButton
                          size="sm"
                          variant="outline"
                          onClick={() => window.open(`tel:${selectedProvider.phone}`)}
                        >
                          <Phone className="h-4 w-4" />
                        </EnhancedButton>
                      </EnhancedTooltipTrigger>
                      <EnhancedTooltipContent>Call now</EnhancedTooltipContent>
                    </EnhancedTooltip>
                  )}
                  {selectedProvider.website && (
                    <EnhancedTooltip>
                      <EnhancedTooltipTrigger asChild>
                        <EnhancedButton
                          size="sm"
                          variant="outline"
                          onClick={() => window.open(selectedProvider.website, '_blank')}
                        >
                          <Globe className="h-4 w-4" />
                        </EnhancedButton>
                      </EnhancedTooltipTrigger>
                      <EnhancedTooltipContent>Visit website</EnhancedTooltipContent>
                    </EnhancedTooltip>
                  )}
                </div>
              </div>
            </motion.div>
          </InfoWindowF>
        )}
      </GoogleMap>
    </div>
  );
};

export default EnhancedDirectoryMap;