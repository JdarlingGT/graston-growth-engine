"use client";

import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { FullProviderProfile } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';

const defaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

interface BoundsUpdaterProps {
  onBoundsChanged: (bounds: L.LatLngBounds) => void;
}

const BoundsUpdater: React.FC<BoundsUpdaterProps> = ({ onBoundsChanged }) => {
  useMapEvents({
    moveend(e) {
      onBoundsChanged(e.target.getBounds());
    }
  });
  return null;
};

interface LeafletDirectoryMapProps {
  providers: FullProviderProfile[];
  center: { lat: number; lng: number };
  zoom: number;
  onBoundsChanged: (bounds: L.LatLngBounds) => void;
}

const LeafletDirectoryMap: React.FC<LeafletDirectoryMapProps> = ({
  providers,
  center,
  zoom,
  onBoundsChanged,
}) => {
  return (
    <MapContainer
      center={[center.lat, center.lng]}
      zoom={zoom}
      style={{ width: '100%', height: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      <BoundsUpdater onBoundsChanged={onBoundsChanged} />
      {providers.map(provider =>
        provider.coordinates ? (
          <Marker
            key={provider.id}
            position={[provider.coordinates.lat, provider.coordinates.lng]}
            icon={defaultIcon}
          >
            <Popup>
              <Card className="w-64">
                <CardHeader className="p-2">
                  <div className="flex items-center space-x-2">
                    <Avatar>
                      <AvatarImage src={provider.profileImage} />
                      <AvatarFallback>
                        {provider.name
                          .split(' ')
                          .map(n => n[0])
                          .join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-sm">{provider.name}</CardTitle>
                      <p className="text-xs text-muted-foreground truncate">
                        {provider.specialty}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-2 text-xs space-y-1">
                  <p className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {provider.location}
                  </p>
                  <p>Rating: {provider.rating?.toFixed(1)}</p>
                </CardContent>
                <div className="p-2">
                  <Button
                    size="sm"
                    onClick={() =>
                      window.open(`/directory/provider/${provider.id}`, '_self')
                    }
                  >
                    View Profile
                  </Button>
                </div>
              </Card>
            </Popup>
          </Marker>
        ) : null
      )}
    </MapContainer>
  );
};

export default LeafletDirectoryMap;