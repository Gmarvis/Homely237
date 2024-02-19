"use client";
import { getServiceByUserID } from "@/utils/queries";
import useUserStore from "@/store/userStore";
import React, { useEffect, useState } from "react";

/*>>>>>>>>>>>>>>THIS COMPONENT DISPLAYS ALL THE SERVICE PROVIDER'S SERVICE<<<<<<<<<<<<<*/
const DisplayMyServices = () => {
  const { user } = useUserStore();
  const [myService, setMyServices] = useState<Service[]>([]);

  const getServices = async () => {
    getServiceByUserID(user.id).then((res: any) => {
      console.log(res);
      setMyServices(res);
    });
  };

  useEffect(() => {
    getServices();
  }, []);
  return (
    <div>
      <h2>display sercives component</h2>
      <div>
        {myService?.map((service) => (
          <div key={service.id}>
            <h3>{service.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayMyServices;
