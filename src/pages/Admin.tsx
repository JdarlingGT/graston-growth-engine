import { useEffect, useState } from "react";
import { DataTable } from "@/components/data-table/data-table";
import { columns } from "@/components/data-table/columns";
import { FullProviderProfile } from "@/types";
import { mockProviders } from "@/lib/mockData";

const AdminPage = () => {
    const [data, setData] = useState<FullProviderProfile[]>([]);

    useEffect(() => {
        // In a real app, you would fetch data from an API here.
        setData(mockProviders);
    }, []);

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-2xl font-bold mb-4">Provider Management</h1>
            <DataTable columns={columns} data={data} />
        </div>
    );
}

export default AdminPage;