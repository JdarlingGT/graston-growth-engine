import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  Clock, 
  Users, 
  MessageSquare,
  Star,
  Target,
  Download,
  Calendar,
  Filter,
  RefreshCw,
  ThumbsUp
} from 'lucide-react';
import { SupportMetrics } from '@/types/support';

const AnalyticsDashboard = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const [selectedMetric, setSelectedMetric] = useState('overview');

  // Mock data
  const metrics: SupportMetrics = {
    totalTickets: 1247,
    openTickets: 89,
    avgFirstResponseTime: 2.3,
    avgResolutionTime: 18.7,
    customerSatisfaction: 4.6,
    slaBreaches: 12,
    agentUtilization: 78
  };

  const agentPerformance = [
    {
      id: 'agent-1',
      name: 'Sarah Wilson',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face',
      ticketsSolved: 47,
      avgResponseTime: 1.8,
      customerRating: 4.8,
      status: 'Online'
    },
    {
      id: 'agent-2',
      name: 'Mike Johnson',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
      ticketsSolved: 39,
      avgResponseTime: 2.1,
      customerRating: 4.7,
      status: 'Online'
    },
    {
      id: 'agent-3',
      name: 'Lisa Chen',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face',
      ticketsSolved: 52,
      avgResponseTime: 1.5,
      customerRating: 4.9,
      status: 'Away'
    }
  ];

  const channelData = [
    { channel: 'Email', tickets: 567, percentage: 45.5 },
    { channel: 'Chat', tickets: 324, percentage: 26.0 },
    { channel: 'Form', tickets: 234, percentage: 18.8 },
    { channel: 'Social', tickets: 89, percentage: 7.1 },
    { channel: 'Phone', tickets: 33, percentage: 2.6 }
  ];

  const topArticles = [
    { title: 'How to Upgrade Your Provider Tier', views: 1247, helpfulness: 89 },
    { title: 'Provider Profile Verification Process', views: 892, helpfulness: 76 },
    { title: 'Billing and Payment FAQ', views: 654, helpfulness: 82 },
    { title: 'Getting Started Guide', views: 543, helpfulness: 91 },
    { title: 'Technical Troubleshooting', views: 432, helpfulness: 74 }
  ];

  const getMetricChange = (current: number, previous: number) => {
    const change = ((current - previous) / previous) * 100;
    return {
      value: Math.abs(change).toFixed(1),
      isPositive: change > 0,
      isNegative: change < 0
    };
  };

  const MetricCard = ({ title, value, unit, change, icon: Icon, color }: any) => (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <div className="flex items-baseline space-x-1">
              <p className="text-2xl font-bold">{value}</p>
              {unit && <span className="text-sm text-gray-500">{unit}</span>}
            </div>
            {change && (
              <div className={`flex items-center space-x-1 mt-1 ${
                change.isPositive ? 'text-green-600' : change.isNegative ? 'text-red-600' : 'text-gray-600'
              }`}>
                {change.isPositive ? (
                  <TrendingUp className="h-3 w-3" />
                ) : change.isNegative ? (
                  <TrendingDown className="h-3 w-3" />
                ) : null}
                <span className="text-xs">{change.value}% vs last period</span>
              </div>
            )}
          </div>
          <div className={`p-3 rounded-full ${color}`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Support Analytics</h2>
          <p className="text-gray-600">Track performance and identify improvement opportunities</p>
        </div>
        <div className="flex items-center space-x-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24h</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Tickets"
          value={metrics.totalTickets.toLocaleString()}
          change={getMetricChange(metrics.totalTickets, 1156)}
          icon={MessageSquare}
          color="bg-blue-600"
        />
        <MetricCard
          title="Avg First Response"
          value={metrics.avgFirstResponseTime}
          unit="hours"
          change={getMetricChange(metrics.avgFirstResponseTime, 2.8)}
          icon={Clock}
          color="bg-green-600"
        />
        <MetricCard
          title="Customer Satisfaction"
          value={metrics.customerSatisfaction}
          unit="/5.0"
          change={getMetricChange(metrics.customerSatisfaction, 4.4)}
          icon={Star}
          color="bg-yellow-600"
        />
        <MetricCard
          title="SLA Breaches"
          value={metrics.slaBreaches}
          change={getMetricChange(metrics.slaBreaches, 18)}
          icon={Target}
          color="bg-red-600"
        />
      </div>

      {/* Detailed Analytics */}
      <Tabs value={selectedMetric} onValueChange={setSelectedMetric}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="agents">Agent Performance</TabsTrigger>
          <TabsTrigger value="channels">Channel Analysis</TabsTrigger>
          <TabsTrigger value="knowledge">Knowledge Base</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Ticket Volume Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Ticket Volume Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-gray-500">
                  <div className="text-center">
                    <BarChart3 className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                    <p>Chart visualization would go here</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Response Time Trend */}
            <Card>
              <CardHeader>
                <CardTitle>Response Time Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-gray-500">
                  <div className="text-center">
                    <Clock className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                    <p>Chart visualization would go here</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Sarah Wilson resolved ticket TKT-1247</span>
                  <span className="text-xs text-gray-500 ml-auto">2 minutes ago</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm">New ticket created from chat session</span>
                  <span className="text-xs text-gray-500 ml-auto">5 minutes ago</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-sm">SLA breach warning for ticket TKT-1245</span>
                  <span className="text-xs text-gray-500 ml-auto">8 minutes ago</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="agents" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Agent Performance Leaderboard</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {agentPerformance.map((agent, index) => (
                  <div key={agent.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-bold text-gray-400">#{index + 1}</span>
                        <Avatar>
                          <AvatarImage src={agent.avatar} />
                          <AvatarFallback>{agent.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                      </div>
                      <div>
                        <h4 className="font-medium">{agent.name}</h4>
                        <div className="flex items-center space-x-2">
                          <Badge variant={agent.status === 'Online' ? 'default' : 'secondary'}>
                            {agent.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-6 text-center">
                      <div>
                        <p className="text-lg font-bold">{agent.ticketsSolved}</p>
                        <p className="text-xs text-gray-600">Tickets Solved</p>
                      </div>
                      <div>
                        <p className="text-lg font-bold">{agent.avgResponseTime}h</p>
                        <p className="text-xs text-gray-600">Avg Response</p>
                      </div>
                      <div>
                        <div className="flex items-center justify-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span className="text-lg font-bold">{agent.customerRating}</span>
                        </div>
                        <p className="text-xs text-gray-600">Rating</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="channels" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Tickets by Channel</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {channelData.map((channel) => (
                    <div key={channel.channel} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-4 h-4 bg-blue-600 rounded"></div>
                        <span className="font-medium">{channel.channel}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="text-sm text-gray-600">{channel.tickets} tickets</span>
                        <Badge variant="outline">{channel.percentage}%</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Channel Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-gray-500">
                  <div className="text-center">
                    <BarChart3 className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                    <p>Channel performance chart would go here</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="knowledge" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Articles</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topArticles.map((article, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium mb-1">{article.title}</h4>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Users className="h-4 w-4" />
                          <span>{article.views} views</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <ThumbsUp className="h-4 w-4" />
                          <span>{article.helpfulness}% helpful</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant={article.helpfulness > 80 ? 'default' : 'secondary'}>
                        {article.helpfulness > 80 ? 'High Impact' : 'Needs Review'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalyticsDashboard;