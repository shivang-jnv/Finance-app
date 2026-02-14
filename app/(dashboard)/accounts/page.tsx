"use client"

import { Plus } from "lucide-react";
import { useNewAccount } from "@/features/accounts/hooks/use-new-account";
import { useBulkDeleteAccounts } from "@/features/accounts/api/use-bulk-delete-accounts";
import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";

import { columns } from "./columns";
import { DataTableLoading } from "@/components/data-table-loading";

const AccountsPage = () => {
  const newAccount = useNewAccount();
  const deleteAccounts = useBulkDeleteAccounts();
  const accountsQuery = useGetAccounts();
  const accounts = accountsQuery.data || [];

  const isDisabled = 
  accountsQuery.isLoading || 
  deleteAccounts.isPending;

  if(accountsQuery.isLoading){
    return (
      <DataTableLoading />
    );
  }

  return ( 
    <div className="max-w-screen-2xl mx-auto w-full -b-10 -mt-24">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 flex-col lg:items-center lg:justify-between lg:flex-row">
          <CardTitle className="text-xl line-clamp-1">
            Accounts Page 
          </CardTitle>
          <Button size="sm" onClick={newAccount.onOpen}>
            <Plus className="size-4 mr-2"/>
            Add new
          </Button>
        </CardHeader>
        <CardContent> 
          <DataTable 
            columns={columns} 
            data={accounts} 
            filterKey="name"
            onDelete={(row) => {
              const ids = row.map((r) => r.original.id);
              deleteAccounts.mutate({ids})
            }}
            disabled={isDisabled}
          />
        </CardContent>
      </Card>
    </div>
   );
}
 
export default AccountsPage;