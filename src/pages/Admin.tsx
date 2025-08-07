import { useQuery } from "@tanstack/react-query";
import { Users, Star, Gem, AlertTriangle, Hourglass } from "lucide-react";
import { DataTable } from "@/components/data-table/data-table";
import { columns } from "@/components/data-table/columns";
import { FullProviderProfile } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MetricCard from "@/components/dashboards/admin/MetricCard";
import { supabase } from "@/integrations/supabase/client";
import { mapProfileToFullProviderProfile } from "@/lib/dataMapping";
import { Skeleton } from "@/components/ui/skeleton";
import ProviderTierChart from "@/components/dashboards/admin/ProviderTierChart";
import EngagementByTypeChart from "@/components/dashboards/admin/EngagementByTypeChart";
import TopViewedProviders from "@/components/dashboards/admin/TopViewedProviders";

const fetchAllProviders = async (): Promise<FullProviderProfile[]> => {
  const { data, error } = await supabase.from('profiles').select('*');
  if (error) {
    console.error("Error fetching all providers:", error);
    throw new Error(error.message);
  }
  return data.map(mapProfileToFullProviderProfile);
};

const AdminPage = () => {
    const { data: providers, isLoading, isError } = useQuery<FullProviderProfile[], Error>({
        queryKey: ['allProvidersAdmin'],
        queryFn: fetchAllProviders,
    });

    if (isLoading) {
        return (
            <div className="container mx-auto py-10">
                <Skeleton className="h-8 w-1/3 mb-6" />
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5 mb-6">
                    {Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-28 w-full" />)}
                </div>
                <div className="grid gap-6 lg:grid-cols-3">
                    <Skeleton className="h-96 w-full lg:col-span-1" />
                    <Skeleton className="h-96 w-full lg:col-span-2" />
                </div>
            </div>
        );
    }

    if (isError || !providers) {
        return (
            <div className="container mx-auto py-10 text-center">
                <h1 className="text-2xl font-bold text-destructive">Error</h1>
                <p className="text-muted-foreground">Could not fetch provider data.</p>
            </div>
        );
    }

    const freeProviders = providers.filter(p => p.tier === 'Free').length;
    const preferredProviders = providers.filter(p => p.tier === 'Preferred').length;
    const premierProviders = providers.filter(p => p.tier === 'Premier').length;
    const highChurnRisk = providers.filter(p => p.churnRisk).length;
    const activeTrials = providers.filter(p => p.trialStatus === 'Active').length;

    return (
        <div className="container mx-auto py-10 space-y-6">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
                <MetricCard title="Free Tier" value={freeProviders} icon={<Users className="h-4 w-4 text-muted-foreground" />} />
                <MetricCard title="Preferred Tier" value={preferredProviders} icon={<Star className="h-4 w-4 text-muted-foreground" />} />
                <MetricCard title="Premier Tier" value={premierProviders} icon={<Gem className="h-4 w-4 text-muted-foreground" />} />
                <MetricCard title="High Churn Risk" value={highChurnRisk} icon={<AlertTriangle className="h-4 w-4 text-muted-foreground" />} />
                <MetricCard title="Active Trials" value={activeTrials} icon={<Hourglass className="h-4 w-4 text-muted-foreground" />} />
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <div className="lg:col-span-1">
                    <ProviderTierChart providers={providers} />
                </div>
                <div className="lg:col-span-2">
                    <EngagementByTypeChart providers={providers} />
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-1">
                    <Card>
                        <CardHeader>
                            <CardTitle>Top Viewed Providers</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <TopViewedProviders providers={providers} />
                        </CardContent>
                    </Card>
                </div>
                <div className="lg:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Provider Management</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <DataTable columns={columns} data={providers} />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default AdminPage;