"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, AlertCircle, CircleDollarSignIcon } from "lucide-react";
import { StatsCardProps } from "@/types/dashboard";

const statsData: StatsCardProps[] = [
 {
  title: "Total Students",
  value: "3,200",
  icon: <Users className="h-6 w-6 text-white" />,
  progress: 100,
  description: "All enrolled students",
  gradientFrom: "from-purple-500",
  gradientTo: "to-blue-600",
  decorationFrom: "from-purple-200",
  decorationTo: "to-blue-100",
  progressColor: "bg-blue-500",
 },
 {
  title: "Paid Students",
  value: "2,450",
  icon: <CircleDollarSignIcon className="h-6 w-6 text-white" />,
  progress: 76.5,
  description: "76.5% of total students",
  gradientFrom: "from-green-400",
  gradientTo: "to-green-400",
  decorationFrom: "from-green-100",
  decorationTo: "to-green-100",
  progressColor: "bg-green-400",
 },
 {
  title: "Unpaid Students",
  value: "750",
  icon: <AlertCircle className="h-6 w-6 text-white" />,
  progress: 23.5,
  description: "23.5% pending payment",
  gradientFrom: "from-red-500",
  gradientTo: "to-red-600",
  decorationFrom: "from-red-200",
  decorationTo: "to-red-100",
  progressColor: "bg-red-500",
 },
];

export const StatsCards = () => {
 return (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
   {statsData.map((stat, index) => (
    <StatsCard key={index} {...stat} />
   ))}
  </div>
 );
};

const StatsCard = ({
 title,
 value,
 icon,
 progress,
 description,
 gradientFrom,
 gradientTo,
 decorationFrom,
 decorationTo,
 progressColor,
}: StatsCardProps) => {
 return (
  <Card className="bg-white border-none shadow-none relative rounded-2xl h-full p0">
   {/* Corner decoration */}
   <div
    className={`absolute top-0 left-0 w-16 h-16 rounded-t-2xl bg-gradient-to-br ${decorationFrom} ${decorationTo} rounded-br-2xl -z-1`}
   ></div>

   <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
    <CardTitle className="text-base font-medium text-gray-700">
     {title}
    </CardTitle>
    <div
     className={`w-12 h-12 bg-gradient-to-br ${gradientFrom} ${gradientTo} rounded-xl flex items-center justify-center shadow-md`}
    >
     {icon}
    </div>
   </CardHeader>

   <CardContent className="pt-0">
    <div className="text-3xl font-bold text-gray-900 mb-2">{value}</div>

    {/* Progress Bar */}
    <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
     <div
      className={`h-2 rounded-full ${progressColor}`}
      style={{ width: `${progress}%` }}
     ></div>
    </div>

    <p className="text-sm md:text-base text-gray-600">{description}</p>
   </CardContent>
  </Card>
 );
};
