import SmoothLoader from '@/components/atoms/SmoothLoader';
import React from 'react';

const Loading = ({ full = false }: { full: boolean }) => {
    return (
        <div
            className={`${
                full ? 'w-[100vw]' : 'w-[80vw]'
            } mobile:max-sm:w-screen fixed h-[calc(100vh-53px)]  flex justify-center items-center`}
        >
            <SmoothLoader />
        </div>
    );
};

export default Loading;

// TODO
/* MAKE THE DASHBOARD LOADING TO LOAD AT THE CENTER OF THE PAGE */
