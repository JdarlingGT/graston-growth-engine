import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { 
  Zap, 
  Plus, 
  Play, 
  Pause, 
  Edit, 
  Trash2,
  ArrowRight,
  Clock,
  Mail,
  Tag,
  User,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import { AutomationRule } from '@/types/support';

const AutomationBuilder = () => {
  const [rules, setRules] = useState<AutomationRule[]>([]);
  const [selectedRule, setSelectedRule] = useState<AutomationRule | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [ruleForm, setRuleForm] = useState({
    name: '',
    description: '',
    trigger: { type: '', config: {} },
    conditions: [],
    actions: []
  });

  // Mock data
  React.useEffect(() => {
    const mockRules: AutomationRule[] = [
      {
        id: 'rule-1',
        name: 'Auto-assign Billing Questions',
        description: 'Automatically assign tickets with billing-related keywords to the Finance team',
        isActive: true,
        trigger: {
          type: 'ticket_created',
          config: {}
        },
        conditions: [
          {
            field: 'subject',
            operator: 'contains',
            value: 'billing'
          },
          {
            field: 'subject',
            operator: 'contains',
            value: 'payment'
          }
        ],
        actions: [
          {
            type: 'assign_agent',
            config: { teamId: 'finance-team' }
          },
          {
            type: 'add_tag',
            config: { tag: 'billing' }
          },
          {
            type: 'change_priority',
            config: { priority: 'High' }
          }
        ],
        createdBy: {
          id: 'agent-1',
          name: 'Sarah Wilson',
          email: 'sarah@company.com',
          avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face',
          status: 'Online',
          department: 'Support',
          activeChats: 0,
          maxChats: 5,
          skills: ['Automation']
        },
        createdAt: '2024-01-10T09:00:00Z',
        executionCount: 47
      },
      {
        id: 'rule-2',
        name: 'VIP Customer Priority',
        description: 'Set high priority for tickets from VIP customers',
        isActive: true,
        trigger: {
          type: 'ticket_created',
          config: {}
        },
        conditions: [
          {
            field: 'customer.tier',
            operator: 'equals',
            value: 'Enterprise'
          }
        ],
        actions: [
          {
            type: 'change_priority',
            config: { priority: 'Urgent' }
          },
          {
            type: 'add_tag',
            config: { tag: 'vip' }
          }
        ],
        createdBy: {
          id: 'agent-1',
          name: 'Sarah Wilson',
          email: 'sarah@company.com',
          avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face',
          status: 'Online',
          department: 'Support',
          activeChats: 0,
          maxChats: 5,
          skills: ['Automation']
        },
        createdAt: '2024-01-12T14:30:00Z',
        executionCount: 23
      }
    ];
    setRules(mockRules);
  }, []);

  const triggerTypes = [
    { value: 'ticket_created', label: 'New Ticket Created' },
    { value: 'ticket_updated', label: 'Ticket Updated' },
    { value: 'customer_replied', label: 'Customer Replied' },
    { value: 'time_based', label: 'Time-based (Schedule)' }
  ];

  const conditionFields = [
    { value: 'subject', label: 'Subject' },
    { value: 'description', label: 'Description' },
    { value: 'priority', label: 'Priority' },
    { value: 'channel', label: 'Channel' },
    { value: 'customer.tier', label: 'Customer Tier' },
    { value: 'customer.tags', label: 'Customer Tags' }
  ];

  const operators = [
    { value: 'equals', label: 'Equals' },
    { value: 'contains', label: 'Contains' },
    { value: 'greater_than', label: 'Greater Than' },
    { value: 'less_than', label: 'Less Than' }
  ];

  const actionTypes = [
    { value: 'assign_agent', label: 'Assign to Agent/Team' },
    { value: 'add_tag', label: 'Add Tag' },
    { value: 'change_priority', label: 'Change Priority' },
    { value: 'send_email', label: 'Send Email' },
    { value: 'create_task', label: 'Create Task' }
  ];

  const handleToggleRule = (ruleId: string) => {
    setRules(prev => prev.map(rule => 
      rule.id === ruleId ? { ...rule, isActive: !rule.isActive } : rule
    ));
  };

  const handleCreateRule = () => {
    setRuleForm({
      name: '',
      description: '',
      trigger: { type: '', config: {} },
      conditions: [],
      actions: []
    });
    setSelectedRule(null);
    setIsCreating(true);
  };

  const getActionIcon = (actionType: string) => {
    const icons = {
      'assign_agent': User,
      'add_tag': Tag,
      'change_priority': AlertTriangle,
      'send_email': Mail,
      'create_task': CheckCircle
    };
    return icons[actionType as keyof typeof icons] || CheckCircle;
  };

  const getTriggerIcon = (triggerType: string) => {
    const icons = {
      'ticket_created': Plus,
      'ticket_updated': Edit,
      'customer_replied': Mail,
      'time_based': Clock
    };
    return icons[triggerType as keyof typeof icons] || Zap;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
      {/* Rules List */}
      <div className="lg:col-span-1 space-y-4">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Automation Rules</CardTitle>
              <Button onClick={handleCreateRule}>
                <Plus className="h-4 w-4 mr-2" />
                New Rule
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Template Library */}
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-medium text-sm mb-2">Quick Templates</h4>
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start text-xs">
                  Auto-reply After Hours
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start text-xs">
                  Escalate Urgent Tickets
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start text-xs">
                  Tag by Keywords
                </Button>
              </div>
            </div>

            <Separator />

            {/* Rules List */}
            <div className="space-y-2 max-h-[400px] overflow-y-auto">
              {rules.map((rule) => {
                const TriggerIcon = getTriggerIcon(rule.trigger.type);
                
                return (
                  <div
                    key={rule.id}
                    onClick={() => setSelectedRule(rule)}
                    className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-sm ${
                      selectedRule?.id === rule.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <TriggerIcon className="h-4 w-4 text-blue-600" />
                        <h4 className="font-medium text-sm">{rule.name}</h4>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={rule.isActive}
                          onCheckedChange={() => handleToggleRule(rule.id)}
                        />
                        <Badge variant={rule.isActive ? 'default' : 'secondary'} className="text-xs">
                          {rule.isActive ? 'Active' : 'Inactive'}
                        </Badge>
                      </div>
                    </div>

                    <p className="text-xs text-gray-600 mb-3 line-clamp-2">{rule.description}</p>

                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>Executed {rule.executionCount} times</span>
                      <span>{new Date(rule.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Rule Detail/Builder */}
      <div className="lg:col-span-2">
        {isCreating ? (
          <Card className="h-full">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Create Automation Rule</CardTitle>
                <div className="space-x-2">
                  <Button variant="outline" onClick={() => setIsCreating(false)}>
                    Cancel
                  </Button>
                  <Button>
                    <Zap className="h-4 w-4 mr-2" />
                    Save Rule
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Basic Info */}
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Rule Name</label>
                  <Input
                    value={ruleForm.name}
                    onChange={(e) => setRuleForm(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter rule name..."
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Description</label>
                  <Input
                    value={ruleForm.description}
                    onChange={(e) => setRuleForm(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe what this rule does..."
                  />
                </div>
              </div>

              <Separator />

              {/* Visual Builder */}
              <div className="space-y-6">
                {/* Trigger */}
                <div className="p-4 border border-blue-200 bg-blue-50 rounded-lg">
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                      <Zap className="h-4 w-4 text-white" />
                    </div>
                    <h4 className="font-medium">WHEN (Trigger)</h4>
                  </div>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a trigger..." />
                    </SelectTrigger>
                    <SelectContent>
                      {triggerTypes.map((trigger) => (
                        <SelectItem key={trigger.value} value={trigger.value}>
                          {trigger.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex justify-center">
                  <ArrowRight className="h-6 w-6 text-gray-400" />
                </div>

                {/* Conditions */}
                <div className="p-4 border border-orange-200 bg-orange-50 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center">
                        <AlertTriangle className="h-4 w-4 text-white" />
                      </div>
                      <h4 className="font-medium">IF (Conditions)</h4>
                    </div>
                    <Button variant="outline" size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Condition
                    </Button>
                  </div>
                  <div className="text-sm text-gray-600">
                    No conditions added yet. Click "Add Condition" to set criteria.
                  </div>
                </div>

                <div className="flex justify-center">
                  <ArrowRight className="h-6 w-6 text-gray-400" />
                </div>

                {/* Actions */}
                <div className="p-4 border border-green-200 bg-green-50 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                        <CheckCircle className="h-4 w-4 text-white" />
                      </div>
                      <h4 className="font-medium">THEN (Actions)</h4>
                    </div>
                    <Button variant="outline" size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Action
                    </Button>
                  </div>
                  <div className="text-sm text-gray-600">
                    No actions added yet. Click "Add Action" to define what happens.
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : selectedRule ? (
          <Card className="h-full">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <CardTitle className="text-xl">{selectedRule.name}</CardTitle>
                  <p className="text-gray-600">{selectedRule.description}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={selectedRule.isActive}
                    onCheckedChange={() => handleToggleRule(selectedRule.id)}
                  />
                  <Button variant="outline">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  <Button variant="outline">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Rule Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">{selectedRule.executionCount}</p>
                  <p className="text-xs text-gray-600">Times Executed</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">
                    {selectedRule.isActive ? 'Active' : 'Inactive'}
                  </p>
                  <p className="text-xs text-gray-600">Status</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-purple-600">
                    {new Date(selectedRule.createdAt).toLocaleDateString()}
                  </p>
                  <p className="text-xs text-gray-600">Created</p>
                </div>
              </div>

              {/* Rule Flow Visualization */}
              <div className="space-y-4">
                {/* Trigger */}
                <div className="p-4 border border-blue-200 bg-blue-50 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                      <Zap className="h-4 w-4 text-white" />
                    </div>
                    <h4 className="font-medium">WHEN</h4>
                  </div>
                  <p className="text-sm">
                    {triggerTypes.find(t => t.value === selectedRule.trigger.type)?.label}
                  </p>
                </div>

                <div className="flex justify-center">
                  <ArrowRight className="h-6 w-6 text-gray-400" />
                </div>

                {/* Conditions */}
                <div className="p-4 border border-orange-200 bg-orange-50 rounded-lg">
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center">
                      <AlertTriangle className="h-4 w-4 text-white" />
                    </div>
                    <h4 className="font-medium">IF</h4>
                  </div>
                  <div className="space-y-2">
                    {selectedRule.conditions.map((condition, index) => (
                      <div key={index} className="flex items-center space-x-2 text-sm">
                        <Badge variant="outline">{condition.field}</Badge>
                        <span>{condition.operator}</span>
                        <Badge variant="secondary">"{condition.value}"</Badge>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-center">
                  <ArrowRight className="h-6 w-6 text-gray-400" />
                </div>

                {/* Actions */}
                <div className="p-4 border border-green-200 bg-green-50 rounded-lg">
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 text-white" />
                    </div>
                    <h4 className="font-medium">THEN</h4>
                  </div>
                  <div className="space-y-2">
                    {selectedRule.actions.map((action, index) => {
                      const ActionIcon = getActionIcon(action.type);
                      return (
                        <div key={index} className="flex items-center space-x-2 text-sm">
                          <ActionIcon className="h-4 w-4" />
                          <span>{actionTypes.find(a => a.value === action.type)?.label}</span>
                          {action.config && Object.keys(action.config).length > 0 && (
                            <Badge variant="outline">
                              {Object.values(action.config)[0] as string}
                            </Badge>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="h-full flex items-center justify-center">
            <CardContent className="text-center">
              <Zap className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Select a rule</h3>
              <p className="text-gray-600">Choose an automation rule to view details or create a new one</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AutomationBuilder;