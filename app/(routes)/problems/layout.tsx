"use client";

import Navbar from "@/components/navbar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export default function DashboardLayout({
    children,
} : { children : React.ReactNode }) {
    const [queryClient] = useState(() => new QueryClient());
    return (
        <QueryClientProvider client={queryClient}>
            <main className="min-h-screen flex flex-col container max-w-7xl mx-auto px-28">
                <Navbar />
                {children}
            </main>
        </QueryClientProvider>
    )
}