'use client';

import Image from 'next/image';
import Link from 'next/link';

import { usePathname } from 'next/navigation';
import useUserStore from '@/store/userStore';
// React icon imports
import { MdDashboard } from 'react-icons/md';
import { MdOutlineCleaningServices } from 'react-icons/md';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { MdAddToPhotos } from 'react-icons/md';
import { PiUsersThreeFill } from 'react-icons/pi';
import ProfileAvatar from '../molecules/Avatar';

export const navLinks = [
  {
    name: 'Dashboard',
    icon: <MdDashboard size={24} />,
    path: '/dashboard',
    role: ['provider', 'admin']
  },
  {
    name: 'Myservices',
    icon: <MdOutlineCleaningServices size={24} />,

    path: '/dashboard/my-services',
    role: ['provider', 'admin']
  },
  {
    name: 'Appointments',
    icon: <FaRegCalendarAlt size={24} />,

    path: '/dashboard/appointments',
    role: ['provider', 'user', 'admin']
  },
  {
    name: 'Add Service',
    icon: <MdAddToPhotos size={24} />,

    path: '/dashboard/add-service',
    role: ['provider', 'admin']
  }

  // {
  //   name: 'Users',
  //   icon: <PiUsersThreeFill size={24} />,

  //   path: '/dashboard/users',
  //   role: ['admin']
  // }
];

const SideBar = () => {
  const pathname = usePathname();
  const { user } = useUserStore();

  return (
    <div className="flex flex-col w-[15vw] bg-primarytheme h-screen shadow-md mobile:max-sm:hidden px-2">
      <Link href={'/'} className="self-center w-full flex pl-5">
        <Image src={'/whitelogo.png'} alt="homygig logo" width={160} height={80} />
      </Link>

      <div className="w-full mt-10  flex gap-3 flex-col flex-grow">
        {navLinks.map((link, i) => (
          <Link
            href={link.path}
            key={i}
            className={`flex items-center m:max-lg: ${link.role.includes(user.role) ? 'visible' : 'hidden'} ${link.role.length == 1 ? ' bg-transparent' : ''}   sm:max-lg:px-2  sm:max-lg:items-center  sm:max-lg:justify-center  sm:max-lg:py-4 rounded-sm
                        ${
                          pathname === link.path ? ' text-slate-800 pl-6' : ' text-white'
                        } gap-2  hover:text-slate-800 duration-300 hover:pl-6  border-slate-800 transition-all   px-4 py-2 `}
          >
            <p className="text-[500px]">{link.icon}</p>
            <span className="text-sm sm:max-lg:hidden">{link.name}</span>
          </Link>
        ))}
      </div>
      <Link
        href={'/dashboard/profile'}
        className="m-5 flex justify-start duration-300 items-center text-white gap-2 text-md"
      >
        <ProfileAvatar size={4} image={user.image} />
        <span className="sm:max-lg:hidden">{user.role}</span>
      </Link>
    </div>
  );
};

export default SideBar;
