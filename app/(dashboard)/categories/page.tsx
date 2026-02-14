"use client"

import { Plus } from "lucide-react";

import { useGetCategories } from "@/features/categories/api/use-get-categories";
import { useNewCategory } from "@/features/categories/hooks/use-new-category";
import { useBulkDeleteCategories } from "@/features/categories/api/use-bulk-delete-categories";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";

import { columns } from "./columns";
import { DataTableLoading } from "@/components/data-table-loading";

const CategoriesPage = () => {
  const newCategory = useNewCategory();
  const deleteCategories = useBulkDeleteCategories();
  const categoriesQuery = useGetCategories();
  const categories = categoriesQuery.data || [];

  const isDisabled = 
  categoriesQuery.isLoading || 
  deleteCategories.isPending;

  if(categoriesQuery.isLoading){
    return (
      <DataTableLoading />
    );
  }

  return ( 
    <div className="max-w-screen-2xl mx-auto w-full -b-10 -mt-24">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 flex-col lg:items-center lg:justify-between lg:flex-row">
          <CardTitle className="text-xl line-clamp-1">
            Categories Page 
          </CardTitle>
          <Button size="sm" onClick={newCategory.onOpen}>
            <Plus className="size-4 mr-2"/>
            Add new
          </Button>
        </CardHeader>
        <CardContent> 
          <DataTable 
            columns={columns} 
            data={categories} 
            filterKey="name"
            onDelete={(row) => {
              const ids = row.map((r) => r.original.id);
              deleteCategories.mutate({ids})
            }}
            disabled={isDisabled}
          />
        </CardContent>
      </Card>
    </div>
   );
}
 
export default CategoriesPage;