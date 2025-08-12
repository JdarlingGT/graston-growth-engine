import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Clock, X, Loader2 } from 'lucide-react';
import { EnhancedInput } from './enhanced-input';
import { EnhancedButton } from './enhanced-button';
import { useDebounce } from '@/hooks/useDebounce';
import { cn } from '@/lib/utils';

interface SearchSuggestion {
  id: string;
  text: string;
  type: 'recent' | 'location' | 'provider' | 'specialty';
  icon?: React.ReactNode;
}

interface EnhancedSearchProps {
  onSearch: (value: string) => void;
  placeholder?: string;
  suggestions?: SearchSuggestion[];
  loading?: boolean;
  className?: string;
}

export const EnhancedSearch: React.FC<EnhancedSearchProps> = ({ 
  onSearch, 
  placeholder = "Search providers, locations, or specialties...",
  suggestions = [],
  loading = false,
  className
}) => {
  const [value, setValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const debouncedValue = useDebounce(value, 300);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  const allSuggestions: SearchSuggestion[] = [
    ...recentSearches.slice(0, 3).map(search => ({
      id: `recent-${search}`,
      text: search,
      type: 'recent' as const,
      icon: <Clock className="h-4 w-4" />
    })),
    ...suggestions.slice(0, 5)
  ];

  const handleSearch = (searchValue: string) => {
    if (searchValue.trim()) {
      // Add to recent searches
      const updated = [searchValue, ...recentSearches.filter(s => s !== searchValue)].slice(0, 5);
      setRecentSearches(updated);
      localStorage.setItem('recentSearches', JSON.stringify(updated));
      
      onSearch(searchValue);
      setShowSuggestions(false);
      setValue(searchValue);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (activeIndex >= 0 && activeIndex < allSuggestions.length) {
        handleSearch(allSuggestions[activeIndex].text);
      } else {
        handleSearch(value);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex(prev => Math.min(prev + 1, allSuggestions.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex(prev => Math.max(prev - 1, -1));
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
      setActiveIndex(-1);
    }
  };

  const clearSearch = () => {
    setValue('');
    onSearch('');
    inputRef.current?.focus();
  };

  return (
    <div className={cn("relative w-full max-w-2xl", className)}>
      <div className="relative flex items-center">
        <div className="relative flex-1">
          <EnhancedInput
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={placeholder}
            className="pr-20"
            onKeyDown={handleKeyDown}
            onFocus={() => setShowSuggestions(true)}
            onBlur={(e) => {
              setTimeout(() => {
                if (!suggestionsRef.current?.contains(e.relatedTarget as Node)) {
                  setShowSuggestions(false);
                }
              }, 150);
            }}
            icon={<Search className="h-4 w-4" />}
          />
          
          {/* Clear button */}
          <AnimatePresence>
            {value && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={clearSearch}
                className="absolute right-12 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-muted transition-colors"
                type="button"
              >
                <X className="h-4 w-4 text-muted-foreground" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
        
        <EnhancedButton 
          onClick={() => handleSearch(value)} 
          className="ml-2"
          loading={loading}
          type="button"
        >
          {loading ? <Loader2 className="h-4 w-4" /> : <Search className="h-4 w-4" />}
          <span className="hidden sm:inline ml-2">Search</span>
        </EnhancedButton>
      </div>

      {/* Enhanced suggestions dropdown */}
      <AnimatePresence>
        {showSuggestions && allSuggestions.length > 0 && (
          <motion.div
            ref={suggestionsRef}
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute top-full left-0 right-0 mt-2 bg-white border rounded-lg shadow-xl z-50 max-h-80 overflow-y-auto"
          >
            {recentSearches.length > 0 && !value && (
              <div className="px-4 py-2 text-xs font-medium text-muted-foreground bg-muted/50 border-b">
                Recent Searches
              </div>
            )}
            
            {allSuggestions.map((suggestion, idx) => (
              <motion.div
                key={suggestion.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className={cn(
                  "px-4 py-3 cursor-pointer flex items-center gap-3 transition-colors",
                  idx === activeIndex ? 'bg-primary/10 text-primary' : 'hover:bg-muted/50'
                )}
                onClick={() => handleSearch(suggestion.text)}
                onMouseEnter={() => setActiveIndex(idx)}
              >
                <div className="text-muted-foreground">
                  {suggestion.icon}
                </div>
                <span className="text-sm flex-1">{suggestion.text}</span>
                {suggestion.type === 'recent' && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      const updated = recentSearches.filter(s => s !== suggestion.text);
                      setRecentSearches(updated);
                      localStorage.setItem('recentSearches', JSON.stringify(updated));
                    }}
                    className="p-1 rounded-full hover:bg-muted transition-colors"
                  >
                    <X className="h-3 w-3" />
                  </button>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};