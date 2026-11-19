import type { Metadata } from "next";
import { DM_Sans, Fraunces } from "next/font/google";
import Footer from "../components/ui/Footer";
import Header from "../components/ui/Header";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "Progetto Next.js",
  description: "Un progetto Next.js con Tailwind CSS e Supabase.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="it">
      <body className={`${fraunces.variable} ${dmSans.variable}`}>
        <Header />
        <div className="pt-20">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
