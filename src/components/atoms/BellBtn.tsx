import React from "react";
import { FaRegBell } from "react-icons/fa";

const BellBtn = () => {
  return (
    <button className=" p-2 rounded-full relative">
      <span className="absolute bg-red-600 font-bold rounded-full flex px-1 items-center bottom-5 left-5 text-[10px] text-white">
        5
      </span>
      <FaRegBell size={20} className="text-slate-600" />
    </button>
  );
};

export default BellBtn;
