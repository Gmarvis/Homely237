import { Footer, Navbar } from '@/core/components/organisms';
import React from 'react';
import Hero from './_components/heroSection';

const page = () => {
  return (
    <>
      <Navbar onDashBoard={false} />
      <Hero />
      <Footer className="" />
    </>
  );
};

export default page;
