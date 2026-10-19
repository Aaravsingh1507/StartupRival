import { Suspense } from 'react';
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";
import { ToastProvider } from "@/lib/toast-context";
import { NotificationProvider } from "@/lib/notification-context";
import OfflineBanner from "@/components/OfflineBanner";
import MobileBottomNav from "@/components/MobileBottomNav";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "StartupRival — AI Market Gap Discovery for India",
  description: "Discover real business opportunities in India using AI-powered market research, local consumer signals, and competitor intelligence.",
  keywords: ["startup ideas India", "market gap finder", "business opportunities India", "startup validation"],
  manifest: "/manifest.json",
};

export const viewport = {
  themeColor: "#080808",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} h-full dark antialiased`}>
      <head>
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="min-h-full flex flex-col bg-[#080808] text-white selection:bg-white selection:text-black pb-16 md:pb-0">
        <AuthProvider>
          <ToastProvider>
            <NotificationProvider>
              <Suspense fallback={null}>
                <OfflineBanner />
              </Suspense>
              {children}
              <Suspense fallback={null}>
                <MobileBottomNav />
              </Suspense>
            </NotificationProvider>
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
