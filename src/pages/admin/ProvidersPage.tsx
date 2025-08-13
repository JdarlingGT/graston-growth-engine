import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DataTable } from "@/components/data-table/data-table";
import { columns } from "@/components/admin/providers/columns";
import { mockProviderData } from "@/lib/mockData";
import { Provider } from "@/types/index";

const AdminProvidersPage = () => {
  // Convert FullProviderProfile to Provider for DataTable compatibility
  const providers: Provider[] = mockProviderData.map((provider: any) => ({
    id: provider.id,
    name: provider.provider_name,
    email: provider.contact.provider_email,
    tier: provider.membership_tier,
    status: "Active", // Mock status
    lastLogin: new Date().toISOString(), // Mock date
  }));

  return (
    <div className="p-4 md:p-8">
      <Card>
        <CardHeader>
          <CardTitle>Manage Providers</CardTitle>
          <CardDescription>
            View, edit, and manage all provider accounts in the directory.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={providers} />
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminProvidersPage;