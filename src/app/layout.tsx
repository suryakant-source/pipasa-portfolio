import type { Metadata, Viewport } from "next";
import { Newsreader, Inter } from "next/font/google";
import "./globals.css";

const newsreader = Newsreader({
  variable: "--font-serif",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#F6F2EA",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "Sadhna Circle | Identity-Blind Builder Syndicate",
  description:
    "A seven-day, identity-blind builder circle for 36 engineering and business students. Real problems, verifiable evidence, and founder introductions for top builders.",
  keywords: [
    "Sadhna Circle",
    "builder syndicate",
    "identity-blind",
    "engineering students",
    "business students",
    "proof of work",
    "founder access",
    "cohort 1",
  ],
  authors: [{ name: "Sadhna Circle" }],
  creator: "Sadhna Circle",
  metadataBase: new URL("https://sadhna-circle.netlify.app"),
  alternates: {
    canonical: "https://sadhna-circle.netlify.app",
  },
  openGraph: {
    title: "Sadhna Circle | Prove what you can build. Not where you studied.",
    description:
      "A seven-day, identity-blind builder circle for 36 engineering and business students. Real problems, verifiable evidence, and founder introductions for top builders.",
    url: "https://sadhna-circle.netlify.app",
    siteName: "Sadhna Circle",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://sadhna-circle.netlify.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sadhna Circle",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sadhna Circle | Prove what you can build. Not where you studied.",
    description:
      "A seven-day, identity-blind builder circle for 36 engineering and business students. Real problems, verifiable evidence, and founder introductions for top builders.",
    creator: "@suryakant_notes",
    images: ["https://sadhna-circle.netlify.app/og-image.png"],
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${inter.variable} scroll-smooth`}
    >
      <body className="min-h-screen bg-[#F6F2EA] text-[#1A1A1A] antialiased">
        {children}
      </body>
    </html>
  );
}
