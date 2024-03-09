import NavBar from "@/components/organisms/NavBar";
import ServiceCardSkeleton from "@/components/organisms/SkeletonLoaders/ServiceCardSkeleton";
import React from "react";

const page = () => {
  return (
    <div>
      <NavBar onDashBoard={false} />
      <div className="pt-20 px-24 ">
        <h2>Product details</h2>

        <ServiceCardSkeleton />
      </div>
    </div>
  );
};

export default page;
