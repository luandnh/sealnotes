import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";

import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "SealNotes",
  description: "Lightweight Encrypted Notepad",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <ThemeProvider defaultTheme="system">
        {children}
        <Toaster />
        </ThemeProvider>    
      </body>
    </html>
  );
}
