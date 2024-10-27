"use client"; // Mark the component as client-side
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "../provider";
import { AppbarClient } from "../components/AppbarClient";
import { usePathname } from "next/navigation"; // Import usePathname

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Wallet",
//   description: "Simple wallet app",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const pathname = usePathname(); // Get the current pathname

  return (
    <html lang="en">
      <Providers>
        <body className={inter.className}>
          <div className="min-w-screen min-h-screen bg-[#ebe6e6]">
            {/* Render AppbarClient only if not on the landing page */}
            {pathname !== "/landing" && <AppbarClient />}
            {children}
          </div>
        </body>
      </Providers>
    </html>
  );
}
