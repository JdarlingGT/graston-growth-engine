-- Create profiles table
CREATE TABLE public.profiles (
  id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT,
  specialty TEXT,
  bio TEXT,
  experience TEXT,
  education TEXT,
  profile_image TEXT,
  phone TEXT,
  email TEXT,
  website TEXT,
  linkedin TEXT,
  facebook TEXT,
  instagram TEXT,
  twitter TEXT,
  services TEXT[],
  certifications TEXT[],
  location TEXT,
  clinic_address TEXT,
  coordinates JSONB,
  gt_certifications TEXT[],
  verification_badges TEXT[],
  accreditation_logos JSONB,
  languages_spoken TEXT[],
  patient_types TEXT[],
  conditions_treated TEXT[],
  rating NUMERIC,
  review_count INT,
  is_favorite BOOLEAN DEFAULT FALSE,
  tier TEXT,
  clinician_type TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (id)
);

-- Enable RLS (REQUIRED for security)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create secure policies for each operation
CREATE POLICY "Users can view their own profile" ON public.profiles 
FOR SELECT TO authenticated USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON public.profiles 
FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles 
FOR UPDATE TO authenticated USING (auth.uid() = id);

CREATE POLICY "Users can delete their own profile" ON public.profiles 
FOR DELETE TO authenticated USING (auth.uid() = id);