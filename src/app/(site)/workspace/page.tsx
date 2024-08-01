import { Footer, Navbar } from '@/core/components/organisms';
import React from 'react';
import Hero from './_components/heroSection';
import Link from 'next/link';
import { Button } from '@/core/components/ui/button';

const page = () => {
  return (
    <>
      <Navbar onDashBoard={false} />
      <div className="pt-[58px] flex flex-col justify-center items-center space-y-10">
        <div className="">
          <Hero />
        </div>
        <Link href={'/workspace/create'}>
          <Button className="bg-primarytheme">Start Today</Button>
        </Link>
        <Footer />
      </div>
    </>
  );
};

export default page;
