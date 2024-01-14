"use client";
import { useState } from "react";

type InPutProps = {
  label: string;
  onChange: (event: { target: { value: any } }) => void;
  className?: string;
};

const FormInput = ({ label, onChange, className }: InPutProps) => {
  const [showLabel, setShowLabel] = useState(false);
  return (
    <div className={`   rounded-[10px]  text-[12px] relative `}>
      <span
        className={`absolute bottom-7 bigScreen:bottom-11 mobile:max-sm:bottom-11 ${
          !showLabel ? "hidden" : "visible duration-700 transition ease-in-out"
        } bg-white px-[5px]  text-primarytheme left-2`}
      >
        {label}
      </span>
      <input
        onChange={onChange}
        onFocus={() => setShowLabel(true)}
        onBlur={() => setShowLabel(false)}
        type="text"
        className="w-full py-2 bigScreen:py-4 mobile:max-sm:py-4 px-3 border border-primarytheme rounded-[5px]  outline-none"
        placeholder={label}
      />
    </div>
  );
};

export default FormInput;
