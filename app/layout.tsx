import AuthProvider from '@/components/AuthProvider';
import { GlobalProvider } from '@/contexts/GlobalContext';
import type { Metadata } from "next";
import { poppins } from '@/components/fonts';
import Navbar from '@/components/Navbar';
import Footer from "@/components/Footer";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@/assets/styles/globals.css'
import 'photoswipe/dist/photoswipe.css';

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
      <GlobalProvider>
        <html lang="en">
          <body className={ poppins.className }>
            <Navbar />
            <main>{ children }</main>
            <Footer />
            <ToastContainer />
          </body>
        </html>
      </GlobalProvider>
    </AuthProvider>
  );
}
