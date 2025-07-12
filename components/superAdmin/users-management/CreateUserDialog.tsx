"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
 Dialog,
 DialogContent,
 DialogDescription,
 DialogHeader,
 DialogTitle,
 DialogTrigger,
} from "@/components/ui/dialog";
import {
 Form,
 FormControl,
 FormField,
 FormItem,
 FormLabel,
 FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
 Select,
 SelectContent,
 SelectTrigger,
 SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Plus } from "lucide-react";
import { createUserSchema, type CreateUserFormData } from "./validation";

export default function CreateUserDialog() {
 const [open, setOpen] = useState(false);
 const [showPassword, setShowPassword] = useState(false);
 const [isSubmitting, setIsSubmitting] = useState(false);

 const form = useForm<CreateUserFormData>({
  resolver: zodResolver(createUserSchema),
  defaultValues: {
   firstName: "",
   lastName: "",
   email: "",
   role: "Super Admin",
   password: "",
  },
 });

 const onSubmit = async (data: CreateUserFormData) => {
  setIsSubmitting(true);
  try {
   // Simulate API call
   await new Promise((resolve) => setTimeout(resolve, 1000));
   console.log("Creating user:", data);

   // Reset form and close dialog on success
   form.reset();
   setOpen(false);
  } catch (error) {
   console.error("Error creating user:", error);
  } finally {
   setIsSubmitting(false);
  }
 };

 const handleCancel = () => {
  form.reset();
  setOpen(false);
 };

 const watchedPassword = form.watch("password");
 const isPasswordValid =
  watchedPassword.length >= 8 && /\d/.test(watchedPassword);

 return (
  <Dialog open={open} onOpenChange={setOpen}>
   <DialogTrigger asChild>
    <Button className="bg-slate-800  font-bold hover:bg-slate-700 text-white">
     <Plus className="w-4 h-4 mr-2" />
     Create New User
    </Button>
   </DialogTrigger>
   <DialogContent className="sm:max-w-[800px] p-10 gap-0">
    <DialogHeader className="px-8 pt-8 pb-6">
     <DialogTitle className="text-3xl font-bold text-center text-gray-900">
      Add User
     </DialogTitle>
     <DialogDescription className="text-center text-gray-500 mt-2">
      Add and Save New User Information
     </DialogDescription>
    </DialogHeader>

    <Form {...form}>
     <form onSubmit={form.handleSubmit(onSubmit)} className="px-8 pb-8">
      <div className="space-y-6">
       {/* First Name and Last Name Row */}
       <div className="grid grid-cols-2 gap-4">
        <FormField
         control={form.control}
         name="firstName"
         render={({ field }) => (
          <FormItem>
           <FormLabel className="text-sm font-medium text-gray-700">
            First Name
           </FormLabel>
           <FormControl>
            <Input
             placeholder="Enter name"
             className="h-12 rounded-2xl border-gray-200 focus:border-blue-500 focus:ring-blue-500"
             {...field}
            />
           </FormControl>
           <FormMessage className="text-xs" />
          </FormItem>
         )}
        />
        <FormField
         control={form.control}
         name="lastName"
         render={({ field }) => (
          <FormItem>
           <FormLabel className="text-sm font-medium text-gray-700">
            Last Name
           </FormLabel>
           <FormControl>
            <Input
             placeholder="Enter last name"
             className="h-12 rounded-2xl border-gray-200 focus:border-blue-500 focus:ring-blue-500"
             {...field}
            />
           </FormControl>
           <FormMessage className="text-xs" />
          </FormItem>
         )}
        />
       </div>

       {/* Email Field */}
       <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
         <FormItem>
          <FormLabel className="text-sm font-medium text-gray-700">
           Email
          </FormLabel>
          <FormControl>
           <Input
            type="email"
            placeholder="sarah@school.edu"
            className="h-12 rounded-2xl border-gray-200 focus:border-blue-500 focus:ring-blue-500"
            {...field}
           />
          </FormControl>
          <FormMessage className="text-xs" />
         </FormItem>
        )}
       />

       {/* Role and Password Row */}
       <div className="grid grid-cols-2 gap-4">
        <FormField
         control={form.control}
         name="role"
         render={({ field }) => (
          <FormItem>
           <FormLabel className="text-sm font-medium text-gray-700">
            Role
           </FormLabel>
           <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
             <SelectTrigger
              defaultValue={field.value}
              className="h-12 rounded-2xl border-gray-200 focus:border-blue-500 focus:ring-blue-500"
             >
              {field.value}
             </SelectTrigger>
            </FormControl>
            <SelectContent>
             <div className="p-2">
              <RadioGroup
               value={field.value}
               onValueChange={field.onChange}
               className="space-y-3"
              >
               <div className="flex items-center space-x-3">
                <RadioGroupItem
                 value="Super Admin"
                 id="super-admin"
                 className="text-blue-600"
                />
                <Label
                 htmlFor="super-admin"
                 className="text-sm font-medium cursor-pointer"
                >
                 Super Admin
                </Label>
               </div>
               <div className="flex items-center space-x-3">
                <RadioGroupItem
                 value="Admin"
                 id="admin"
                 className="text-blue-600"
                />
                <Label
                 htmlFor="admin"
                 className="text-sm font-medium cursor-pointer"
                >
                 Admin
                </Label>
               </div>
               <div className="flex items-center space-x-3">
                <RadioGroupItem
                 value="Viewer"
                 id="viewer"
                 className="text-blue-600"
                />
                <Label
                 htmlFor="viewer"
                 className="text-sm font-medium cursor-pointer"
                >
                 Viewer
                </Label>
               </div>
              </RadioGroup>
             </div>
            </SelectContent>
           </Select>
           <FormMessage className="text-xs" />
          </FormItem>
         )}
        />
        <FormField
         control={form.control}
         name="password"
         render={({ field }) => (
          <FormItem>
           <FormLabel className="text-sm font-medium text-gray-700">
            Password
           </FormLabel>
           <FormControl>
            <div className="relative">
             <Input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              className="h-12 rounded-2xl border-gray-200 focus:border-blue-500 focus:ring-blue-500 pr-10"
              {...field}
             />
             <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
              onClick={() => setShowPassword(!showPassword)}
             >
              {showPassword ? (
               <EyeOff className="h-4 w-4 text-gray-400" />
              ) : (
               <Eye className="h-4 w-4 text-gray-400" />
              )}
             </Button>
            </div>
           </FormControl>
           <div className="mt-1">
            {form.formState.errors.password ? (
             <FormMessage className="text-xs" />
            ) : (
             <p
              className={`text-xs mt-1 ${
               isPasswordValid ? "text-green-500" : "text-gray-400"
              }`}
             >
              Minimum 8 characters, 1 number
             </p>
            )}
           </div>
          </FormItem>
         )}
        />
       </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4 mt-8">
       <Button
        type="button"
        variant="outline"
        onClick={handleCancel}
        disabled={isSubmitting}
        className="px-8 py-3 h-12  rounded-full border-gray-300 text-gray-700 hover:bg-gray-50 font-medium bg-transparent"
       >
        CANCEL
       </Button>
       <Button
        type="submit"
        disabled={isSubmitting}
        className="px-8 py-3 h-12 bg-blue-950 rounded-full hover:bg-blue-900 text-white font-medium disabled:opacity-50"
       >
        {isSubmitting ? "SAVING..." : "SAVE"}
       </Button>
      </div>
     </form>
    </Form>
   </DialogContent>
  </Dialog>
 );
}
