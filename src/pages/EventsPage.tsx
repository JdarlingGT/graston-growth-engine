import React, { useState, useMemo } from 'react';
import { Calendar, MapPin, Clock, Users, Star, Search, Filter, ExternalLink, Tag } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { eventsData, eventCategories, type Event } from '@/data/events';

const EventsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedView, setSelectedView] = useState('grid');

  const filteredEvents = useMemo(() => {
    return eventsData.filter(event => {
      const matchesSearch = 
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [searchTerm, selectedCategory]);

  const featuredEvents = eventsData.filter(event => event.featured);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      workshop: 'bg-blue-100 text-blue-800 border-blue-200',
      seminar: 'bg-green-100 text-green-800 border-green-200',
      conference: 'bg-purple-100 text-purple-800 border-purple-200',
      certification: 'bg-orange-100 text-orange-800 border-orange-200',
      webinar: 'bg-indigo-100 text-indigo-800 border-indigo-200'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const EventCard: React.FC<{ event: Event; featured?: boolean }> = ({ event, featured = false }) => (
    <Card className={`group hover:shadow-lg transition-all duration-300 ${featured ? 'ring-2 ring-blue-200 shadow-md' : ''} hover:scale-[1.02]`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge className={getCategoryColor(event.category)}>
                {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
              </Badge>
              {featured && (
                <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 border-yellow-200">
                  <Star className="w-3 h-3 mr-1" />
                  Featured
                </Badge>
              )}
              {event.price === 'Free' && (
                <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
                  Free
                </Badge>
              )}
            </div>
            <CardTitle className="text-lg leading-tight group-hover:text-blue-700 transition-colors">
              {event.title}
            </CardTitle>
          </div>
          {event.price && event.price !== 'Free' && (
            <div className="text-right">
              <div className="text-lg font-bold text-green-600">{event.price}</div>
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-gray-600 text-sm line-clamp-3">
          {event.description}
        </p>
        
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-gray-700">
            <Calendar className="w-4 h-4 text-blue-600" />
            <span className="font-medium">{formatDate(event.date)}</span>
          </div>
          
          <div className="flex items-center gap-2 text-gray-700">
            <Clock className="w-4 h-4 text-green-600" />
            <span>{event.time}</span>
          </div>
          
          <div className="flex items-center gap-2 text-gray-700">
            <MapPin className="w-4 h-4 text-red-600" />
            <span className="truncate">{event.location}</span>
          </div>
          
          {event.capacity && (
            <div className="flex items-center gap-2 text-gray-700">
              <Users className="w-4 h-4 text-purple-600" />
              <span>
                {event.registered || 0} / {event.capacity} registered
              </span>
              <div className="flex-1 bg-gray-200 rounded-full h-2 ml-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                  style={{ width: `${((event.registered || 0) / event.capacity) * 100}%` }}
                />
              </div>
            </div>
          )}
        </div>
        
        {event.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {event.tags.slice(0, 3).map(tag => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {event.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{event.tags.length - 3} more
              </Badge>
            )}
          </div>
        )}
        
        <div className="flex items-center justify-between pt-3 border-t">
          {event.provider && (
            <span className="text-sm text-gray-600">by {event.provider}</span>
          )}
          <Button asChild className="ml-auto">
            <a 
              href={event.registration_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              Register
              <ExternalLink className="w-4 h-4" />
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-700 via-blue-800 to-blue-900 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Professional Development 
              <span className="block text-blue-200">Events & Training</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Advance your skills with workshops, certifications, and seminars led by industry experts
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="bg-white text-blue-900 hover:bg-blue-50">
                <Calendar className="w-5 h-5 mr-2" />
                Browse All Events
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-900">
                <Star className="w-5 h-5 mr-2" />
                Featured Events
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Featured Events Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Featured Events
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredEvents.slice(0, 3).map(event => (
              <EventCard key={event.id} event={event} featured />
            ))}
          </div>
        </section>

        {/* Search and Filter Section */}
        <section className="mb-8">
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="Search events, locations, or topics..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-48">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {eventCategories.map(category => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </section>

        {/* Results Summary */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            {filteredEvents.length} event{filteredEvents.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {/* Events List */}
        <section>
          {filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map(event => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="mb-6">
                <Calendar className="w-16 h-16 text-gray-300 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No events found
              </h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search criteria or browse all events
              </p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </section>

        {/* Call to Action */}
        <section className="mt-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">
            Don't Miss Out on Professional Development
          </h3>
          <p className="text-green-100 mb-6 max-w-2xl mx-auto">
            Stay updated with the latest workshops, certifications, and training opportunities 
            in manual therapy and physical rehabilitation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-green-700 hover:bg-green-50">
              Subscribe to Updates
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-700">
              Contact Us
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default EventsPage;