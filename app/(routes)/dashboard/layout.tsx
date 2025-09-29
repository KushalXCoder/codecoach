"use client";

import Navbar from "@/components/navbar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export default function DashboardLayout({
    children,
} : { children : React.ReactNode }) {
    const [queryClient] = useState(() => new QueryClient());
    return (
        <div className=''>
            <Navbar />
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </div>
    )
}