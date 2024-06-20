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
import { Button } from '../ui/button';

const links = [
    {
        name: 'Dashboard',
        icon: <MdDashboard size={24} />,
        path: '/dashboard',
        role: ['provider', 'admin']
    },
    {
        name: 'Myservices',
        icon: <MdOutlineCleaningServices size={24} />,

        path: '/dashboard/myservices',
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

        path: '/dashboard/addservice',
        role: ['provider', 'admin']
    }
];

const SideBar = () => {
    const pathname = usePathname();
    const { user } = useUserStore();

    return (
        <div className="w-[15vw] bg-primarytheme h-screen shadow-md mobile:max-sm:hidden px-2">
            <Link href={'/'} className="self-center w-full flex pl-5">
                <Image src={'/whitelogo.png'} alt="homygig logo" width={130} height={80} />
            </Link>

            <div className="w-full mt-10  flex gap-3 flex-col ">
                {links.map((link, i) => (
                    <Link
                        href={link.path}
                        key={i}
                        className={`flex items-center ${link.role.includes(user.role)? "visible" : "hidden"} bg-white rounded-md  sm:max-lg:px-2  sm:max-lg:items-center  sm:max-lg:justify-center  sm:max-lg:py-4 ${
                            pathname === link.path ? ' text-primarytheme' : 'text-slate-500'
                        } gap-2  hover:text-primarytheme delay-100 transition-all   px-4 py-2 `}>
                        <p className="text-[500px]">{link.icon}</p>
                        <span className="text-sm sm:max-lg:hidden">{link.name}</span>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default SideBar;
