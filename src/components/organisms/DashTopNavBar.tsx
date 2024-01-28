"use client";

import React from "react";
import BellBtn from "../atoms/BellBtn";
import Avatar from "react-avatar";

const DashTopNavBar = () => {
  return (
    <div className="w-full flex justify-between items-center bg-white shadow-md p-2">
      <h2>Provider</h2>

      <div className="flex gap-3 items-center">
        <BellBtn />
        <Avatar name="Foo Bar" size="30" round={true} />
      </div>
      {/* <h1>hello</h1> */}
    </div>
  );
};

export default DashTopNavBar;
