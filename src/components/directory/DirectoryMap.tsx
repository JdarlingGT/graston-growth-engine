"use client";

import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { FullProviderProfile } from '@/types';
import { Skeleton } from '@/components/ui/skeleton';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
  onBoundsChanged?: (bounds: google.maps.LatLngBounds) => void;
}

const DirectoryMap = ({ providers, apiKey, hoveredProviderId, onBoundsChanged }: DirectoryMapProps) => {
  const navigate = useNavigate();
  const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);
  
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey
  });

  if (!isLoaded) {
    return <Skeleton className="w-full h-full rounded-lg" />;
  }

  const handleMarkerClick = (id: string) => {
    navigate(`/directory/provider/${id}`);
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
      onLoad={(map: google.maps.Map) => setMapInstance(map)}
      onIdle={() => {
        if (mapInstance) {
          const bounds = mapInstance.getBounds();
          if (bounds && onBoundsChanged) {
            onBoundsChanged(bounds);
          }
        }
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
              onClick={() => handleMarkerClick(provider.id)}
              icon={isHovered ? { url: "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png" } : undefined}
              zIndex={isHovered ? 1000 : 1}
            />
          )
        )
      })}
    </GoogleMap>
  );
};

export default DirectoryMap;