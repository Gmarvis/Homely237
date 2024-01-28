import SideBar from "@/components/organisms/SideBar";
import { ReactNode } from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex bg-[#f1f1f1]">
      <SideBar />
      <div>{children}</div>
    </div>
  );
};

export default Layout;
