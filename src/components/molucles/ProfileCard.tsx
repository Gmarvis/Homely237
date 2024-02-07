"use client";
import React from "react";
import ProfileAvatar from "./Avatar";
import useUserStore from "@/store/userStore";
import Link from "next/link";

const ProfileCard = () => {
  const { user } = useUserStore();
  return (
    <div className="w-full border border-primarytheme p-1 rounded-md flex flex-col gap-3">
      <div className="w-full flex flex-col justify-center items-center py-2 ">
        <ProfileAvatar user={user} size={10} />
        <h3 className="text-md font-bold">{user.name}</h3>
        <p className="text-sm text-slate-500">{user.email}</p>
      </div>

      <Link href={""}>
        <button className="bg-primarytheme w-full py-1 text-white">
          View Profile
        </button>
      </Link>
      <button className=" w-full py-1 text-primarytheme mt-2">Logout</button>
    </div>
  );
};

export default ProfileCard;
