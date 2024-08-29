'use client';
import { Navbar } from '@/core/components/organisms';
import React from 'react';
import ProfileSection from '../_components/ProfileSection';
import CreateProviderForm from '../_components/CreateProviderForm';

const page = () => {
  return (
    <div className="h-screen">
      <Navbar />
      <div className="pt-52 mobile:max-md:pt-20 px-24 w-full  mobile:max-sm:px-2 pb-10">
        <div className="w-full flex justify-center">
          <div className=" max-w-3xl px-2 py-5 mobile:max-sm:max-w-full mobile:max-sm:w-full w-full space-y-3 shadow-md ">
            <ProfileSection />
            <CreateProviderForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
