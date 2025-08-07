ALTER TABLE public.profiles
ADD COLUMN gallery_images TEXT[],
ADD COLUMN gallery_videos TEXT[],
ADD COLUMN testimonials JSONB[],
ADD COLUMN faqs JSONB[],
ADD COLUMN can_compare BOOLEAN DEFAULT false;