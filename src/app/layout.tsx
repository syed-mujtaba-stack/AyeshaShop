import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Providers } from "@/components/common/Providers";
import { LoaderWrapper } from "@/components/common/LoaderWrapper";
import { Navbar } from "@/components/layout/Navbar";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { PageTransition } from "@/components/common/PageTransition";
import { PWAInstall } from "@/components/common/PWAInstall";
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
      <head>
        <link rel="preload" as="image" href="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1440&q=80" />
        <link rel="preload" as="image" href="https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=1440&q=80" />
        <link rel="preload" as="image" href="https://images.unsplash.com/photo-1445205170230-053b83016050?w=1440&q=80" />
        <link rel="preconnect" href="https://images.unsplash.com" />
      </head>
      <body className="min-h-screen bg-off-white antialiased" suppressHydrationWarning>
        <Script id="sw-register" strategy="afterInteractive">
          {`if("serviceWorker" in navigator){window.addEventListener("load",function(){navigator.serviceWorker.register("/sw.js")})}`}
        </Script>
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
            <PWAInstall />
          </LoaderWrapper>
        </Providers>
      </body>
    </html>
  );
}
