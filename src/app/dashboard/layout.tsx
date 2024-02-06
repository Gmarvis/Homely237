"use client";
import DashTopNavBar from "@/components/organisms/DashTopNavBar";
import SideBar from "@/components/organisms/SideBar";
import Auth from "../auth/page";
import { useState } from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(false);

  if (!user) {
    return <Auth />;
  }

  return (
    <div className="flex bg-[#f3f7fd] h-screen mobile:max-sm:h-full mobile:max-sm:overflow-y-scroll ">
      <SideBar />
      <div className="w-full">
        <DashTopNavBar />
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Layout;
