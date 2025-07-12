"use client";

import { Search, Bell, Settings, Mail, MessageSquare } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
 DropdownMenu,
 DropdownMenuContent,
 DropdownMenuItem,
 DropdownMenuLabel,
 DropdownMenuSeparator,
 DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Header = () => {
 return (
  <header className="bg-white border-b px-6 rounded-2xl sticky top-0 z-10">
   <div className="flex justify-between items-center">
    <h3   style={{ fontFamily: 'General Sans, sans-serif' }} className="text-xl font-bold text-gray-900">Dashboard</h3>
    <div className="flex items-center gap-4">
     {/* Search Bar */}
     <div className="relative">
      <Search className="absolute left-3 top-2.5 text-gray-400 h-4 w-4" />
      <Input
       placeholder="Search"
       className="pl-10 w-72  h-10 text-sm bg-gray-50 border-none rounded-2xl focus:border-blue-500 focus:ring-blue-500"
      />
     </div>

     {/* Notifications Dropdown */}
     <DropdownMenu>
      <DropdownMenuTrigger asChild>
       <Button
        variant="ghost"
        size="icon"
        className="relative outline-none rounded-full bg-gray-50 hover:bg-gray-100"
       >
        <Bell className="text-gray-600 h-5 w-5" />
        <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full" />
       </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 !rounded-2xl">
       <DropdownMenuLabel style={{ fontFamily: 'General Sans, sans-serif' }}>Notifications</DropdownMenuLabel>
       <DropdownMenuSeparator />
       <DropdownMenuItem>
        <div className="flex flex-col space-y-1">
         <p style={{ fontFamily: 'General Sans, sans-serif' }} className="text-sm font-medium">New student enrolled</p>
         <p style={{ fontFamily: 'General Sans, sans-serif' }} className="text-xs text-gray-500">
          John Doe has enrolled in Mathematics course
         </p>
        </div>
       </DropdownMenuItem>
       <DropdownMenuItem>
        <div className="flex flex-col space-y-1">
         <p style={{ fontFamily: 'General Sans, sans-serif' }} className="text-sm font-medium">Payment received</p>
         <p style={{ fontFamily: 'General Sans, sans-serif' }} className="text-xs text-gray-500">
          Payment of $500 received from Sarah Wilson
         </p>
        </div>
       </DropdownMenuItem>
       <DropdownMenuItem>
        <div className="flex flex-col space-y-1">
         <p style={{ fontFamily: 'General Sans, sans-serif' }} className="text-sm font-medium">Course completion</p>
         <p style={{ fontFamily: 'General Sans, sans-serif' }} className="text-xs text-gray-500">
          5 students completed Physics course
         </p>
        </div>
       </DropdownMenuItem>
      </DropdownMenuContent>
     </DropdownMenu>

     {/* Messages Dropdown */}
     <DropdownMenu>
      <DropdownMenuTrigger asChild>
       <Button
        variant="ghost"
        size="icon"
        className="relative  outline-none rounded-full bg-gray-50 hover:bg-gray-100"
       >
        <Mail className="text-gray-600 h-5 w-5" />
        <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-blue-500 rounded-full" />
       </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 !rounded-2xl">
       <DropdownMenuLabel style={{ fontFamily: 'General Sans, sans-serif' }}>Messages</DropdownMenuLabel>
       <DropdownMenuSeparator />
       <DropdownMenuItem>
        <div className="flex items-start space-x-3">
         <div className="bg-blue-100 p-2 rounded-full">
          <MessageSquare className="h-4 w-4 text-blue-600" />
         </div>
         <div className="flex-1">
          <p style={{ fontFamily: 'General Sans, sans-serif' }} className="text-sm font-medium">New message from John</p>
          <p style={{ fontFamily: 'General Sans, sans-serif' }} className="text-xs text-gray-500 truncate">
           Hi there, I have a question about the course material...
          </p>
         </div>
         <span style={{ fontFamily: 'General Sans, sans-serif' }} className="text-xs text-gray-400">2h ago</span>
        </div>
       </DropdownMenuItem>
       <DropdownMenuItem>
        <div className="flex items-start space-x-3">
         <div className="bg-green-100 p-2 rounded-full">
          <MessageSquare className="h-4 w-4 text-green-600" />
         </div>
         <div className="flex-1">
          <p style={{ fontFamily: 'General Sans, sans-serif' }} className="text-sm font-medium">Course update</p>
          <p style={{ fontFamily: 'General Sans, sans-serif' }} className="text-xs text-gray-500 truncate">
           New content added to Module 3 of your course
          </p>
         </div>
         <span style={{ fontFamily: 'General Sans, sans-serif' }} className="text-xs text-gray-400">1d ago</span>
        </div>
       </DropdownMenuItem>
       <DropdownMenuItem>
        <div className="flex items-start space-x-3">
         <div className="bg-purple-100 p-2 rounded-full">
          <MessageSquare className="h-4 w-4 text-purple-600" />
         </div>
         <div className="flex-1">
          <p style={{ fontFamily: 'General Sans, sans-serif' }} className="text-sm font-medium">Support request</p>
          <p style={{ fontFamily: 'General Sans, sans-serif' }} className="text-xs text-gray-500 truncate">
           Your support ticket has been resolved
          </p>
         </div>
         <span style={{ fontFamily: 'General Sans, sans-serif' }} className="text-xs text-gray-400">3d ago</span>
        </div>
       </DropdownMenuItem>
       <DropdownMenuSeparator />
       <DropdownMenuItem style={{ fontFamily: 'General Sans, sans-serif' }} className="text-center justify-center text-blue-600 hover:text-blue-700">
        View all messages
       </DropdownMenuItem>
      </DropdownMenuContent>
     </DropdownMenu>

     {/* Settings Dropdown */}
     <DropdownMenu>
      <DropdownMenuTrigger asChild>
       <Button
        variant="ghost"
        size="icon"
        className="rounded-full  outline-none bg-gray-50 hover:bg-gray-100"
       >
        <Settings className="text-gray-600 h-5 w-5" />
       </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-60 !rounded-2xl">
       <DropdownMenuLabel style={{ fontFamily: 'General Sans, sans-serif' }}>Settings</DropdownMenuLabel>
       <DropdownMenuSeparator />
       <DropdownMenuItem style={{ fontFamily: 'General Sans, sans-serif' }}>Profile Settings</DropdownMenuItem>
       <DropdownMenuItem style={{ fontFamily: 'General Sans, sans-serif' }} >Account Preferences</DropdownMenuItem>
       <DropdownMenuItem style={{ fontFamily: 'General Sans, sans-serif' }}>Notification Settings</DropdownMenuItem>
       <DropdownMenuSeparator />
       <DropdownMenuItem style={{ fontFamily: 'General Sans, sans-serif' }}>Help & Support</DropdownMenuItem>
      </DropdownMenuContent>
     </DropdownMenu>

     {/* User Avatar Dropdown */}
     <DropdownMenu>
      <DropdownMenuTrigger asChild>
       <Avatar className="h-10 w-10 ring-2 ring-gray-200 cursor-pointer hover:ring-blue-300 transition-all">
        <AvatarImage src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg" />
        <AvatarFallback className="bg-orange-500 text-white font-medium" style={{ fontFamily: 'General Sans, sans-serif' }}>
         SA
        </AvatarFallback>
       </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-60 !rounded-2xl">
       <DropdownMenuLabel style={{ fontFamily: 'General Sans, sans-serif' }}>My Account</DropdownMenuLabel>
       <DropdownMenuSeparator />
       <DropdownMenuItem style={{ fontFamily: 'General Sans, sans-serif' }}>Profile</DropdownMenuItem>
       <DropdownMenuItem style={{ fontFamily: 'General Sans, sans-serif' }}>Billing</DropdownMenuItem>
       <DropdownMenuItem style={{ fontFamily: 'General Sans, sans-serif' }}>Team</DropdownMenuItem>
       <DropdownMenuItem style={{ fontFamily: 'General Sans, sans-serif' }}>Subscription</DropdownMenuItem>
       <DropdownMenuSeparator />
       <DropdownMenuItem style={{ fontFamily: 'General Sans, sans-serif' }}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
     </DropdownMenu>
    </div>
   </div>
  </header>
 );
};
