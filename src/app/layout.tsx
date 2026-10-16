import type { Metadata, Viewport } from "next";
import { Newsreader, The_Nautigal, Bricolage_Grotesque, DM_Mono } from "next/font/google";
import "./globals.css";
import { content } from "@/content";

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["300", "400", "500"],
  display: "swap",
});

const nautigal = The_Nautigal({
  variable: "--font-nautigal",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#f4f1eb",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: content.meta.title,
  description: content.meta.description,
  metadataBase: new URL("https://pipasa.portfolio.website"),
  icons: {
    icon: "/icon.svg",
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
      className={`${newsreader.variable} ${nautigal.variable} ${bricolage.variable} ${dmMono.variable}`}
    >
      <body className="min-h-screen bg-[#f4f1eb] text-[#1b1815] font-serif antialiased selection:bg-[#1c3a94] selection:text-white overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
