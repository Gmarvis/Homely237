"use client";
import { getServiceByUserID } from "@/utils/queries";
import useUserStore from "@/store/userStore";
import React, { useEffect, useState } from "react";
import ServiceCard from "./ServiceCard";

/*>>>>>>>>>>>>>>THIS COMPONENT DISPLAYS ALL THE SERVICE PROVIDER'S SERVICE<<<<<<<<<<<<<*/
const DisplayMyServices = () => {
  const { user } = useUserStore();
  const [myService, setMyServices] = useState<Service[]>([]);

  const getServices = async () => {
    getServiceByUserID(user.id).then((res: any) => {
      console.log("res", res);
      setMyServices(res);
    });
  };

  useEffect(() => {
    getServices();
  }, []);
  return (
    <div>
      <div>
        <div className="flex gap-5 flex-wrap items-center">
          {myService.map((service, i) => (
            <ServiceCard
              key={i}
              service={service}
              onClick={function (): void {
                throw new Error("Function not implemented.");
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DisplayMyServices;
