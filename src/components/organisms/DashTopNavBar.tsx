"use client";

import React from "react";
import BellBtn from "../atoms/BellBtn";
import Avatar from "react-avatar";
import Link from "next/link";
import Image from "next/image";

const DashTopNavBar = () => {
  return (
    <div className="w-full flex justify-between items-center bg-white shadow-md p-2">
      <h2 className="mobile:max-sm:hidden">Provider</h2>
      <Link href={"/"} className=" sm:hidden">
        <Image
          src={"/logohomygig.png"}
          alt="homygig logo"
          width={100}
          height={50}
        />
      </Link>

      <div className="flex gap-3 items-center">
        <BellBtn />
        <Avatar name="Foo Bar" size="30" round={true} />
      </div>
      {/* <h1>hello</h1> */}
    </div>
  );
};

export default DashTopNavBar;
