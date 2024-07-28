import H3 from '@/components/atoms/H3';
import DisplayMyServices from '@/components/organisms/DisplayMyServices';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';

import { RiUpload2Line } from 'react-icons/ri';

const page = () => {
  return (
    <div className="p-5 space-y-2 relative w-full h-full">
      <div className="header w-full flex justify-between items-center">
        <h3 className=" text-gray-700  ">My services</h3>
        <Link href={'/dashboard/add-service'}>
          <Button className="shadow-md py-1 text-white bg-primarytheme  hover:bg-secondrytheme px-4 flex justify-center gap-2 items-center rounded-md">
            <RiUpload2Line />
            Add Service
          </Button>
        </Link>
      </div>
      <div className=" h-[84vh]">
        <DisplayMyServices />
      </div>
    </div>
  );
};

export default page;
