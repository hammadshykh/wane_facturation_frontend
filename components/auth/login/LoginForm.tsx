"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "../shared/PasswordInput";
import { RememberMeCheckbox } from "../shared/RemeberMeCheckbox";

interface LoginFormProps {
 onSuccess?: () => void;
}

export const LoginForm = ({ onSuccess }: LoginFormProps) => {
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
 const [rememberMe, setRememberMe] = useState(false);
 const [isLoading, setIsLoading] = useState(false);
 const router = useRouter();

 const handleSubmit = async (e: FormEvent) => {
  e.preventDefault();
  setIsLoading(true);

  try {
   const response = await fetch("http://localhost:5000/api/v1/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
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
  } finally {
   setIsLoading(false);
  }
 };

 const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
  setEmail(e.target.value);
 };

 const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
  setPassword(e.target.value);
 };

 const handleRememberMeChange = (checked: boolean) => {
  setRememberMe(checked);
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

   <form onSubmit={handleSubmit} className="space-y-6">
    {/* Email */}
    <div className="space-y-2">
     <Label htmlFor="email" className="text-gray-700 font-medium">
      Email
     </Label>
     <Input
      id="email"
      type="email"
      placeholder="Enter Email or phone number"
      value={email}
      onChange={handleEmailChange}
      className="h-12 border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-blue-500 w-full"
      required
      disabled={isLoading}
     />
    </div>

    {/* Password */}
    <PasswordInput
     value={password}
     onChange={handlePasswordChange}
     disabled={isLoading}
    />

    {/* Remember Me & Forgot Password */}
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-3 sm:space-y-0">
     <RememberMeCheckbox
      checked={rememberMe}
      onChange={handleRememberMeChange}
      disabled={isLoading}
     />
     <button
      type="button"
      onClick={() => router.push("/auth/forgot-password")}
      className="text-sm text-green-600 hover:text-green-700 font-medium transition-colors"
      disabled={isLoading}
     >
      Forgot password?
     </button>
    </div>

    {/* Submit */}
    <Button
     type="submit"
     className="w-full h-12 bg-blue-950 rounded-full hover:bg-blue-900 text-white font-medium transition-colors"
     disabled={isLoading}
    >
     {isLoading ? "Signing in..." : "SIGN IN"}
    </Button>
   </form>

   {/* Signup Link */}
   <div className="text-center text-sm text-gray-600">
    Do not have an account?{" "}
    <button
     type="button"
     onClick={() => router.push("/auth/signup")}
     className="text-green-600 hover:text-green-700 font-medium transition-colors"
     disabled={isLoading}
    >
     Create a Company Account
    </button>
   </div>
  </div>
 );
};
