'use client';
import NavBar from '@/components/organisms/NavBar';
import React from 'react';
import ProfileSection from '../_components/ProfileSection';
import CreateProviderForm from '../_components/CreateProviderForm';

const page = () => {
    return (
        <div>
            <NavBar />
            <div className="pt-[58px] px-24 w-full  mobile:max-sm:px-2 pb-10">
                <div className="w-full flex justify-center">
                    <div className=" max-w-2xl mobile:max-sm:max-w-full mobile:max-sm:w-full w-full space-y-3">
                        <ProfileSection />
                        <CreateProviderForm />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default page;
