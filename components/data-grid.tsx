"use client";

import { useSearchParams } from "next/navigation";
import { PiggyBank, TrendingUp, TrendingDown } from "lucide-react";

import { formatDateRange } from "@/lib/utils";
import { DataCard, DataCardLoading } from "@/components/data-card";

interface DataGridProps {
  data?: {
    remainingAmount: number;
    remainingChange: number;
    incomeAmount: number;
    incomeChange: number;
    expensesAmount: number;
    expensesChange: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    categories: any[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    days: any[];
  }
}

const DataGrid = ({ data }: DataGridProps) => {
  const params = useSearchParams();
  const to = params.get("to") || undefined;
  const from = params.get("from") || undefined;

  const dateRangeLabel = formatDateRange({ from, to });

  if (!data)
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-2 mb-8">
        <DataCardLoading />
        <DataCardLoading />
        <DataCardLoading />
      </div>
    );
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-2 mb-8">
      <DataCard
        title="Remaining"
        value={data.remainingAmount}
        percentChange={data.remainingChange}
        icon={PiggyBank}
        variant="default"
        dateRange={dateRangeLabel}
      />
      <DataCard
        title="Income"
        value={data.incomeAmount}
        percentChange={data.incomeChange}
        icon={TrendingUp}
        variant="default"
        dateRange={dateRangeLabel}
      />
      <DataCard
        title="Expenses"
        value={data.expensesAmount}
        percentChange={data.expensesChange}
        icon={TrendingDown}
        variant="default"
        dateRange={dateRangeLabel}
      />
    </div>
  );
};

export default DataGrid;