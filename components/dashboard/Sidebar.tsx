"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";

const menuItems = [
 { icon: "/images/icon/graph.png", label: "Dashboard", active: true },
 { icon: "/images/icon/book.png", label: "Billing" },
 { icon: "/images/icon/profile.png", label: "Formations" },
 {
  icon: "/images/icon/people.png",
  label: "Students",
  href: "/dashboard/students",
 },
 { icon: "/images/icon/document-text.png", label: "Enrolment" },
 { icon: "/images/icon/setting-2.png", label: "Settings" },
];

export const Sidebar = () => {
 return (
  <aside className="w-80 rounded-2xl relative bg-white ">
   <div className="space-y-2 text-center">
    <img src="/images/_logo.png" alt="Company Logo" className="h-24 mx-auto" />
   </div>
   <nav className="p-4 space-y-3">
    {menuItems.map((item) => (
     <MenuItem key={item.label} {...item} />
    ))}
    <Button className=" bg-blue-950 hover:bg-blue-900 text-white flex absolute bottom-0 w-40 items-center justify-center rounded-full mx-auto space-x-2 py-3 ">
     <LogOut className="w-4 h-4" />
     <span className="font-medium">LOGOUT</span>
    </Button>
   </nav>
  </aside>
 );
};

type MenuItemProps = {
 icon: string;
 label: string;
 active?: boolean;
 href?: string;
};

const MenuItem = ({
 icon,
 label,
 active = false,
 href = "#",
}: MenuItemProps) => {
 const content = (
  <div
   className={`flex items-center space-x-3 px-4 py-3 rounded-lg ${
    active ? "bg-[#eeffe0]" : "text-gray-700 hover:bg-gray-100"
   }`}
  >
   <Image
    src={icon}
    alt={label}
    width={20}
    height={20}
    className="object-contain"
   />
   <span className={active ? "font-bold" : ""}>{label}</span>
  </div>
 );

 return href ? (
  <Link href={href} className="block">
   {content}
  </Link>
 ) : (
  <button className="w-full text-left">{content}</button>
 );
};
