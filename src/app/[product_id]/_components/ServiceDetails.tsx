"use client";
import React, { useState } from "react";
import * as Queries from "@/utils/queries";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";
import ServiceCard from "@/components/organisms/ServiceCard";
import { useRouter } from "next/navigation";
import ServiceCardSkeleton from "@/components/organisms/SkeletonLoaders/ServiceCardSkeleton";
import TextSkeleton from "@/components/organisms/SkeletonLoaders/TextSkeleton";

const ServiceDetails = () => {
  const [service, setService] = useState<Service | null>(null);
  const [relatedProducts, SetRelatedProducts] = useState<Service[] | null>();
  const [view, setView] = useState("");

  const router = useRouter();

  // get Service Id form the params
  const serviceId = usePathname().slice(1);

  useEffect(() => {
    Queries.getServiceByServiceID(serviceId).then((res) => {
      if (res.id) {
        setService(res);
        setView(res.product_image);
        Queries.getServiceByCategoryID(res.category_id).then((res) => {
          if (!res.error) SetRelatedProducts(res);
          console.log("related products", res);
        });
        console.log(res);
      }
    });
  }, []);
  <h2>{service?.name}</h2>;

  return (
    <div className="pt-[55px] mobile:max-sm:pt-[60px] mobile:max-sm:px-2 px-24 bigScreen:px-80 gap-5 mobile:max-sm:gap-1">
      <div className="flex flex-col gap-2">
        <div className="flex pt-4 mobile:max-sm:flex-col justify-between gap-10 shadow-sm p-2 mobile:max-sm:p-0">
          <div className="iamges mobile:max-sm:w-[100%] mobile:max-sm:h-[200px] w-[700px] h-[333px]  bg-gray-200">
            <Image
              src={
                view ||
                "https://i.pinimg.com/564x/9d/90/33/9d903364960a75dcb7f5ea8af91fa44f.jpg"
              }
              alt=""
              bg-red-600
              width={400}
              height={400}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="detials w-[100%] flex flex-col gap-5 p-2 ">
            <div>
              <h3 className="font-bold text-2xl">
                {`${service?.name.charAt(0).toUpperCase()}${service?.name.slice(
                  1
                )}`}
              </h3>
              <p className="text-slate-600 text-sm">
                {service?.category_name} services
              </p>
            </div>
            <div className="">
              <span className="bg-secondrytheme p-1 px-3  text-white">
                {service?.price} CFA per hour
              </span>

              <p className="text-sm text-slate-700 mt-3">
                {service?.description} Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Sequi cupiditate praesentium enim commodi
                libero autem rem hic soluta. Nesciunt vitae perferendis rerum
                tempora eos, reprehenderit repudiandae, aperiam expedita optio
                excepturi quisquam incidunt consequatur dignissimos? Mollitia
                fugiat facere
              </p>
            </div>

            <div className="flex gap-2 ">
              {service?.images.map((image, i) => (
                <div
                  className="w-[60px] h-[60px] hover:cursor-pointer"
                  key={i}
                  onClick={() => setView(image)}
                >
                  <Image
                    src={image}
                    alt=""
                    width={200}
                    height={200}
                    className="object-cover w-full h-full"
                  />
                </div>
              ))}
            </div>

            <button className=" border border-primarytheme text-primarytheme py-2">
              BOOK AN APPOINTMENT
            </button>
          </div>
        </div>
      </div>

      <div className="pt-10">
        <h3 className="text-lg font-semibold text-gray-700">
          Related Services
        </h3>

        {!relatedProducts && (
          <div className=" grid-cols-4 mobile:max-sm:grid-cols-2 mobile:max-sm:gap-2 mb-5 2xl:px-24 items-center justify-center mobile:max-sm:grid hidden z-0 w-full">
            {[1, 2, 3, 4].map((item, i) => (
              <ServiceCardSkeleton key={i} />
            ))}
          </div>
        )}

        {!relatedProducts && (
          <div className="flex gap-10 pl-3 flex-wrap items-center py-10 mobile:max-sm:hidden z-0 w-full justify-center">
            {[1, 2, 3, 4].map((item, i) => (
              <ServiceCardSkeleton key={i} />
            ))}
          </div>
        )}

        <div className=" grid-cols-4 mobile:max-sm:grid-cols-2 mobile:max-sm:gap-2 mb-5 2xl:px-24 items-center justify-center mobile:max-sm:grid hidden w-full">
          {relatedProducts
            ?.filter((item) => item.id !== serviceId)
            .map((service, i) => (
              <ServiceCard
                key={i}
                service={service}
                onClick={() => router.push(`/${service.id}`)}
              />
            ))}
        </div>

        <div className="flex gap-10 flex-wrap py-2 mobile:max-sm:hidden   ">
          {relatedProducts
            ?.filter((item) => item.id !== serviceId)
            .map((service, i) => (
              <ServiceCard
                key={i}
                service={service}
                onClick={() => router.push(`/${service.id}`)}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;
