import DashTopNavBar from "@/components/organisms/DashTopNavBar";
import SideBar from "@/components/organisms/SideBar";

const Layout = ({ children }: { children: React.ReactNode }) => {
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
