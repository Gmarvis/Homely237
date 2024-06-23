import React from 'react';
import TextSkeleton from './TextSkeleton';
import AvatarSkeleton from './AvatarSkeleton';

const ServiceCardSkeleton = () => {
    return (
        <div className="h-[150px] w-60  mobile:max-sm:w-48 animate-pulse flex flex-col gap-1 z-20">
            <div className="bg-gray-300 w-full h-full  rounded-sm z-10"></div>

            <div className="w-full flex justify-between gap-10 z-10">
                <TextSkeleton styles="w-full z-10" />
                <TextSkeleton styles={'w-full z-10'} />
            </div>
            <div className="flex justify-between gap-5 items-center z-10">
                <AvatarSkeleton />
                <TextSkeleton styles="w-[96px] z-10" />
            </div>
        </div>
    );
};

export default ServiceCardSkeleton;
