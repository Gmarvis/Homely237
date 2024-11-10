import React from 'react';
import type { Metadata } from 'next';
import './globals.css';
import 'react-toastify/dist/ReactToastify.min.css';
import SystemGard from './(site)/auth/(verifications)/SystemGard';
import { EdgeStoreProvider } from '@/core/lib/edgeStore/edgestore';
import { ToastContainer } from './(site)/nextToast';
// import { ThemeProvider } from "next-themes";

export const metadata: Metadata = {
  title: 'homygig',
  description: "Cameroon's best home service provision platform",
  manifest: '/manifest.json',
  icons: { apple: '/public/icon-512x512.png' }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      {/* {
          >>>>>>>>>>>>>>THE APP THEME PROVIDER IS NO WORKING PROPERLY
          >>>>>>>>>>>>>>CUSTOMIZED COLORS WON'T CHANGE AS THEME MODE CHANGE
          } */}
      {/* <ThemeProvider> */}
      <EdgeStoreProvider>
        <SystemGard>
          <body className="">
            <ToastContainer hideProgressBar={false} newestOnTop={false} closeOnClick />
            {children}
          </body>
        </SystemGard>
      </EdgeStoreProvider>
      {/* </ThemeProvider> */}
    </html>
  );
}
