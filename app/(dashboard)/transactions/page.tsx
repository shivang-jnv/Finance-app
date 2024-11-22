"use client"

import { Loader2, Plus } from "lucide-react";

import { useNewTransaction } from "@/features/transactions/hooks/use-new-transaction";
import { useBulkDeleteTransactions } from "@/features/transactions/api/use-bulk-delete-transactions"; 
import { useGetTransactions } from "@/features/transactions/api/use-get-transactions";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { Skeleton } from "@/components/ui/skeleton";

import { columns } from "./columns";

const TransactionsPage = () => {
  const newTransaction = useNewTransaction();
  const deleteTransactions = useBulkDeleteTransactions();
  const transactionsQuery = useGetTransactions();
  const transactions = transactionsQuery.data || [];

  const isDisabled = 
  transactionsQuery.isLoading || 
  deleteTransactions.isPending;

  if(transactionsQuery.isLoading){
    return (
      <div className="max-w-screen-2xl mx-auto w-full -b-10 -mt-24">
        <Card className="border-none drop-shadow-sm">
          <CardHeader>
            <Skeleton className="h-8 w-48"/>
          </CardHeader>
          <CardContent>
            <div className="h-[500px] w-full flex items-center justify-center">
              <Loader2 className="sizee-6 text-slate-300 animate-spin"/>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return ( 
    <div className="max-w-screen-2xl mx-auto w-full -b-10 -mt-24">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 flex-col lg:items-center lg:justify-between lg:flex-row">
          <CardTitle className="text-xl line-clamp-1">
            Transaction History
          </CardTitle>
          <Button size="sm" onClick={newTransaction.onOpen}>
            <Plus className="size-4 mr-2"/>
            Add new
          </Button>
        </CardHeader>
        <CardContent> 
          <DataTable 
            columns={columns} 
            data={transactions} 
            filterKey="name"
            onDelete={(row) => {
              const ids = row.map((r) => r.original.id);
              deleteTransactions.mutate({ids})
            }}
            disabled={isDisabled}
          />
        </CardContent>
      </Card>
    </div>
   );
}
 
export default TransactionsPage;