import React from 'react';
import { TierBadge } from '@/components/TierBadge';
import { AccreditationBadges } from '@/components/AccreditationBadges';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { AccreditationType } from '@/lib/constants';

const BadgeShowcase = () => {
  const sampleAccreditations: AccreditationType[] = ['fsbpt', 'nata', 'apta', 'ica'];
  
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Provider Badge System</h1>
      
      {/* Tier Badges Section */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>🏷️ Tier Badges</CardTitle>
          <p className="text-muted-foreground">
            Visual badges that display provider tier levels with GT branding
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Different Sizes</h3>
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <TierBadge tier="Premier" size="sm" />
                  <p className="text-xs mt-2">Small</p>
                </div>
                <div className="text-center">
                  <TierBadge tier="Premier" size="md" />
                  <p className="text-xs mt-2">Medium</p>
                </div>
                <div className="text-center">
                  <TierBadge tier="Premier" size="lg" />
                  <p className="text-xs mt-2">Large</p>
                </div>
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="text-lg font-semibold mb-3">Different Tiers</h3>
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <TierBadge tier="Free" size="md" />
                  <p className="text-xs mt-2">Free (No Badge)</p>
                </div>
                <div className="text-center">
                  <TierBadge tier="Preferred" size="md" />
                  <p className="text-xs mt-2">Preferred</p>
                </div>
                <div className="text-center">
                  <TierBadge tier="Premier" size="md" />
                  <p className="text-xs mt-2">Premier</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Accreditation Badges Section */}
      <Card>
        <CardHeader>
          <CardTitle>🎓 Accreditation Badges</CardTitle>
          <p className="text-muted-foreground">
            Professional accreditation logos with clickable links and tooltips
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Sample Accreditations</h3>
              <AccreditationBadges 
                accreditations={sampleAccreditations}
                size="md"
                showTooltips={true}
              />
            </div>
            
            <Separator />
            
            <div>
              <h3 className="text-lg font-semibold mb-3">Different Sizes</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">Small</h4>
                  <AccreditationBadges 
                    accreditations={['fsbpt', 'nata']}
                    size="sm"
                    showTooltips={false}
                  />
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-2">Medium</h4>
                  <AccreditationBadges 
                    accreditations={['fsbpt', 'nata']}
                    size="md"
                    showTooltips={false}
                  />
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-2">Large</h4>
                  <AccreditationBadges 
                    accreditations={['fsbpt', 'nata']}
                    size="lg"
                    showTooltips={false}
                  />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Implementation Notes */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>📦 Implementation Features</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            <li>✅ <strong>Tier Badges:</strong> Show Premier/Preferred badges, hide for Free tier</li>
            <li>✅ <strong>Responsive Design:</strong> Mobile-friendly layouts with proper spacing</li>
            <li>✅ <strong>Accessibility:</strong> ARIA labels and proper alt text</li>
            <li>✅ <strong>Performance:</strong> Lazy loading for images</li>
            <li>✅ <strong>Interactive:</strong> Clickable accreditation links (open in new tab)</li>
            <li>✅ <strong>Tooltips:</strong> Hover for accreditation details</li>
            <li>✅ <strong>GT Branding:</strong> Uses consistent color scheme (#435769, #fff647, #7C9099)</li>
            <li>✅ <strong>Conditional Rendering:</strong> Sections hide when no data available</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default BadgeShowcase;
