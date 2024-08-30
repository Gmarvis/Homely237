'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import H3 from '../../atoms/H3';

// STORE IMPORTS
import ServiceCard from '../cards/ServiceCard';
import CategoryGrid from '../CategoryGrid';

// REACT ICONS
import { MdOutlineNavigateNext } from 'react-icons/md';
import { GrFormPrevious } from 'react-icons/gr';
import ServiceCardSkeleton from '../SkeletonLoaders/ServiceCardSkeleton';
import MasonryList from '../MasonryList';
import useServiceStore from '../../../../store/serviceStore';

export default function ServicesSection() {
  const { services } = useServiceStore();
  const [currentPage, setCurrentPage] = useState(0);
  const [pageIndex, setPageIndex] = useState(8);
  // console.log("services", services);

  const router = useRouter();
  // console.log("TEST");

  return (
    <>
      {services?.length ? (
        <MasonryList
          services={services}
          onClickOpen={(id) => router.push(`/service-details/${id}`)}
        />
      ) : (
        <MasonryList
          services={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
          onClickOpen={(id) => router.push(`/service-details/${id}`)}
        />
      )}
    </>
  );
}
