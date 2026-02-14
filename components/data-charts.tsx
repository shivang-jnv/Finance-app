"use client";

import { Chart, ChartLoading } from "@/components/chart";
import { SpendingPie, SpendingPieLoading } from "@/components/spending-pie";

interface DataChartsProps {
  data?: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    days: any[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    categories: any[];
  }
}

const DataCharts = ({ data }: DataChartsProps) => {
  if (!data)
    return (
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">
        <div className="col-span-1 lg:col-span-3 xl:col-span-4">
          <ChartLoading />
        </div>
        <div className="col-span-1 lg:col-span-3 xl:col-span-2">
          <SpendingPieLoading />
        </div>
      </div>
    );
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">
      <div className="col-span-1 lg:col-span-3 xl:col-span-4">
        <Chart data={data.days} />
      </div>
      <div className="col-span-1 lg:col-span-3 xl:col-span-2">
        <SpendingPie data={data.categories} />
      </div>
    </div>
  );
};

export default DataCharts;