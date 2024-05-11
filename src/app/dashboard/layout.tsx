"use client";
import SideBar from "@/components/organisms/SideBar";

// STORE IMPORT
import useUserStore from "@/store/userStore";
import NavBar from "@/components/organisms/NavBar";
import React, { useEffect, useState } from "react";
import Auth from "../auth/page";
import Loading from "./loading";
import { useRouter } from "next/navigation";

const Layout = ({ children }: { children: React.ReactNode }) => {
    const { user } = useUserStore();
    const [loading, setLoading] = useState(true);

    const router = useRouter();

    return (
        <div className="flex justify-between  fixed h-screen w-screen mobile:max-sm:h-full mobile:max-sm:overflow-y-scroll ">
            <SideBar />
            <div className="w-full">
                <NavBar onDashBoard />
                <div className="px-2 absolute w-[88vw] mobile:max-sm:w-full mobile:max-sm:px-4 h-[calc(100vh-52px)] mobile:max-sm:mt-[52px]  mobile:max-sm:h-full overflow-y-scroll 4">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Layout;
