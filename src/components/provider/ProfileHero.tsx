"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FacebookShareButton, TwitterShareButton, LinkedinShareButton, FacebookIcon, TwitterIcon, LinkedinIcon } from 'react-share';
import { Star, Share2 } from 'lucide-react';
import { FullProviderProfile } from '@/types';
import { TierBadge } from '@/components/TierBadge';
import { Button } from '@/components/ui/button';

interface ProfileHeroProps {
  provider: FullProviderProfile;
}

const ProfileHero: React.FC<ProfileHeroProps> = ({ provider }) => {
  const [favorited, setFavorited] = useState(false);
  const pageUrl = window.location.href;

  return (
    <motion.div
      className="sticky top-0 bg-background z-10 border-b"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between py-6 px-4">
        <div className="flex items-center space-x-4">
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold">{provider.name}</h1>
            <div className="flex items-center space-x-2 mt-1">
              <TierBadge tier={provider.tier} size="md" />
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2 mt-4 md:mt-0">
          <Button variant="ghost" onClick={() => setFavorited(!favorited)} aria-label="Favorite">
            <Star className={`h-5 w-5 ${favorited ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'}`} />
          </Button>
          <Button variant="ghost" aria-label="Share">
            <Share2 className="h-5 w-5 text-muted-foreground" />
            <div className="ml-2 hidden md:flex space-x-1">
              <FacebookShareButton url={pageUrl}><FacebookIcon size={24} round /></FacebookShareButton>
              <TwitterShareButton url={pageUrl}><TwitterIcon size={24} round /></TwitterShareButton>
              <LinkedinShareButton url={pageUrl}><LinkedinIcon size={24} round /></LinkedinShareButton>
            </div>
          </Button>
        </div>
      </div>
    </motion.div>
);
};

export default ProfileHero;