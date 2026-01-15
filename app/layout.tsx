import type { Metadata } from "next";
import { DM_Sans, Bitcount_Grid_Double, Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import QueryProvider from "@/lib/provider/query-provider";
import Script from "next/script";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const bitcountGridDouble = Bitcount_Grid_Double({
  variable: "--font-bitcount-grid-double",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
})

export const metadata: Metadata = {
  title: "CodeCoach",
  description: "Your Personal Codeforces Problem Solving Companion",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} ${bitcountGridDouble.variable} ${poppins.variable} bg-black antialiased`}>
        <Script
          src="https://cloud.umami.is/script.js"
          data-website-id="9d02b89c-8556-4e80-ae9d-78714df83757"
          strategy="afterInteractive"
        />
        <QueryProvider>
          {children}
          <Toaster />
        </QueryProvider>
      </body>
    </html>
  );
}
