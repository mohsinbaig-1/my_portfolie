import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Footer } from "@/components/layout/Footer";
import { LoadingScreen } from "@/components/layout/LoadingScreen";
import { Navbar } from "@/components/layout/Navbar";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { siteConfig } from "@/data/site";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} | UE5 Game Developer Portfolio`,
    template: `%s | ${siteConfig.name}`,
  },
  description:
    "Mohsin Baig — Software Engineering student and Unreal Engine 5 developer specializing in FPS games, vehicle simulation, and internship-ready gameplay systems.",
  keywords: [
    "Mohsin Baig",
    "Unreal Engine 5",
    "Game Developer",
    "Software Engineering",
    "Portfolio",
    "FPS",
    "Simulation",
    "Internship",
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.github }],
  openGraph: {
    title: `${siteConfig.name} | UE5 Developer Portfolio`,
    description: siteConfig.summary,
    type: "website",
    locale: "en_US",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen antialiased bg-[#050816] text-gray-100`}
      >
        <ThemeProvider>
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
        </ThemeProvider>
      </body>
    </html>
  );
}
