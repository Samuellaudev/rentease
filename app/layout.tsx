import type { Metadata } from "next";
import { Inter } from "next/font/google";
import '@/assets/styles/globals.css'
import Navbar from '@/components/Navbar';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RentEase",
  description: "RentEase streamlines property rentals, making it effortless for all."
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={ inter.className }>
        <Navbar />
        <main>{ children }</main>
      </body>
    </html>
  );
}
