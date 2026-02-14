import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";

export const DataTableLoading = () => {
  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-8 lg:w-32 w-full" />
        </CardHeader>
        <CardContent>
          <div className="w-full">
            <div className="flex items-center py-4">
              <Skeleton className="h-10 w-[200px]" />
            </div>
            <div className="rounded-md border p-4 space-y-4">
               {Array.from({ length: 5 }).map((_, i) => (
                 <div key={i} className="flex items-center gap-x-4">
                   <Skeleton className="h-4 w-4" />
                   <Skeleton className="h-4 w-full" />
                 </div>
               ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
