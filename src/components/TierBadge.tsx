import React from 'react';
import { Tier } from '@/types';
import { TIER_BADGES } from '@/lib/constants';

interface TierBadgeProps {
  tier: Tier;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const TierBadge: React.FC<TierBadgeProps> = ({ 
  tier, 
  className = '', 
  size = 'md' 
}) => {
  const badge = TIER_BADGES[tier];
  
  // No badge for Free tier
  if (!badge) {
    return null;
  }
  
  const sizeClasses = {
    sm: 'h-6 w-auto',
    md: 'h-8 w-auto', 
    lg: 'h-12 w-auto'
  };
  
  return (
    <div className={`inline-flex items-center ${className}`}>
      <img
        src={badge.image}
        alt={badge.alt}
        className={`${sizeClasses[size]} object-contain`}
        loading="lazy"
        aria-label={`${badge.name} provider tier badge`}
      />
    </div>
  );
};
