"use client";
import React from "react";
import H3 from "../atoms/H3";

// STORE IMPORTS
import useServiceStore from "@/store/serviceStore";
import ServiceCard from "./ServiceCard";
import CategoryGrid from "./CategoryGrid";

const ServicesSection = () => {
  const { services } = useServiceStore();
  console.log("services", services);
  return (
    <div className="px-24 py-5 mobile:max-sm:px-5">
      <CategoryGrid />

      <H3 text={"Plumbing Services"} />
      <div className="flex gap-10 pl-3 flex-wrap items-center py-10">
        {services.map((service, i) => (
          <ServiceCard
            key={i}
            service={service}
            onClick={function (): void {
              throw new Error("Function not implemented.");
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ServicesSection;
