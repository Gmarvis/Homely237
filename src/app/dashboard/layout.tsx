"use client";
import DashTopNavBar from "@/components/organisms/DashTopNavBar";
import SideBar from "@/components/organisms/SideBar";
import Auth from "../auth/page";
import { useState } from "react";

// STORE IMPORT
import useUserStore from "@/store/userStore";
import NavBar from "@/components/organisms/NavBar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUserStore();

  if (!user.id) {
    return <Auth />;
  }

  return (
    <div className="flex bg-[#f3f7fd] h-screen mobile:max-sm:h-full mobile:max-sm:overflow-y-scroll ">
      <SideBar />
      <div className="w-full">
        {/* <DashTopNavBar /> */}
        <NavBar onDashBoard />
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Layout;
