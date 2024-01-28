import Image from "next/image";
import Link from "next/link";

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
  return (
    <div className="w-[30vh] h-screen shadow-md bg-white">
      <Link
        href={"/"}
        className="self-center w-full flex items-center justify-center"
      >
        <Image
          src={"/logohomygig.png"}
          alt="homygig logo"
          width={110}
          height={60}
        />
      </Link>

      <div className="w-full mt-10 flex gap-5 flex-col">
        {links.map((link, i) => (
          <Link
            href={link.path}
            key={i}
            className="flex items-center gap-2 hover:border-l-4 hover:text-primarytheme delay-100 transition-all border-l-primarytheme  px-4 py-2 text-slate-500"
          >
            <p>{link.icon}</p>
            <span>{link.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
