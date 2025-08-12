import { supabase } from "@/integrations/supabase/client";

export async function fetchProviderById(id: number) {
  const { data, error } = await supabase
    .from("providers")
    .select(`
      id,
      profile_status,
      membership_tier,
      search_priority,
      provider_name,
      practitioner_type,
      profile_photo,
      tier_badge,
      location,
      contact,
      social_media,
      bio_experience,
      training_and_ceus,
      media_content,
      specialties,
      availability,
      reviews_and_faqs,
      admin
    `)
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(error.message);
  }
  return data;
}