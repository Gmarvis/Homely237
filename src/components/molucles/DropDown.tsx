import React from "react";
import { MdOutlineClear } from "react-icons/md";

type DropdownTypes = {
  title?: string;
  onBlur: () => void;
  children: React.ReactNode;
  className: string;
};

const DropDown = ({ title, onBlur, children, className }: DropdownTypes) => {
  return (
    <div
      className={` ${className} mobile:max-sm:w-[40vh] bg-white shadow-md rounded-md`}
    >
      <div className="flex w-full justify-between text-slate-600 p-2">
        <h3>{title}</h3>
        <button onClick={onBlur}>
          <MdOutlineClear size={20} />
        </button>
      </div>
      <div className="p-2">{children}</div>
    </div>
  );
};

export default DropDown;
