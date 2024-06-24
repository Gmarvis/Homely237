'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import H3 from '../atoms/H3';

// STORE IMPORTS
import useServiceStore from '@/store/serviceStore';
import ServiceCard from './cards/ServiceCard';
import CategoryGrid from './CategoryGrid';

// REACT ICONS
import { MdOutlineNavigateNext } from 'react-icons/md';
import { GrFormPrevious } from 'react-icons/gr';
import ServiceCardSkeleton from './SkeletonLoaders/ServiceCardSkeleton';
import MasonryList from './MasonryList';

const ServicesSection = () => {
    const { services } = useServiceStore();
    const [currentPage, setCurrentPage] = useState(0);
    const [pageIndex, setPageIndex] = useState(8);
    // console.log("services", services);

    const router = useRouter();
    // console.log("TEST");

    return (
        <>
            {services?.length ? (
                <MasonryList services={services} onClickOpen={(id) => router.push(`/${id}`)} />
            ) : (
                <MasonryList
                    services={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                    onClickOpen={(id) => router.push(`/${id}`)}
                />
            )}
        </>
    );

    // return (
    //     <div className="px-24  bigScreen:px-80 py-5 mobile:max-sm:px-5 flex flex-col justify-center items-center">
    //         <CategoryGrid />

    //         <h3 className="font-bold text-start flex self-start text-primarytheme">
    //             SERVICES
    //         </h3>

    //         {!services?.length && (
    //             <div className=" grid-cols-4 mobile:max-sm:grid-cols-2 mobile:max-sm:gap-2 mb-5 2xl:px-24 items-center justify-center mobile:max-sm:grid hidden z-0 w-full">
    //                 {[1, 2, 3, 4, 5, 6, 7, 8].map((item, i) => (
    //                     <ServiceCardSkeleton key={i} />
    //                 ))}
    //             </div>
    //         )}

    //         {!services?.length && (
    //             <div className="flex gap-10 pl-3 flex-wrap items-center py-10 mobile:max-sm:hidden z-0 w-full justify-center">
    //                 {[1, 2, 3, 4, 5, 6, 7, 8].map((item, i) => (
    //                     <ServiceCardSkeleton key={i} />
    //                 ))}
    //             </div>
    //         )}

    //         <div className=" grid-cols-4  mobile:max-sm:grid-cols-2 mobile:max-sm:gap-2 mb-5 2xl:px-24 items-center justify-center mobile:max-sm:grid hidden w-full">
    //             {services
    //                 ?.slice(currentPage, currentPage + pageIndex)
    //                 .map((service, i) => (
    //                     <ServiceCard
    //                         key={i}
    //                         service={service}
    //                         onClick={() => router.push(`/${service.id}`)}
    //                     />
    //                 ))}
    //         </div>

    //         <div className="flex bigScreen:justify-evenly pl-3 flex-wrap gap-20 justify-center mx-auto items-center py-10 mobile:max-sm:hidden   ">
    //             {services
    //                 ?.slice(currentPage, currentPage + pageIndex)
    //                 .map((service, i) => (
    //                     <ServiceCard
    //                         key={i}
    //                         service={service}
    //                         onClick={() => router.push(`/${service.id}`)}
    //                     />
    //                 ))}
    //         </div>
    //         <div className="flex w-full justify-end gap-3">
    //             <button
    //                 className="bg-primarytheme p-2 rounded-full disabled:bg-gray-300 text-white"
    //                 disabled={currentPage === 0}
    //                 onClick={() => {
    //                     setCurrentPage((prev) => prev - pageIndex);
    //                 }}
    //             >
    //                 <GrFormPrevious />
    //             </button>

    //             <button
    //                 className="bg-primarytheme p-2 rounded-full disabled:bg-gray-300 text-white"
    //                 disabled={services?.length <= currentPage + pageIndex}
    //                 onClick={() => {
    //                     setCurrentPage((prev) => prev + pageIndex);
    //                 }}
    //             >
    //                 <MdOutlineNavigateNext />
    //             </button>
    //         </div>
    //     </div>
    // );
};

export default ServicesSection;
