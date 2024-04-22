import { getCurrrentLocation } from "@/utils/goelocationService/locationService";
import React from "react";

getCurrrentLocation();

const Page = () => {
  return (
    <div>
      <h2>handle location here</h2>
    </div>
  );
};

export default Page;
