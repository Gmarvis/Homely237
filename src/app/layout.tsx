import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "./nextToast";
import "react-toastify/dist/ReactToastify.min.css";
import ThemeProviders from "@/context/themeContext";
import VerifyUser from "./auth/(verifications)/VerifyUser";
import { EdgeStoreProvider } from "@/lib/edgestore";
import { Head } from "next/document";

export const metadata: Metadata = {
    title: "homygig",
    description: "the best home service provission listing application",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <Head>
                <link rel="manifest" href="/manifest.json" />
                <link rel="apple-touch-icon" href="/icon.png"></link>
                <meta name="theme-color" content="#fff" />
            </Head>
            {/* {
          >>>>>>>>>>>>>>THE APP THEME PROVIDER IS NO WORKING PROPERLY
          >>>>>>>>>>>>>>CUSTOMIZED COLORS WON'T CHANGE AS THEME MODE CHANGE
          } */}
            {/* <ThemeProviders> */}
            <EdgeStoreProvider>
                <VerifyUser>
                    <body className="">
                        <ToastContainer />
                        {children}
                    </body>
                </VerifyUser>
            </EdgeStoreProvider>

            {/* </ThemeProviders> */}
        </html>
    );
}
