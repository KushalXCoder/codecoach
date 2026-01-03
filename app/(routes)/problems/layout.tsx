"use client";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export default function DashboardLayout({
    children,
} : { children : React.ReactNode }) {
    const [queryClient] = useState(() => new QueryClient());
    return (
        <QueryClientProvider client={queryClient}>
            <div className="min-h-screen flex flex-col w-full">
                <Navbar />
                <main className="flex-1 container max-w-7xl mx-auto px-28">
                    {children}
                </main>
                {/* <Footer /> */}
            </div>
        </QueryClientProvider>
    )
}