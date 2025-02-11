'use client';
import React, { useState } from 'react';
import Masonry from 'react-responsive-masonry';
import { PiShareNetworkThin } from 'react-icons/pi';
import ProfileAvatar from '../molecules/Avatar';
import { Button } from '../ui/button';

const MasonryList = ({
  services,
  onClickOpen
}: {
  services: any[];
  onClickOpen: (id: string) => void;
}) => {
  const items = services?.slice(0, 10).map((service, index) => (
    <div className="" key={index}>
      <div
        onClick={() => service.id && onClickOpen(service.id)}
        className={`rounded-2xl w-full object-fill hover:cursor-pointer shadow-md  mobile:max-sm:w-full  h-80 bg-slate-300 ${!service.name ? 'animate-pulse' : ''}  ${
          index % 2 ? 'h-[400px] mobile:max-sm:h-[300px]' : 'h-[300] mobile:max-sm:h-[200px]'
        }`}
        style={{
          backgroundImage: `url("${service.product_image}")`,
          backgroundPosition: 'center',
          objectFit: 'contain',
          // backgroundRepeat: "no-repeat",
          backgroundSize: 'cover'
        }}
      >
        {' '}
        <div className="w-full h-full bg-slate-900 duration-300   hover:opacity-20 rounded-2xl opacity-0"></div>
      </div>
      <h3 className="font-bold pt-1">{service.name}</h3>
      <div className="flex justify-between items-center">
        <div className="flex justify-center items-center gap-2">
          <ProfileAvatar size={2} />
          <span>{service.user?.name}</span>
        </div>
        {services.length > 0 && (
          <Button variant={'outline'} className=" p-2 hover:bg-slate-200 border-none">
            {service.price} {`${service.price ? '/hr' : ''}`}
          </Button>
        )}
      </div>
    </div>
  ));
  return (
    <>
      <div className="px-24 mobile:max-sm:px-2 py-8 mobile:max-sm:hidden sm:max-lg:px-2 sm:max-lg:hidden">
        <Masonry columnsCount={5} gutter="15px">
          {items}
        </Masonry>
      </div>

      <div className="px-24 mobile:max-sm:px-2 py-4 mobile:max-sm:hidden sm:max-lg:visible lg:hidden sm:max-lg:px-2">
        <Masonry columnsCount={3} gutter="15px">
          {items}
        </Masonry>
      </div>

      <div className="px-24 mobile:max-sm:px-2 py-4   sm:hidden">
        <Masonry columnsCount={2} gutter="15px">
          {items}
        </Masonry>
      </div>
    </>
  );
};

export default MasonryList;
