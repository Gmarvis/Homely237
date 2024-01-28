import SmoothLoader from "@/components/atoms/SmoothLoader";
import React from "react";

const loading = () => {
  return (
    <div className="w-full h-[calc(100vh-53px)]  flex justify-center items-center">
      <SmoothLoader />
    </div>
  );
};

export default loading;

// TODO
/* MAKE THE DASHBOARD LOADING TO LOAD AT THE CENTER OF THE PAGE */
