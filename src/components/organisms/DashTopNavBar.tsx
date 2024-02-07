"use client";

import React, { useState } from "react";
import BellBtn from "../atoms/BellBtn";
import Avatar from "react-avatar";
import Link from "next/link";
import Image from "next/image";
import DropDown from "../molucles/DropDown";

import { motion } from "framer-motion";

// STORE IMPORT
import useUserStore from "@/store/userStore";
import ProfileAvatar from "../molucles/Avatar";
import Overlay from "../atoms/Overlay";

const DashTopNavBar = () => {
  const { user } = useUserStore();
  const [showProfile, setShowProfile] = useState(false);

  const [showNotifiaction, setShowNotification] = useState(false);
  return (
    <div className="w-full flex justify-between items-center bg-white shadow-md p-2 pr-5 mobile:max-sm:pr-2 relative">
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
        <BellBtn onClick={() => setShowNotification((prev) => !prev)} />
        <ProfileAvatar
          onClick={() => setShowProfile((prev) => !prev)}
          user={user}
          size={3}
        />
      </div>
      {/* <h1>hello</h1> */}
      {showNotifiaction && (
        <Overlay
          onClick={() => setShowNotification((prev) => !prev)}
          transparent
        />
      )}

      {showNotifiaction && (
        <motion.div
          initial={{ opacity: 0, translateY: -20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute top-[57px] right-2 z-40"
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
  );
};

export default DashTopNavBar;
