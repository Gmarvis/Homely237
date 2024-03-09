"use client";
import React, { useState } from "react";
import H3 from "../atoms/H3";

// STORE IMPORTS
import useServiceStore from "@/store/serviceStore";
import ServiceCard from "./ServiceCard";
import CategoryGrid from "./CategoryGrid";

// REACT ICONS
import { MdOutlineNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";

const ServicesSection = () => {
  const { services } = useServiceStore();
  const [currentPage, setCurrentPage] = useState(0);
  const [pageIndex, setPageIndex] = useState(4);
  // console.log("services", services);

  return (
    <div className="px-24 py-5 mobile:max-sm:px-5">
      <CategoryGrid />

      <H3 text={"Plumbing Services"} />
      <div
        // className="flex gap-10 pl-3 flex-wrap items-center py-10"
        className="grid grid-cols-4 mobile:max-sm:grid-cols-2 mobile:max-sm:gap-2 mb-5 2xl:px-24 items-center justify-center "
      >
        {services
          ?.slice(currentPage, currentPage + pageIndex)
          .map((service, i) => (
            <ServiceCard
              key={i}
              service={service}
              onClick={function (): void {
                throw new Error("Function not implemented.");
              }}
            />
          ))}
      </div>
      <div className="flex w-full justify-end gap-3">
        <button
          className="bg-primarytheme p-2 rounded-full disabled:bg-gray-300 text-white"
          disabled={currentPage === 0}
          onClick={() => {
            setCurrentPage((prev) => prev - pageIndex);
          }}
        >
          <GrFormPrevious />
        </button>

        <button
          className="bg-primarytheme p-2 rounded-full disabled:bg-gray-300 text-white"
          disabled={services.length <= currentPage + pageIndex}
          onClick={() => {
            setCurrentPage((prev) => prev + pageIndex);
          }}
        >
          <MdOutlineNavigateNext />
        </button>
      </div>
    </div>
  );
};

export default ServicesSection;

// >>>>>>>TODO<<<<<<<
// >>>>hande pagination on displaying services <<<<<<<
