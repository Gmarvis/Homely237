import SmoothLoader from '@/components/atoms/SmoothLoader';
import React from 'react';

const loading = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <SmoothLoader />
    </div>
  );
};

export default loading;
