"use client";

import Link from "next/link";
import React from "react";

// store
import useUserStore from "@/store/userStore";
import CategoryGrid from "./CategoryGrid";

const HeroSection = () => {
  const { user } = useUserStore();
  return (
    <section className="bg-slate-200 mt-10 bigScreen:pt-10 pb-10">
      <div className="max-w-screen-xl mx-auto px-4 pt-28 gap-12 text-gray-600 md:px-8">
        <div className="space-y-5 max-w-4xl mx-auto text-center">
          <h1 className="text-sm text-primarytheme font-medium">
            Revolutionizing Home Services in Cameroon
          </h1>
          <h2 className="text-4xl text-gray-800 font-extrabold mx-auto md:text-5xl">
            Your One-Stop Shop for Reliable
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primarytheme to-secondrytheme">
              {" "}
              Home Services
            </span>
          </h2>
          <p className="max-w-2xl mx-auto">
            Here, we keep it simple. finding a service, booking an appointment,
            communicating with the provider, and making payments.
          </p>
          <div className="items-center justify-center gap-x-3 space-y-3 sm:flex sm:space-y-0">
            <Link
              href={user.id ? "/dashboard/appointments" : "/auth"}
              className="block py-2 px-4 text-white font-medium bg-primarytheme duration-150 hover:bg-secondrytheme active:bg-indigo-700 rounded-lg shadow-lg hover:shadow-none"
            >
              {user.id ? "Appointments" : "Get Started"}
            </Link>
            <a
              href=""
              className="block py-2 px-4 text-gray-700 hover:text-gray-500 font-medium duration-150 active:bg-gray-100 border rounded-lg"
            >
              At my area
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
