'use client';
import SideBar from '@/core/components/organisms/SideBar';

import Loading from './loading';
import useUserStore from '@/store/userStore';
import { Navbar } from '@/core/components/organisms';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    if (!user?.id) {
      router.push('/');
    }
  }, []);

  if (!user?.id) {
    return <Loading full />;
  }

  return (
    <div className="flex justify-between  fixed h-screen w-screen mobile:max-sm:h-full mobile:max-sm:overflow-y-scroll ">
      <SideBar />
      <main className="w-full">
        <Navbar onDashBoard />
        <div className="px-2 items-center  absolute w-[88vw] mobile:max-sm:w-full mobile:max-sm:px-4 h-[calc(100vh-52px)] mobile:max-sm:mt-[52px]  mobile:max-sm:h-full overflow-y-scroll">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
