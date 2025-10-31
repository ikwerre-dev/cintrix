import type { Metadata } from "next";
import type { Viewport } from "next";
import { Toaster } from 'sonner';
import "./globals.css";
import { Inter, Montserrat } from 'next/font/google'
import { Providers } from './providers'

const montserrat = Montserrat({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-montserrat',
});

export const metadata: Metadata = {
  title: "ClinTrix AI | Emergency Department Optimization",
  description: "Clinical management system for overcrowded Emergency Departments. AI-assisted triage, dynamic queueing, staffing suggestions, and transparent audit trails to reduce wait times and improve patient safety.",
  keywords: "emergency department, triage, queue management, staffing optimization, hospital operations, clinical management, responsible AI, audit trail, explainability",
  authors: [{ name: "ClinTrix AI" }],
  creator: "ClinTrix AI",
  publisher: "ClinTrix AI",
  applicationName: "ClinTrix AI",
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ClinTrix.ai",
    title: "ClinTrix AI | Emergency Department Optimization",
    description: "Clinical system for ED flow: AI triage, dynamic queueing, staffing insights, and responsible AI oversight.",
    siteName: "ClinTrix AI",
    images: [{
      url: "/og-image.png",
      width: 1200,
      height: 630,
      alt: "ClinTrix AI — Emergency Department Optimization"
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ClinTrix AI | Emergency Department Optimization",
    description: "AI-powered triage and resource optimization with human oversight and transparency.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#194dbe",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.className}`}>
        <Providers>
          <Toaster position="top-right" />
          {children}
         </Providers>
      </body>
    </html>
  );
}
