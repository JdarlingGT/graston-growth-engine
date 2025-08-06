"use client";

import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { FullProviderProfile } from '@/types';
import { Skeleton } from '@/components/ui/skeleton';
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
}

const DirectoryMap = ({ providers, apiKey }: DirectoryMapProps) => {
  const navigate = useNavigate();
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
    >
      {providers.map(provider => (
        provider.coordinates && (
          <Marker 
            key={provider.id} 
            position={provider.coordinates} 
            title={provider.name}
            onClick={() => handleMarkerClick(provider.id)}
          />
        )
      ))}
    </GoogleMap>
  );
};

export default DirectoryMap;