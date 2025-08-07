import { useState, useEffect } from "react";
import { transformProvider, TransformedProvider } from "@/utils/transformProvider";

export function useProviders() {
  const [providers, setProviders] = useState<TransformedProvider[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchProviders = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch("https://grastontechnique.com/wp-json/wp/v2/providers");
        if (!res.ok) {
          throw new Error(`Error fetching providers: ${res.status}`);
        }

        const data = await res.json();
        const transformed = data.map(transformProvider);
        setProviders(transformed);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchProviders();
  }, []);

  return { providers, loading, error };
}
