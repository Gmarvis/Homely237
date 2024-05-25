"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { GrFormPrevious } from "react-icons/gr";
import { MdOutlineNavigateNext } from "react-icons/md";
import ServiceCard from "./cards/ServiceCard";
import ServiceCardSkeleton from "./SkeletonLoaders/ServiceCardSkeleton";

type PropTyps = {
    services: Service[];
    title: string;
};

const ServiceGrid = ({ services, title }: PropTyps) => {
    const [currentPage, setCurrentPage] = useState(0);
    const [pageIndex, setPageIndex] = useState(8);

    const router = useRouter();
    return (
        <div className="px-24  bigScreen:px-80 py-5 mobile:max-sm:px-5 flex flex-col justify-center items-center">
            <h3 className="font-bold text-start flex self-start text-primarytheme">
                {title.toLocaleUpperCase()}
            </h3>

            {!services?.length && (
                <div className=" grid-cols-4 mobile:max-sm:grid-cols-2 mobile:max-sm:gap-2 mb-5 2xl:px-24 items-center justify-center mobile:max-sm:grid hidden z-0 w-full">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((item, i) => (
                        <ServiceCardSkeleton key={i} />
                    ))}
                </div>
            )}

            {!services.length && (
                <div className="flex gap-10 pl-3 flex-wrap items-center py-10 mobile:max-sm:hidden z-0 w-full justify-center">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((item, i) => (
                        <ServiceCardSkeleton key={i} />
                    ))}
                </div>
            )}

            <div className=" grid-cols-4 mobile:max-sm:grid-cols-2 mobile:max-sm:gap-2 mb-5 2xl:px-24 items-center justify-center mobile:max-sm:grid hidden w-full">
                {services
                    ?.slice(currentPage, currentPage + pageIndex)
                    .map((service, i) => (
                        <ServiceCard
                            key={i}
                            service={service}
                            onClick={() => router.push(`/${service.id}`)}
                        />
                    ))}
            </div>

            <div className="flex gap-10 pl-3 flex-wrap mx-auto items-center py-10 mobile:max-sm:hidden justify-center  ">
                {services
                    ?.slice(currentPage, currentPage + pageIndex)
                    .map((service, i) => (
                        <ServiceCard
                            key={i}
                            service={service}
                            onClick={() => router.push(`/${service.id}`)}
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

export default ServiceGrid;
