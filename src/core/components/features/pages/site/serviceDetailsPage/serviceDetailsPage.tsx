import React from 'react';
import { Navbar, Footer } from '@/core/components/organisms';
import Head from 'next/head';
import ServiceDetails from '@/app/(site)/service-details/[id]/_components/ServiceDetails';
export default function ServiceDetailsPage() {
  return (
    <div className="">
      <Head>
        <title>services profile</title>
      </Head>
      <Navbar onDashBoard={false} />
      <ServiceDetails />
      <Footer className="" />
    </div>
  );
}
