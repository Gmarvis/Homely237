"use client";
import React, { useState } from "react";
import * as Queries from "@/utils/queries";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";

const ServiceDetails = () => {
  const [service, setService] = useState<Service | null>(null);
  // get Service Id form the params
  const serviceId = usePathname().slice(1);

  useEffect(() => {
    Queries.getServiceByServiceID(serviceId).then((res) => {
      if (res.id) {
        setService(res);
        console.log(res);
      }
    });
  }, []);
  <h2>{service?.name}</h2>;

  return (
    <div className="pt-[55px] px-24 flex flex-col gap-5">
      <div className="flex pt-4 justify-between gap-10 ">
        <div className="iamges w-[700px] h-[300px]  bg-gray-200">
          <Image
            src={service?.product_image as string}
            alt=""
            bg-red-600
            width={400}
            height={400}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="detials w-[100%] h-[300px] flex flex-col gap-5 ">
          <h3>
            {`${service?.name.charAt(0).toUpperCase()}${service?.name.slice(
              1
            )}`}
          </h3>
          <p>
            {service?.price} CFA <span>per hour</span>
          </p>

          <p>{service?.description}</p>

          <button className="bg-primarytheme text-white py-2">
            BOOK AN APPOINTMENT
          </button>
        </div>
      </div>

      <h3 className="text-center">Services you might need</h3>
    </div>
  );
};

export default ServiceDetails;
