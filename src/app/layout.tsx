import type { Metadata, Viewport } from "next";
import { Providers } from "@/components/common/Providers";
import { LoaderWrapper } from "@/components/common/LoaderWrapper";
import { Navbar } from "@/components/layout/Navbar";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { PageTransition } from "@/components/common/PageTransition";
import { SITE_NAME, SITE_DESCRIPTION } from "@/constants";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#b8860b",
};

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} — Luxury Women's Fashion`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: ["luxury fashion", "women's clothing", "designer bags", "fine jewelry", "Pakistani fashion"],
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: SITE_NAME,
  },
  openGraph: {
    title: `${SITE_NAME} — Luxury Women's Fashion`,
    description: SITE_DESCRIPTION,
    siteName: SITE_NAME,
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-off-white antialiased">
        <script
          dangerouslySetInnerHTML={{
            __html: `if("serviceWorker" in navigator){window.addEventListener("load",()=>{navigator.serviceWorker.register("/sw.js")})}`,
          }}
        />
        <Providers>
          <LoaderWrapper>
            {/* Sticky header container: announcement bar + navbar */}
            <div className="sticky top-0 z-50">
              <AnnouncementBar />
              <Navbar />
            </div>
            <PageTransition>
              <main className="min-h-screen">{children}</main>
            </PageTransition>
            <Footer />
            <MobileBottomNav />
          </LoaderWrapper>
        </Providers>
      </body>
    </html>
  );
}
