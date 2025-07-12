"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";

const menuItems = [
 { icon: "/images/icon/graph.png", label: "Dashboard", active: true },
 { icon: "/images/icon/book.png", label: "Billing" },
 {
  icon: "/images/icon/profile.png",
  label: "Formations",
  href: "/dashboard/formation",
 },
 {
  icon: "/images/icon/people.png",
  label: "Students",
  href: "/dashboard/students",
 },
 {
  icon: "/images/icon/people.png",
  label: "Users",
  href: "/dashboard/users",
 },
 { icon: "/images/icon/document-text.png", label: "Enrolment" },
 { icon: "/images/icon/setting-2.png", label: "Settings" },
];

export const Sidebar = () => {
 return (
  <aside className="w-80 rounded-2xl sticky top-0 h-screen  bg-white ">
   <div className="p-4 flex items-center justify-center">
    <Image
     src="/images/educate-logo.svg"
     alt="Logo"
     width={180}
     height={100}
     className="object-contain"
    />
   </div>
   <nav
    style={{ fontFamily: "General Sans, sans-serif" }}
    className="p-4 space-y-3"
   >
    {menuItems.map((item) => (
     <MenuItem key={item.label} {...item} />
    ))}
    <div className="mx-auto w-40">
     <Button className=" bg-blue-950 group hover:bg-blue-900 text-white flex absolute bottom-0 w-40 items-center justify-center !self-center rounded-full mx-auto space-x-2 py-3 ">
      <LogOut className="w-4 h-4 group-hover:-ms-2 transition-all duration-500 rotate-180" />
      <span className="font-medium">LOGOUT</span>
     </Button>
    </div>
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
