import Footer from "@/components/organisms/Footer";
import NavBar from "@/components/organisms/NavBar";
import ServiceCardSkeleton from "@/components/organisms/SkeletonLoaders/ServiceCardSkeleton";
import Head from "next/head";
import React from "react";

const page = () => {
  return (
    <main>
      <Head>
        <title>servives profile</title>
      </Head>
      <NavBar onDashBoard={false} />
      <div className="pt-20 px-24 ">
        <div className="header flex justify-between items-center ">
          <h2>Product details</h2>
          <button className="bg-secondrytheme px-3 py-1">Book Service</button>
        </div>

        <ServiceCardSkeleton />
      </div>
      <Footer className="" />
    </main>
  );
};

export default page;

// >>>>>>TODO<<<<<<
// >>>>>>Design the details page
// >>>>>>make api call to the backend to get product/service by product ID
