import Footer from "@/components/organisms/Footer";
import NavBar from "@/components/organisms/NavBar";
import React from "react";
import Hero from "./_components/heroSection";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const page = () => {
    return (
        <>
            <NavBar onDashBoard={false} />
            <div className="pt-[58px] flex flex-col justify-center items-center space-y-10">
                <div className="">
                    <Hero />
                </div>
                <Link href={"/workspace/create"}>
                    <Button className="bg-primarytheme">Start Today</Button>
                </Link>
                <Footer />
            </div>
        </>
    );
};

export default page;
