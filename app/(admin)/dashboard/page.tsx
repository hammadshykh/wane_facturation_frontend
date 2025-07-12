"use client";

import { StatsCards } from "@/components/dashboard/StatsCards";
import { StudentChart } from "@/components/dashboard/StudentCharts";

export default function Dashboard() {
 return (
  <div className="flex-1 py-6 space-y-4">
   <StatsCards />
   <StudentChart />
  </div>
 );
}
