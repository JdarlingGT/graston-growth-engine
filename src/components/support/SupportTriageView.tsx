import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  MessageSquare, 
  Bot, 
  CheckCircle, 
  XCircle, 
  Edit, 
  Send,
  Clock,
  AlertTriangle,
  User,
  Tag,
  RefreshCw,
  Filter
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SupportTicket {
  id: string;
  subject: string;
  description: string;
  customer: {
    name: string;
    email: string;
    avatar?: string;
    tier: string;
  };
  priority: 'Low' | 'Normal' | 'High' | 'Urgent';
  category: string;
  channel: 'Email' | 'Form' | 'Chat' | 'Phone';
  createdAt: string;
  aiAnalysis: {
    suggestedPriority: 'Low' | 'Normal' | 'High' | 'Urgent';
    suggestedTags: string[];
    suggestedReply: string;
    sentiment: 'positive' | 'neutral' | 'negative';
    confidence: number;
    category: string;
  };
  status: 'New' | 'In Progress' | 'Resolved';
}

const SupportTriageView = () => {
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [replyText, setReplyText] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Mock real-time ticket ingestion
  useEffect(() => {
    const mockTickets: SupportTicket[] = [
      {
        id: 'TKT-001',
        subject: 'Unable to upgrade to Premier tier',
        description: 'I\'ve been trying to upgrade my account to Premier tier but the payment keeps failing. I\'ve tried multiple credit cards and the issue persists.',
        customer: {
          name: 'Dr. Sarah Johnson',
          email: 'sarah@example.com',
          avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face',
          tier: 'Preferred'
        },
        priority: 'Normal',
        category: 'Billing',
        channel: 'Email',
        createdAt: new Date().toISOString(),
        aiAnalysis: {
          suggestedPriority: 'High',
          suggestedTags: ['billing', 'payment-failure', 'upgrade'],
          suggestedReply: 'Hi Dr. Johnson,\n\nI understand how frustrating payment issues can be. Let me help you resolve this immediately.\n\nI\'ve checked your account and see the payment attempts. This is typically caused by:\n1. Bank security measures for online transactions\n2. Billing address mismatch\n3. Card limits for subscription services\n\nI\'ve temporarily enabled manual processing for your account. Please try the upgrade again, and if it still fails, I can process it manually with a quick phone call.\n\nBest regards,\nSupport Team',
          sentiment: 'negative',
          confidence: 92,
          category: 'Billing Issue'
        },
        status: 'New'
      },
      {
        id: 'TKT-002',
        subject: 'Profile verification request',
        description: 'Hello, I would like to get my provider profile verified. I have all the necessary documentation ready.',
        customer: {
          name: 'Dr. Michael Chen',
          email: 'michael@example.com',
          tier: 'Free'
        },
        priority: 'Normal',
        category: 'Verification',
        channel: 'Form',
        createdAt: new Date(Date.now() - 3600000).toISOString(),
        aiAnalysis: {
          suggestedPriority: 'Normal',
          suggestedTags: ['verification', 'documentation', 'profile'],
          suggestedReply: 'Hello Dr. Chen,\n\nThank you for your verification request! I\'d be happy to help you get your profile verified.\n\nTo complete the verification process, please upload the following documents through your provider dashboard:\n\n1. Professional license (current and valid)\n2. Graston Technique certification\n3. Professional headshot photo\n4. Business registration (if applicable)\n\nOnce uploaded, our verification team will review within 2-3 business days. You\'ll receive an email confirmation once approved.\n\nIf you need any assistance with the upload process, please let me know!\n\nBest regards,\nVerification Team',
          sentiment: 'positive',
          confidence: 88,
          category: 'Account Verification'
        },
        status: 'New'
      }
    ];

    setTickets(mockTickets);
  }, []);

  const getPriorityColor = (priority: string) => {
    const colors = {
      'Low': 'bg-green-100 text-green-800',
      'Normal': 'bg-blue-100 text-blue-800',
      'High': 'bg-orange-100 text-orange-800',
      'Urgent': 'bg-red-100 text-red-800'
    };
    return colors[priority as keyof typeof colors];
  };

  const getSentimentColor = (sentiment: string) => {
    const colors = {
      'positive': 'text-green-600',
      'neutral': 'text-blue-600',
      'negative': 'text-red-600'
    };
    return colors[sentiment as keyof typeof colors];
  };

  const handleAcceptSuggestion = (ticket: SupportTicket) => {
    setReplyText(ticket.aiAnalysis.suggestedReply);
    toast({
      title: "AI Suggestion Accepted",
      description: "The suggested reply has been loaded into the editor",
    });
  };

  const handleRejectSuggestion = (ticket: SupportTicket) => {
    toast({
      title: "AI Suggestion Rejected",
      description: "You can write a custom reply",
    });
  };

  const handleSendReply = async () => {
    if (!selectedTicket || !replyText.trim()) return;

    setLoading(true);
    
    // Simulate sending reply
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Update ticket status
    setTickets(prev => prev.map(ticket => 
      ticket.id === selectedTicket.id 
        ? { ...ticket, status: 'In Progress' as const }
        : ticket
    ));

    toast({
      title: "Reply Sent",
      description: "Your response has been sent to the customer",
    });

    setReplyText('');
    setLoading(false);
  };

  const handleUpdatePriority = (ticketId: string, newPriority: string) => {
    setTickets(prev => prev.map(ticket => 
      ticket.id === ticketId 
        ? { ...ticket, priority: newPriority as any }
        : ticket
    ));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
      {/* Ticket Queue */}
      <div className="lg:col-span-1 space-y-4">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Support Triage Queue</CardTitle>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {tickets.map((ticket) => (
              <div
                key={ticket.id}
                onClick={() => setSelectedTicket(ticket)}
                className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-sm ${
                  selectedTicket?.id === ticket.id ? 'border-primary bg-primary/5' : 'border-border'
                }`}
              >
                <div className="space-y-3">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-muted-foreground">{ticket.id}</span>
                      <Badge className={getPriorityColor(ticket.aiAnalysis.suggestedPriority)}>
                        AI: {ticket.aiAnalysis.suggestedPriority}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1">
                      <Bot className="h-3 w-3 text-primary" />
                      <span className="text-xs text-primary">{ticket.aiAnalysis.confidence}%</span>
                    </div>
                  </div>

                  {/* Subject */}
                  <h4 className="font-medium text-sm line-clamp-2">{ticket.subject}</h4>

                  {/* Customer */}
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={ticket.customer.avatar} />
                      <AvatarFallback className="text-xs">{ticket.customer.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="text-xs text-muted-foreground">{ticket.customer.name}</span>
                    <Badge variant="outline" className="text-xs">{ticket.customer.tier}</Badge>
                  </div>

                  {/* AI Analysis */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs ${getSentimentColor(ticket.aiAnalysis.sentiment)}`}>
                        {ticket.aiAnalysis.sentiment} sentiment
                      </span>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-xs text-muted-foreground">{ticket.aiAnalysis.category}</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-1">
                      {ticket.aiAnalysis.suggestedTags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {ticket.aiAnalysis.suggestedTags.length > 2 && (
                        <Badge variant="secondary" className="text-xs">
                          +{ticket.aiAnalysis.suggestedTags.length - 2}
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Timestamp */}
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {new Date(ticket.createdAt).toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Ticket Detail */}
      <div className="lg:col-span-2">
        {selectedTicket ? (
          <div className="space-y-4">
            {/* Ticket Header */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl font-semibold">{selectedTicket.subject}</h2>
                      <Badge className={getPriorityColor(selectedTicket.priority)}>
                        {selectedTicket.priority}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={selectedTicket.customer.avatar} />
                          <AvatarFallback className="text-xs">{selectedTicket.customer.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span>{selectedTicket.customer.name}</span>
                        <Badge variant="outline">{selectedTicket.customer.tier}</Badge>
                      </div>
                      <span>•</span>
                      <span>{selectedTicket.channel}</span>
                      <span>•</span>
                      <span>{new Date(selectedTicket.createdAt).toLocaleString()}</span>
                    </div>
                  </div>
                  <Select 
                    value={selectedTicket.priority} 
                    onValueChange={(value) => handleUpdatePriority(selectedTicket.id, value)}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Low">Low</SelectItem>
                      <SelectItem value="Normal">Normal</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                      <SelectItem value="Urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{selectedTicket.description}</p>
              </CardContent>
            </Card>

            {/* AI Analysis */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="h-5 w-5 text-primary" />
                  AI Analysis & Suggested Response
                  <Badge variant="outline">{selectedTicket.aiAnalysis.confidence}% confidence</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Suggested Priority</label>
                    <Badge className={getPriorityColor(selectedTicket.aiAnalysis.suggestedPriority)}>
                      {selectedTicket.aiAnalysis.suggestedPriority}
                    </Badge>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Category</label>
                    <p className="text-sm">{selectedTicket.aiAnalysis.category}</p>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium">Suggested Tags</label>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {selectedTicket.aiAnalysis.suggestedTags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium">AI Suggested Reply</label>
                    <div className="flex items-center gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleAcceptSuggestion(selectedTicket)}
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Accept
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleRejectSuggestion(selectedTicket)}
                      >
                        <XCircle className="h-4 w-4 mr-1" />
                        Reject
                      </Button>
                    </div>
                  </div>
                  <div className="p-3 bg-muted rounded-lg text-sm whitespace-pre-wrap">
                    {selectedTicket.aiAnalysis.suggestedReply}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Reply Interface */}
            <Card>
              <CardHeader>
                <CardTitle>Send Reply</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Type your reply..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  rows={8}
                />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-2" />
                      Use Template
                    </Button>
                  </div>
                  <Button onClick={handleSendReply} disabled={loading || !replyText.trim()}>
                    <Send className="h-4 w-4 mr-2" />
                    {loading ? 'Sending...' : 'Send Reply'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <Card className="h-full flex items-center justify-center">
            <CardContent className="text-center">
              <MessageSquare className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Select a Ticket</h3>
              <p className="text-muted-foreground">Choose a ticket from the queue to view AI analysis and respond</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default SupportTriageView;