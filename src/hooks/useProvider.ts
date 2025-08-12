import { useQuery } from "@tanstack/react-query";
import { fetchProviderById } from "@/api/providers";
import type { FullProviderProfile } from "@/types";

export function useProvider(providerId: number | null) {
  return useQuery<FullProviderProfile, Error>({
    queryKey: ["provider", providerId],
    queryFn: () => fetchProviderById(providerId!),
    enabled: !!providerId,
  });
}