import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  Star, 
  Shield, 
  CheckCircle, 
  XCircle,
  Clock,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  ExternalLink,
  Calendar,
  Play,
  FileText,
  Users,
  MessageSquare,
  Send,
  Award,
  TrendingUp,
  BookOpen
} from 'lucide-react';
import { ProviderProfile } from '@/types/provider-profile';

interface PremierProfileProps {
  provider: ProviderProfile;
}

const PremierProfile = ({ provider }: PremierProfileProps) => {
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating) 
            ? 'text-yellow-400 fill-current' 
            : 'text-gray-300'
        }`}
      />
    ));
  };

  const getSocialIcon = (platform: string) => {
    const icons = {
      facebook: Facebook,
      twitter: Twitter,
      linkedin: Linkedin,
      instagram: Instagram
    };
    return icons[platform as keyof typeof icons] || Globe;
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Contact form submitted:', contactForm);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative">
        {/* Background Image */}
        <div className="h-80 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 relative overflow-hidden">
          {provider.clinic_gallery && provider.clinic_gallery[0] && (
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-30"
              style={{ backgroundImage: `url(${provider.clinic_gallery[0].url})` }}
            />
          )}
          <div className="absolute inset-0 bg-black bg-opacity-40" />
        </div>
        
        {/* Profile Content */}
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-end gap-8 -mt-32">
            <Avatar className="h-40 w-40 border-6 border-white shadow-2xl">
              <AvatarImage src={provider.profile_photo} alt={provider.provider_name} />
              <AvatarFallback className="text-3xl bg-blue-100">
                {provider.provider_name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 text-center lg:text-left pb-8">
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
                  <div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">
                      {provider.provider_name}
                    </h1>
                    <p className="text-xl text-gray-600 mb-2">{provider.credentials}</p>
                    <p className="text-lg font-medium text-gray-800">{provider.practitioner_type}</p>
                  </div>
                  
                  <div className="flex flex-col items-center lg:items-end gap-3">
                    <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2">
                      <Award className="h-4 w-4 mr-2" />
                      {provider.tier_badge}
                    </Badge>
                    
                    {provider.avg_rating && (
                      <div className="flex items-center gap-2">
                        <div className="flex">{renderStars(provider.avg_rating)}</div>
                        <span className="text-sm font-medium text-gray-700">
                          {provider.avg_rating} ({provider.total_reviews} reviews)
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  {provider.booking_url && (
                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700" asChild>
                      <a href={provider.booking_url} target="_blank" rel="noopener noreferrer">
                        <Calendar className="h-5 w-5 mr-2" />
                        Book Appointment
                      </a>
                    </Button>
                  )}
                  <Button size="lg" variant="outline">
                    <MessageSquare className="h-5 w-5 mr-2" />
                    Send Message
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="gallery">Gallery</TabsTrigger>
                <TabsTrigger value="articles">Articles</TabsTrigger>
                <TabsTrigger value="events">Events</TabsTrigger>
                <TabsTrigger value="testimonials">Reviews</TabsTrigger>
                <TabsTrigger value="faq">FAQ</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                {/* Video Introduction */}
                {provider.video_intro && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Play className="h-5 w-5" />
                        Introduction Video
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <Play className="h-16 w-16 text-gray-400 mx-auto mb-2" />
                          <p className="text-gray-500">Video Player Component</p>
                          <p className="text-xs text-gray-400">{provider.video_intro}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* About Section */}
                <Card>
                  <CardHeader>
                    <CardTitle>About Dr. {provider.provider_name.split(' ').pop()}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed text-lg">{provider.provider_bio}</p>
                  </CardContent>
                </Card>

                {/* Specialties & Expertise */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Areas of Expertise</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {(provider.specialties || []).map((specialty, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <TrendingUp className="h-4 w-4 text-blue-500" />
                            <span className="text-gray-700">{specialty}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Conditions Treated</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {(provider.conditions_treated || []).map((condition, index) => (
                          <Badge key={index} variant="outline" className="text-sm">
                            {condition}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Community Activity */}
                {provider.community_activity && provider.community_activity.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Users className="h-5 w-5" />
                        Community Engagement
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {provider.community_activity.map((activity) => (
                          <div key={activity.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div>
                              <p className="font-medium text-gray-900">{activity.title}</p>
                              <p className="text-sm text-gray-600">
                                {activity.type === 'topic' ? 'Started discussion' : 'Replied to discussion'} • {new Date(activity.date).toLocaleDateString()}
                              </p>
                            </div>
                            <Badge variant="secondary">{activity.engagement} interactions</Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="gallery">
                <Card>
                  <CardHeader>
                    <CardTitle>Clinic Gallery</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {provider.clinic_gallery && provider.clinic_gallery.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {provider.clinic_gallery.map((image) => (
                          <div key={image.id} className="group cursor-pointer">
                            <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
                              <img 
                                src={image.url} 
                                alt={image.alt}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                            {image.caption && (
                              <p className="text-sm text-gray-600 mt-2">{image.caption}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-center py-8">No gallery images available</p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="articles">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5" />
                      Published Articles
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {provider.published_articles && provider.published_articles.length > 0 ? (
                      <div className="space-y-4">
                        {provider.published_articles.map((article) => (
                          <div key={article.id} className="border-l-4 border-blue-500 pl-4 py-2">
                            <h3 className="font-semibold text-lg text-gray-900 mb-2">{article.title}</h3>
                            <p className="text-gray-600 mb-3">{article.excerpt}</p>
                            <div className="flex items-center justify-between">
                              <div className="text-sm text-gray-500">
                                <p>{new Date(article.published_date).toLocaleDateString()} • {article.read_time} min read</p>
                              </div>
                              <Button variant="link" className="p-0 h-auto">
                                Read More →
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-center py-8">No articles published yet</p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="events">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      Upcoming Events
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {provider.upcoming_events && provider.upcoming_events.length > 0 ? (
                      <div className="space-y-4">
                        {provider.upcoming_events.map((event) => (
                          <Card key={event.id} className="border-l-4 border-green-500">
                            <CardContent className="p-4">
                              <div className="flex justify-between items-start mb-3">
                                <h3 className="font-semibold text-lg text-gray-900">{event.title}</h3>
                                <Badge variant="outline">{new Date(event.date).toLocaleDateString()}</Badge>
                              </div>
                              <p className="text-gray-600 mb-3">{event.description}</p>
                              <div className="flex items-center justify-between">
                                <div className="text-sm text-gray-500">
                                  <p>{event.time} • {event.location}</p>
                                </div>
                                <Button size="sm" asChild>
                                  <a href={event.registration_url} target="_blank" rel="noopener noreferrer">
                                    Register
                                  </a>
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-center py-8">No upcoming events</p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="testimonials">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Star className="h-5 w-5" />
                      Patient Testimonials
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {provider.testimonials && provider.testimonials.length > 0 ? (
                      <div className="space-y-6">
                        {provider.testimonials.map((testimonial) => (
                          <div key={testimonial.id} className="bg-gray-50 rounded-lg p-6">
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center gap-3">
                                <Avatar className="h-10 w-10">
                                  <AvatarFallback>{testimonial.patient_name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium text-gray-900">{testimonial.patient_name}</p>
                                  <div className="flex items-center gap-2">
                                    <div className="flex">{renderStars(testimonial.rating)}</div>
                                    {testimonial.verified && (
                                      <Badge variant="secondary" className="text-xs">Verified</Badge>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <span className="text-sm text-gray-500">
                                {new Date(testimonial.date).toLocaleDateString()}
                              </span>
                            </div>
                            <p className="text-gray-700 italic">"{testimonial.text}"</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-center py-8">No testimonials available</p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="faq">
                <Card>
                  <CardHeader>
                    <CardTitle>Frequently Asked Questions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {provider.faqs && provider.faqs.length > 0 ? (
                      <Accordion type="single" collapsible className="w-full">
                        {provider.faqs.map((faq) => (
                          <AccordionItem key={faq.id} value={faq.id}>
                            <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                            <AccordionContent className="text-gray-700">
                              {faq.answer}
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    ) : (
                      <p className="text-gray-500 text-center py-8">No FAQs available</p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle>Send a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <Input
                    placeholder="Your Name"
                    value={contactForm.name}
                    onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                    required
                  />
                  <Input
                    type="email"
                    placeholder="Your Email"
                    value={contactForm.email}
                    onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                    required
                  />
                  <Input
                    type="tel"
                    placeholder="Your Phone"
                    value={contactForm.phone}
                    onChange={(e) => setContactForm(prev => ({ ...prev, phone: e.target.value }))}
                  />
                  <Textarea
                    placeholder="Your Message"
                    value={contactForm.message}
                    onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                    rows={4}
                    required
                  />
                  <Button type="submit" className="w-full">
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {provider.clinic_name && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">{provider.clinic_name}</h4>
                  </div>
                )}
                
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
                    <div className="text-sm text-gray-700">
                      {provider.clinic_street && <div>{provider.clinic_street}</div>}
                      <div>{provider.clinic_city}, {provider.clinic_state} {provider.clinic_zip}</div>
                    </div>
                  </div>
                  
                  {provider.clinic_phone && (
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-gray-500" />
                      <a href={`tel:${provider.clinic_phone}`} className="text-sm text-blue-600 hover:underline">
                        {provider.clinic_phone}
                      </a>
                    </div>
                  )}
                  
                  {provider.provider_email && (
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-gray-500" />
                      <a href={`mailto:${provider.provider_email}`} className="text-sm text-blue-600 hover:underline">
                        {provider.provider_email}
                      </a>
                    </div>
                  )}
                  
                  {provider.clinic_website_url && (
                    <div className="flex items-center gap-3">
                      <Globe className="h-5 w-5 text-gray-500" />
                      <a 
                        href={provider.clinic_website_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:underline flex items-center gap-1"
                      >
                        Visit Website
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Office Hours */}
            {provider.office_hours && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Office Hours
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {provider.office_hours.map((hours, index) => (
                      <div key={index} className="flex justify-between items-center py-1">
                        <span className="font-medium text-gray-700 text-sm">{hours.day}</span>
                        <span className="text-gray-600 text-sm">
                          {hours.closed ? 'Closed' : `${hours.open} - ${hours.close}`}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Availability Status */}
            <Card>
              <CardHeader>
                <CardTitle>Availability</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  {provider.accepting_new_patients ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500" />
                  )}
                  <span className="text-sm text-gray-700">
                    {provider.accepting_new_patients ? 'Accepting New Patients' : 'Not Accepting New Patients'}
                  </span>
                </div>
                
                <div className="flex items-center gap-3">
                  {provider.telehealth_available ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <XCircle className="h-5 w-5 text-gray-400" />
                  )}
                  <span className="text-sm text-gray-700">
                    {provider.telehealth_available ? 'Telehealth Available' : 'In-Person Only'}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Certifications */}
            <Card>
              <CardHeader>
                <CardTitle>Certifications & Accreditations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {(provider.provider_accreditations || []).map((accreditation, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-blue-500" />
                      <span className="text-sm text-gray-700">{accreditation}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Insurance */}
            <Card>
              <CardHeader>
                <CardTitle>Insurance Accepted</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  {(provider.insurance_accepted || []).map((insurance, index) => (
                    <div key={index} className="text-sm text-gray-700 p-2 bg-gray-50 rounded text-center">
                      {insurance}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Social Media */}
            {provider.social_media && (
              <Card>
                <CardHeader>
                  <CardTitle>Connect</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    {Object.entries(provider.social_media).map(([platform, url]) => {
                      if (!url) return null;
                      const Icon = getSocialIcon(platform);
                      return (
                        <Button key={platform} variant="outline" size="sm" asChild>
                          <a href={url} target="_blank" rel="noopener noreferrer">
                            <Icon className="h-4 w-4" />
                          </a>
                        </Button>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Map */}
            {provider.location_map && (
              <Card>
                <CardHeader>
                  <CardTitle>Location</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-200 h-48 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500 text-sm">Interactive Map</p>
                      <p className="text-xs text-gray-400">
                        ({provider.location_map.lat}, {provider.location_map.lng})
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremierProfile;