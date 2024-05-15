"use client";
import React from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const Hero = () => {
    return (
        <section className="relative flex-col flex items-center justify-center">
            <div className="relative z-10 max-w-screen-xl mx-auto px-4 py-28 md:px-8">
                <div className="space-y-5 max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl text-gray-800 font-extrabold mx-auto md:text-5xl">
                        Build a digital workspace on Homygig and double up on
                        your earnings
                    </h2>
                    <p className="max-w-2xl mx-auto text-gray-400">
                        Sed ut perspiciatis unde omnis iste natus voluptatem
                        accusantium doloremque laudantium, totam rem aperiam,
                        eaque ipsa quae.
                    </p>

                    <div className="flex justify-center items-center gap-x-4 text-gray-400 text-sm"></div>
                </div>
            </div>
            <div
                className="absolute inset-0 m-auto max-w-xs h-[357px] blur-[118px] sm:max-w-md md:max-w-lg"
                style={{
                    background:
                        "linear-gradient(106.89deg, rgba(192, 132, 252, 0.11) 15.73%, rgba(14, 165, 233, 0.41) 15.74%, rgba(232, 121, 249, 0.26) 56.49%, rgba(79, 70, 229, 0.4) 115.91%)",
                }}
            ></div>
            <Accordion type="single" className="w-full max-w-md" collapsible>
                <AccordionItem value="item-1">
                    <AccordionTrigger className="w-full">
                        Is it accessible?
                    </AccordionTrigger>
                    <AccordionContent>
                        Yes. It adheres to the WAI-ARIA design pattern.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </section>
    );
};

export default Hero;
