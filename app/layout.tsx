import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner"; // <-- import Toaster here

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
 title: "Wane Facturation - Student Management System",
 description: "Manage Your Students And Their Activities With Ease.",
};

export default function RootLayout({
 children,
}: {
 children: React.ReactNode;
}) {
 return (
  <html lang="en">
   <body className={inter.className}>
    <main className="bg-gray-50">{children}</main>
    <Toaster position="top-right" richColors /> {/* Add Toaster here */}
   </body>
  </html>
 );
}
