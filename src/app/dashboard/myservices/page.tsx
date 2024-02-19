import H3 from "@/components/atoms/H3";
import DisplayMyServices from "@/components/organisms/DisplayMyServices";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="p-5">
      <div className="header w-full flex justify-between items-center">
        <H3 className="text-slate-500" text="My Services" />
        <Link href={"/dashboard/addservice"}>
          <button className="shadow-md py-1 px-2 bg-white rounded-sm text-primarytheme">
            Add Service
          </button>
        </Link>
      </div>
      <DisplayMyServices />
    </div>
  );
};

export default page;
