"use client";
import NavBar from "@/components/organisms/NavBar";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import * as Queries from "@/utils/queries";
import Steps from "./_components/Steps";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// react icons
import { MdNavigateNext } from "react-icons/md";

const Page = () => {
  const [service, setService] = useState<Service | null>();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currentStep, setCurrentStep] = useState(1);
  const router = useRouter();

  // get Service Id form the params
  const serviceId = usePathname().split("/")[2];

  useEffect(() => {
    Queries.getServiceByServiceID(serviceId).then((res) => {
      if (res.id) {
        setService(res);
        console.log("service", service);
      }
    });
  }, []);

  const handleBooking = () => {
    setCurrentStep((prev) => (prev += 1));
  };

  return (
    <div>
      <NavBar hideSearchBar={true} onDashBoard={false} />
      <div className="flex justify-center items-center mobile:max-sm:justify-start  mobile:max-sm:items-start   pt-[60px] h-[100vh] w-full relative">
        <div className="w-[40rem] mobile:max-sm:w-full h-[35rem] shadow-md p-2 bg-white absolute border">
          <Steps
            steps={{
              stpesCount: [1, 2, 3, 4],
              currentStep: currentStep,
            }}
          />

          <h3 className="border border-primarytheme p-2">{service?.name}</h3>
          <div className="w-full  flex flex-col justify-center items-center pt-10">
            <DatePicker onChange={() => {}} />
          </div>

          <button
            onClick={handleBooking}
            className="flex items-center  bg-primarytheme py-1 px-2 text-white absolute bottom-4 right-4 "
          >
            Next
            <MdNavigateNext size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
