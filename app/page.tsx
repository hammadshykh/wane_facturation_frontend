"use client";

// update tailwind css

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
 const router = useRouter();

 useEffect(() => {
  // Redirect to login page
  router.push("/login");
 }, [router]);

 return (
  <div className="min-h-screen flex items-center justify-center">
   <div className="text-center">
    <p className="text-gray-600">Redirecting to login...</p>
   </div>
  </div>
 );
}
