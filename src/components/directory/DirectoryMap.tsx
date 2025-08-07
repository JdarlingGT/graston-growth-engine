"use client";

import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import { FullProviderProfile } from '@/types';
import { Skeleton } from '@/components/ui/skeleton';
import { useNavigate } from 'react-router-dom';
import { TierBadge } from '@/components/TierBadge';
import { Badge } from '@/components/ui/badge';
import { MapPin, Star } from 'lucide-react';
import { useState } from 'react';

const containerStyle = {
  width: '100%',
  height: '100%'
};

const center = {
  lat: 39.8283, // Center of the US
  lng: -98.5795
};

interface DirectoryMapProps {
  providers: FullProviderProfile[];
  apiKey: string;
  hoveredProviderId: string | null;
}

const DirectoryMap = ({ providers, apiKey, hoveredProviderId }: DirectoryMapProps) => {
  const navigate = useNavigate();
  const [selectedProvider, setSelectedProvider] = useState<FullProviderProfile | null>(null);
  
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey
  });

  if (!isLoaded) {
    return <Skeleton className="w-full h-full rounded-lg" />;
  }

  const handleMarkerClick = (provider: FullProviderProfile) => {
    setSelectedProvider(provider);
  };

  const handleInfoWindowClose = () => {
    setSelectedProvider(null);
  };

  const handleProviderClick = (id: string) => {
    navigate(`/directory/provider/${id}`);
  };

  const tierColors: Record<string, string> = {
    Premier: "bg-purple-600 text-white",
    Preferred: "bg-blue-500 text-white", 
    Free: "bg-gray-500 text-white",
  };

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={4}
      options={{
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
      }}
    >
      {providers.map(provider => {
        const isHovered = provider.id === hoveredProviderId;
        return (
          provider.coordinates && (
            <Marker 
              key={provider.id} 
              position={provider.coordinates} 
              title={provider.name}
              onClick={() => handleMarkerClick(provider)}
              icon={isHovered ? { url: "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png" } : undefined}
              zIndex={isHovered ? 1000 : 1}
            />
          )
        )
      })}
      
      {selectedProvider && selectedProvider.coordinates && (
        <InfoWindow
          position={selectedProvider.coordinates}
          onCloseClick={handleInfoWindowClose}
        >
          <div className="p-2 min-w-[250px]">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-semibold text-lg">{selectedProvider.name}</h3>
              <TierBadge tier={selectedProvider.tier} size="sm" />
            </div>
            <p className="text-sm text-gray-600 mb-2">{selectedProvider.specialty}</p>
            <div className="flex items-center gap-1 text-xs text-gray-500 mb-3">
              <MapPin className="h-3 w-3" />
              <span>{selectedProvider.location}</span>
            </div>
            <div className="flex items-center justify-between">
              <Badge className={tierColors[selectedProvider.tier]}>
                <Star className="h-3 w-3 mr-1" />
                {selectedProvider.tier}
              </Badge>
              <button 
                onClick={() => handleProviderClick(selectedProvider.id)}
                className="text-xs bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors"
              >
                View Profile
              </button>
            </div>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
};

export default DirectoryMap;