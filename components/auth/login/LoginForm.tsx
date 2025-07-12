"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
 Form,
 FormControl,
 FormField,
 FormItem,
 FormLabel,
 FormMessage,
} from "@/components/ui/form";
import { PasswordInput } from "../shared/PasswordInput";
import { Input } from "@/components/ui/input";
import { RememberMeCheckbox } from "../shared/RemeberMeCheckbox";

const formSchema = z.object({
 email: z.string().email("Please enter a valid email address"),
 password: z.string().min(6, "Password must be at least 6 characters"),
 rememberMe: z.boolean().default(false),
});

type FormValues = z.infer<typeof formSchema>;

interface LoginFormProps {
 onSuccess?: () => void;
}

export const LoginForm = ({ onSuccess }: LoginFormProps) => {
 const router = useRouter();
 const form = useForm<FormValues>({
  resolver: zodResolver(formSchema),
  defaultValues: {
   email: "",
   password: "",
   rememberMe: false,
  },
 });

 const onSubmit = async (values: FormValues) => {
  try {
   const response = await fetch("http://localhost:5000/api/v1/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
     email: values.email,
     password: values.password,
    }),
   });

   const result = await response.json();

   if (result.success) {
    toast.success("✅ Login successful");
    onSuccess?.();
    router.push("/dashboard");
   } else {
    toast.error(`❌ ${result.error || "Invalid email or password"}`);
   }
  } catch (error) {
   toast.error("❌ Server error. Please try again later.");
   console.error("Login error:", error);
  }
 };

 return (
  <div className="w-full max-w-lg space-y-8">
   <div className="py-6 text-center">
    <Image
     src="/images/logo_text.png"
     alt="Company Logo"
     className="h-22 mx-auto"
     width={200}
     height={80}
     priority
    />
   </div>

   <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
     {/* Email */}
     <FormField
      control={form.control}
      name="email"
      render={({ field }) => (
       <FormItem>
        <FormLabel className="text-gray-700 font-medium">Email</FormLabel>
        <FormControl>
         <Input
          placeholder="Enter Email or phone number"
          className="h-12 border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-blue-500 w-full"
          disabled={form.formState.isSubmitting}
          {...field}
         />
        </FormControl>
        <FormMessage />
       </FormItem>
      )}
     />

     {/* Password */}
     <FormField
      control={form.control}
      name="password"
      render={({ field }) => (
       <FormItem>
        <FormLabel className="text-gray-700 font-medium">Password</FormLabel>
        <FormControl>
         <PasswordInput
          placeholder="Enter your password"
          disabled={form.formState.isSubmitting}
          {...field}
         />
        </FormControl>
        <FormMessage />
       </FormItem>
      )}
     />

     {/* Remember Me & Forgot Password */}
     <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-3 sm:space-y-0">
      <FormField
       control={form.control}
       name="rememberMe"
       render={({ field }) => (
        <RememberMeCheckbox
         checked={field.value}
         onChange={field.onChange}
         disabled={form.formState.isSubmitting}
        />
       )}
      />
      <button
       type="button"
       onClick={() => router.push("/auth/forgot-password")}
       className="text-sm text-green-600 hover:text-green-700 font-medium transition-colors"
       disabled={form.formState.isSubmitting}
      >
       Forgot password?
      </button>
     </div>

     {/* Submit */}
     <Button
      type="submit"
      className="w-full h-12 bg-blue-950 rounded-full hover:bg-blue-900 text-white font-medium transition-colors"
      disabled={form.formState.isSubmitting}
     >
      {form.formState.isSubmitting ? "Signing in..." : "SIGN IN"}
     </Button>
    </form>
   </Form>

   {/* Signup Link */}
   <div className="text-center text-sm text-gray-600">
    Do not have an account?{" "}
    <button
     type="button"
     onClick={() => router.push("/auth/signup")}
     className="text-green-600 hover:text-green-700 font-medium transition-colors"
     disabled={form.formState.isSubmitting}
    >
     Create a Company Account
    </button>
   </div>
  </div>
 );
};
