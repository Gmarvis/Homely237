import React, { useEffect, useRef } from "react";
import { MdOutlineClear } from "react-icons/md";

type DropdownTypes = {
  title: string;
  onBlur: () => void;
  children: React.ReactNode;
};

const DropDown = ({ title, onBlur, children }: DropdownTypes) => {
  const dropdownRef = useRef<HTMLDivElement>();

  useEffect(() => {
    dropdownRef.current?.focus();
  }, []);

  return (
    <div
      ref={dropdownRef as any}
      tabIndex={1}
      onBlur={onBlur}
      className="w-[20vw] mobile:max-sm:w-[40vh] bg-white shadow-md rounded-md"
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
