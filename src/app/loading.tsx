import LogoLoader from '@/core/components/loaders/logoLoader/LogoLoader';
import React from 'react';

const loading = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <LogoLoader />
    </div>
  );
};

export default loading;
