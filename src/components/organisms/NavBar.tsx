"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import SearchForm from "../molucles/SearchForm";
import Avatar from "react-avatar";
import BellBtn from "../atoms/BellBtn";

import { motion } from "framer-motion";
import DropDown from "../molucles/DropDown";
import { useTheme } from "next-themes";
import ToggleThemeBtn from "../atoms/ToggleThemeBtn";

const navLinks = [
  {
    name: "appointments",
    path: "/dashboard/appointments",
  },
  {
    name: "dashboard",
    path: "/dashboard/appointments",
  },
  {
    name: "appointments",
    path: "/dashboard/appointments",
  },
  {
    name: "appointments",
    path: "/dashboard/appointments",
  },
];

const NavBar = () => {
  const [user, setUser] = useState(null);
  const [showNotifiaction, setShowNotification] = useState(false);

  return (
    <div className="flex justify-between shadow-md px-24 py-2 items-center mobile:max-sm:px-5 relative">
      <div>
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
      </div>
      <div className="sear mobile:max-sm:hidden">
        <SearchForm />
      </div>

      {!user ? (
        <div className="flex justify-center items-center gap-3">
          <Link className="text-xs" href={"dashboard"}>
            Dashboard
          </Link>
          <BellBtn onClick={() => setShowNotification((prev) => !prev)} />
          <ToggleThemeBtn />
          <Avatar name="Foo Bar" size="30" round={true} />

          {showNotifiaction && (
            <motion.div
              initial={{ opacity: 0, translateY: -20 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute top-[57px] right-2"
            >
              <DropDown
                title={"Notifications"}
                onBlur={() => setShowNotification((prev) => !prev)}
                className="w-[20vw]"
              >
                <h3>fist notification</h3>
              </DropDown>
            </motion.div>
          )}
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <Link href={"/auth"} className="bg-primarytheme text-white px-5 py-1">
            Get Started
          </Link>
        </div>
      )}
    </div>
  );
};

export default NavBar;
