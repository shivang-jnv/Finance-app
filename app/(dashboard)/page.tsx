import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { getSummary } from "@/features/summary/queries";
import DataCharts from "@/components/data-charts";
import DataGrid from "@/components/data-grid";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: { from?: string; to?: string; accountId?: string };
}) {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const summary = await getSummary(user.id, searchParams.from, searchParams.to, searchParams.accountId);

  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <DataGrid data={summary} />
      <DataCharts data={summary} />
    </div>
  );
}