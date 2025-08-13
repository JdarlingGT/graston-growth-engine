import { useState, useMemo } from 'react';
import { mockProviderData } from '@/lib/mockData';
import ProviderCard from '@/components/ProviderCard';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const FindProviderPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('All Types');

  const practitionerTypes = useMemo(() => {
    const types = new Set(mockProviderData.map(p => p.practitioner_type.name));
    return ['All Types', ...Array.from(types)];
  }, []);

  const filteredProviders = useMemo(() => {
    return mockProviderData.filter(provider => {
      const nameMatch = provider.provider_name.toLowerCase().includes(searchTerm.toLowerCase());
      const locationMatch = provider.location.clinic_city.toLowerCase().includes(locationFilter.toLowerCase()) ||
                            provider.location.clinic_state.toLowerCase().includes(locationFilter.toLowerCase());
      const typeMatch = typeFilter === 'All Types' || provider.practitioner_type.name === typeFilter;
      return nameMatch && locationMatch && typeMatch;
    });
  }, [searchTerm, locationFilter, typeFilter]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12 bg-white rounded-lg shadow-md mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Find Your Ideal Provider</h1>
          <p className="text-lg text-gray-600 mt-2">Search, filter, and connect with the best practitioners.</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              placeholder="Search by name..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
            <Input
              placeholder="Filter by city or state..."
              value={locationFilter}
              onChange={e => setLocationFilter(e.target.value)}
            />
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {practitionerTypes.map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {filteredProviders.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProviders.map(provider => (
              <ProviderCard key={provider.id} provider={provider} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-lg shadow-md">
            <p className="text-gray-600">No Providers Found. Try adjusting your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FindProviderPage;