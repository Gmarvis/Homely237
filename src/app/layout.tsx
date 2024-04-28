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
    description: "Cameroon's best home service provision platform",
    manifest: "/manifest.json",
    icons: { apple: "/public/icon-512x512.png" },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
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
