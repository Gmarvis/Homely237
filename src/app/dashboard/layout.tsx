"use client";
import SideBar from "@/components/organisms/SideBar";
import { useRouter } from "next/navigation";

// STORE IMPORT
import useUserStore from "@/store/userStore";
import NavBar from "@/components/organisms/NavBar";
import React from "react";
import Auth from "../auth/page";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUserStore();

  if (!user.id) {
    return <Auth />;
  }

  return (
    <div className="flex bg-[#f3f7fd] h-screen mobile:max-sm:h-full mobile:max-sm:overflow-y-scroll ">
      <SideBar />
      <div className="w-full">
        <NavBar onDashBoard />
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Layout;
