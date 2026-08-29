import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Manrope } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { Toaster } from "@/components/ui/sonner";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { ActivityNotification } from "@/components/booking/ActivityNotification";

// Phase 2: full SiteShell port — html/body shell, font loading, ThemeProvider/Toaster,
// Header/Footer. Phase 4: ChatWidget mounted globally below. Phase 5: ActivityNotification.

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "[BUSINESS_NAME] | [BUSINESS_DESCRIPTOR]",
  description:
    "[BUSINESS_DESCRIPTOR] — professional services for homes and businesses. Replace this description before launch.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={manrope.variable}>
      <body className="pb-16 xl:pb-0">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[60] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground focus:outline-none"
        >
          Skip to content
        </a>
        <ThemeProvider>
          <Header />
          <div id="main-content">{children}</div>
          <Footer />
          <ChatWidget />
          <ActivityNotification />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
