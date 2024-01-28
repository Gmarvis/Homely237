"use client";

import Link from "next/link";
import React, { useState } from "react";
import SearchForm from "../molucles/SearchForm";
import Avatar from "react-avatar";
import BellBtn from "../atoms/BellBtn";

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
  return (
    <div className="flex justify-between shadow-md px-24 py-2 items-center mobile:max-sm:px-5">
      <div>
        <h3 className="font-bold text-[25px] mobile:max-sm:text-[12px] text-primarytheme">
          HOMY<span className="text-secondrytheme">GIGS</span>
        </h3>
      </div>
      <div className="sear mobile:max-sm:hidden">
        <SearchForm />
      </div>

      {!user ? (
        <div className="flex justify-center items-center gap-3">
          <Link className="text-xs" href={"dashboard"}>
            Dashboard
          </Link>
          <BellBtn />
          <Avatar name="Foo Bar" size="30" round={true} />
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
