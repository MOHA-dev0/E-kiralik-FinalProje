"use client";

import Navbar from "@/components/Navbar";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="font-work-sans">
      <ToastContainer />
      <SessionProvider>
        <Navbar />
        {children}
      </SessionProvider>
    </main>
  );
}
