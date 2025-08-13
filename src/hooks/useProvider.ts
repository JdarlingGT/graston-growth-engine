import { useQuery } from "@tanstack/react-query";
import { mockProviderData } from "@/lib/mockData";
import type { Provider } from "@/types/provider";

// Simulate a network request
const fetchProvider = async (id: number | null): Promise<Provider> => {
  console.log(`Fetching provider with id: ${id}`);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockProviderData);
    }, 500);
  });
};

export const useProvider = (id: number | null) => {
  return useQuery({
    queryKey: ["provider", id],
    queryFn: () => fetchProvider(id),
    enabled: !!id, // Only run the query if the id is not null
  });
};