import type { Metadata } from "next";
import { Fira_Code, Outfit } from "next/font/google";
import { LangProvider } from "@/components/LangProvider";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CKA Quest",
  description: "Interactive CKA training platform with persistent sessions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${firaCode.variable}`}>
      <body><LangProvider>{children}</LangProvider></body>
    </html>
  );
}
