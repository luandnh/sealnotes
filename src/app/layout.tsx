import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import { env } from "@/env"; 

console.log("Environment Variables:", env);

export const metadata: Metadata = {
  title: env.PAGE_TITLE,
  description: env.PAGE_DESCRIPTION,
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  keywords: [
    "encrypted notepad",
    "secure note-taking",
    "private notes",
    "open-source notepad",
    "rich text editing",
    "offline note-taking",
    "no login required",
    "free notepad app",
    "privacy-focused notes",
    "secure writing tool"
  ],
};


export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
