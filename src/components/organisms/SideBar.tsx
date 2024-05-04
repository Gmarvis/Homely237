"use client";

import Image from "next/image";
import Link from "next/link";

import { usePathname } from "next/navigation";

// React icon imports
import { MdDashboard } from "react-icons/md";
import { MdOutlineCleaningServices } from "react-icons/md";
import { FaRegCalendarAlt } from "react-icons/fa";
import { MdAddToPhotos } from "react-icons/md";

const links = [
    {
        name: "Dashboard",
        icon: <MdDashboard size={24} />,
        path: "/dashboard",
    },
    {
        name: "Myservices",
        icon: <MdOutlineCleaningServices size={24} />,

        path: "/dashboard/myservices",
    },
    {
        name: "Appointments",
        icon: <FaRegCalendarAlt size={24} />,

        path: "/dashboard/appointments",
    },
    {
        name: "Add Service",
        icon: <MdAddToPhotos size={24} />,

        path: "/dashboard/addservice",
    },
];

const SideBar = () => {
    const pathname = usePathname();

    return (
        <>
            <div className="w-[15vw] bg-primarytheme h-screen shadow-md mobile:max-sm:hidden px-2">
                <Link href={"/"} className="self-center w-full flex pl-5">
                    <Image
                        src={"/whitelogo.png"}
                        alt="homygig logo"
                        width={130}
                        height={80}
                    />
                </Link>

                <div className="w-full mt-10  flex gap-3 flex-col ">
                    {links.map((link, i) => (
                        <Link
                            href={link.path}
                            key={i}
                            className={`flex items-center bg-white rounded-md  sm:max-lg:px-2  sm:max-lg:items-center  sm:max-lg:justify-center  sm:max-lg:py-4 ${
                                pathname === link.path
                                    ? " text-primarytheme"
                                    : "text-slate-500"
                            } gap-2  hover:text-primarytheme delay-100 transition-all   px-4 py-2 `}
                        >
                            <p className="text-[500px]">{link.icon}</p>
                            <span className="text-sm sm:max-lg:hidden">
                                {link.name}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
            {/* <div className="flex fixed bottom-0 w-screen justify-between bg-white shadow-md sm:hidden py-1">
                {links.map((link, i) => (
                    <Link
                        href={link.path}
                        key={i}
                        className={`flex flex-col items-center ${
                            pathname === link.path
                                ? " text-primarytheme"
                                : "text-slate-500"
                        } gap-2  hover:text-primarytheme delay-100 transition-all  px-1  `}
                    >
                        <p>{link.icon}</p>
                        <span className="text-xs">{link.name}</span>
                    </Link>
                ))}
            </div> */}
        </>
    );
};

export default SideBar;
