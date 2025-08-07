-- Add a 'views' column to track profile views
ALTER TABLE public.profiles
ADD COLUMN views INT DEFAULT 0;

-- Update existing profiles with random view counts for demonstration purposes
UPDATE public.profiles
SET views = floor(random() * 5000 + 100);