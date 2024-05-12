import AuthProvider from '@/components/AuthProvider';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from '@/components/Navbar';
import Footer from "@/components/Footer";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@/assets/styles/globals.css'

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
    <AuthProvider>
      <html lang="en">
        <body className={ inter.className }>
          <Navbar />
          <main>{ children }</main>
          <Footer />
          <ToastContainer />
        </body>
      </html>
    </AuthProvider>
  );
}
