'use client';
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/core/components/ui/accordion';
import { providerFaqs } from '@/data';
import Link from 'next/link';
import { Button } from '@/core/components/ui/button';

const Hero = () => {
  return (
    <section className="relative flex-col flex items-center justify-center  w-full ">
      <div className="div  justify-around mobile:max-lg:flex-col w-full">
        <div
          className="div w-[100%] mobile:max-lg:w-full h-[90vh]  bg-cover bg-center self-center text-center"
          style={{
            backgroundImage: `url('https://cdn.pixabay.com/photo/2023/01/07/08/41/leaves-7702829_1280.jpg')`
          }}
        >
          <div className="bg-black/40 h-full w-full pt-28 flex justify-center items-center">
            <div className="flex flex-col justify-center items-center relative z-10 max-w-screen-xl mx-auto px-4 py-28 md:px-8">
              <div className="space-y-5 max-w-4xl mx-auto text-center pt-16">
                <h2 className="text-4xl text-white font-extrabold mx-auto md:text-5xl">
                  Build a digital workspace on Homygig and double up on your earnings
                </h2>
                <p className="max-w-2xl mx-auto text-gray-100">
                  To become a service provider on Homygig, sign up for an account, complete your
                  profile with the necessary details, list the services you offer, and specify your
                  location. Users will then be able to find and book your services.
                </p>

                <div className="flex justify-center items-center text-gray-400 text-sm">
                  <Link href={'/workspace/setup'}>
                    <Button
                      variant={'secondary'}
                      className="bg-primarytheme/80 w-[40vw] text-xl py-10"
                    >
                      Start Today
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col pb-20 w-full justify-center items-center py-5">
          <h2 className="text-center font-bold">FAQs</h2>
          {providerFaqs.map((faq, index) => (
            <Accordion key={index} type="single" className="w-full max-w-lg px-4 " collapsible>
              <AccordionItem value="item-10">
                <AccordionTrigger className="w-full">{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
