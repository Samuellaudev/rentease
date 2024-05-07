import type { Metadata } from "next";
import { Inter } from "next/font/google";
import '@/assets/styles/globals.css'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rent Ease",
  description: "Rent Ease streamlines property rentals, making it effortless for all."
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={ inter.className }>
        <main>{ children }</main>
      </body>
    </html>
  );
}
