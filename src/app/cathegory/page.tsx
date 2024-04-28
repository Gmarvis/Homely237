"use client";
import Footer from "@/components/organisms/Footer";
import NavBar from "@/components/organisms/NavBar";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { randomArrayWithinRange } from "./helperFuntions";
import Testimonils from "@/components/organisms/Testimonials";
import SellWithUs from "@/components/organisms/CTA/SellWithUs";
import ServiceGrid from "@/components/organisms/ServiceGrid";
const Page = () => {
    const [gridImages, setGridImages] = useState<string[]>([
        "https://i.pinimg.com/736x/5c/6a/b6/5c6ab6f93e9d5c83a773698c8ddf25ff.jpg",
        "https://i.pinimg.com/564x/26/fe/04/26fe04dfda1ff7a980a6e8d69fb43151.jpg",
        "https://i.pinimg.com/564x/84/17/79/841779ded57a77c275909fe55bb70605.jpg",
        "https://i.pinimg.com/564x/8d/9a/c0/8d9ac086df0763977f05aca1b7a79408.jpg",
    ]);

    const images = [
        "https://i.pinimg.com/736x/5c/6a/b6/5c6ab6f93e9d5c83a773698c8ddf25ff.jpg",
        "https://i.pinimg.com/564x/26/fe/04/26fe04dfda1ff7a980a6e8d69fb43151.jpg",
        "https://i.pinimg.com/564x/22/fc/c1/22fcc1b8cdd61705f66abda3e66cecaa.jpg",
        "https://i.pinimg.com/564x/84/17/79/841779ded57a77c275909fe55bb70605.jpg",
        "https://i.pinimg.com/736x/3a/f6/7f/3af67feef15ddd8d39265ff454dc9e02.jpg",
        "https://i.pinimg.com/564x/fa/bc/63/fabc63376f95174702bead4fd929d578.jpg",
        "https://i.pinimg.com/564x/8d/9a/c0/8d9ac086df0763977f05aca1b7a79408.jpg",
    ];

    let interval = setInterval(() => {
        const randomImages = randomArrayWithinRange(images, 2);
        setGridImages(randomImages as string[]);
    }, 6000);
    clearInterval(interval);

    return (
        <>
            <div className="min-h-screen">
                <NavBar onDashBoard={false} />
                <div className=" h-[80vh] pt-16 flex px-24 mobile:max-sm:px-5 items-center justify-between bg-gradient-to-r  bg-primarytheme">
                    <h3 className="text-white text-5xl font-extrabold ">
                        Get the best <br /> Plumbing services
                    </h3>

                    <div className="shapes grid grid-cols-2 gap-4">
                        {gridImages.map((image, i) => (
                            <div
                                key={i}
                                style={{
                                    backgroundImage: `url(${image})`,
                                }}
                                className={`bg-white shadow-sm w-64  bg-center bg-cover h-48 mobile:max-sm:hidden sm:max-md:h-16 sm:max-md:w-16 transition-all duration-300 ${
                                    i === 0 ? "rounded-tl-full " : ""
                                } ${i === 3 ? "rounded-br-full" : ""} `}
                            ></div>
                        ))}
                    </div>
                </div>
                <div></div>
            </div>
            <ServiceGrid title="plumbing services" services={[]} />
            <Testimonils />
            <SellWithUs />
            <Footer />
        </>
    );
};

export default Page;

// --------------------TODO------------------
// Work on the hero section carosel display.
