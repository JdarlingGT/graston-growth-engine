import React from 'react';
import { ACCREDITATION_DEFAULTS, AccreditationType } from '@/lib/constants';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ExternalLink } from 'lucide-react';

interface AccreditationBadgesProps {
  accreditations: AccreditationType[];
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showTooltips?: boolean;
}

export const AccreditationBadges: React.FC<AccreditationBadgesProps> = ({ 
  accreditations, 
  className = '',
  size = 'md',
  showTooltips = true
}) => {
  // Don't render anything if no accreditations
  if (!accreditations || accreditations.length === 0) {
    return null;
  }

  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-12 w-12',
    lg: 'h-16 w-16'
  };

  const containerClasses = {
    sm: 'gap-2',
    md: 'gap-3', 
    lg: 'gap-4'
  };

  const AccreditationBadge: React.FC<{ accreditation: AccreditationType }> = ({ accreditation }) => {
    const config = ACCREDITATION_DEFAULTS[accreditation];
    
    if (!config) return null;

    const badge = (
      <a
        href={config.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex items-center justify-center p-2 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200 bg-white"
        aria-label={`Visit ${config.name} website`}
      >
        <img
          src={config.logo}
          alt={config.alt}
          className={`${sizeClasses[size]} object-contain group-hover:scale-105 transition-transform duration-200`}
          loading="lazy"
        />
        <ExternalLink className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-60 transition-opacity duration-200" />
      </a>
    );

    if (!showTooltips) {
      return badge;
    }

    return (
      <TooltipProvider key={accreditation}>
        <Tooltip>
          <TooltipTrigger asChild>
            {badge}
          </TooltipTrigger>
          <TooltipContent>
            <p className="font-medium">{config.name}</p>
            <p className="text-sm text-gray-600">{config.alt}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  };

  return (
    <div className={`accreditation-badges ${className}`}>
      <h4 className="text-sm font-semibold text-gray-700 mb-3">Professional Accreditations</h4>
      <div className={`flex flex-wrap ${containerClasses[size]}`}>
        {accreditations.map((accreditation) => (
          <AccreditationBadge key={accreditation} accreditation={accreditation} />
        ))}
      </div>
    </div>
  );
};
