import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { Footer } from "@/components/layout/Footer";
import { LoadingScreen } from "@/components/layout/LoadingScreen";
import { Navbar } from "@/components/layout/Navbar";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { siteConfig } from "@/data/site";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Orbitron } from "next/font/google";
import "./globals.css";

const metadataBaseUrl = process.env.NEXT_PUBLIC_SITE_URL
  ? new URL(process.env.NEXT_PUBLIC_SITE_URL)
  : new URL("http://localhost:3000");

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: metadataBaseUrl,
  title: {
    default: `${siteConfig.name} | Gameplay Programmer · UE5 Developer`,
    template: `%s | ${siteConfig.name}`,
  },
  description:
    "Mohsin Baig — Unreal Engine 5 Gameplay Programmer specializing in AI behavior, FPS combat systems, simulation, Blueprint architecture, and C++ gameplay engineering.",
  keywords: [
    "Mohsin Baig",
    "Gameplay Programmer",
    "Unreal Engine 5",
    "Game Developer",
    "UE5",
    "AI Behavior Trees",
    "FPS Systems",
    "Combat Mechanics",
    "Blueprint Architecture",
    "C++ Game Development",
    "Epic Games",
    "Game Studio",
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.github }],
  applicationName: siteConfig.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${siteConfig.name} | Gameplay Programmer Portfolio`,
    description: siteConfig.summary,
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: siteConfig.name,
    images: [
      {
        url: "/images/projects/zombie-hunter.svg",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} portfolio preview`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Gameplay Programmer Portfolio`,
    description: siteConfig.summary,
    images: ["/images/projects/zombie-hunter.svg"],
  },
  icons: {
    icon: "/window.svg",
    shortcut: "/window.svg",
    apple: "/window.svg",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#050816",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${orbitron.variable} min-h-screen antialiased bg-[#050816] text-gray-100`}
      >
        <SmoothScrollProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[200] focus:rounded-lg focus:bg-cyan-500 focus:px-4 focus:py-2 focus:text-black"
          >
            Skip to main content
          </a>
          <LoadingScreen />
          <ScrollProgress />
          <Navbar />
          <main id="main-content">{children}</main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
