'use client';
import { deleteService, getServiceByUserID } from '@/core/utils/queries';
import useUserStore from '@/store/userStore';
import React, { Suspense, useEffect, useState } from 'react';
import ServiceCard from './cards/ServiceCard';
import { toast } from 'react-toastify';
import { useEdgeStore } from '@/core/lib/edgeStore/edgestore';

const DisplayMyServices = () => {
  const { user } = useUserStore();
  const [myService, setMyServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  const { edgestore } = useEdgeStore();

  const getServices = async () => {
    getServiceByUserID(user.id).then((res: any) => {
      setMyServices(res);
      setLoading(false);
    });
  };
  useEffect(() => {
    getServices();
  }, []);

  const deleteServiceImages = async (service: Service) => {
    let images = service.images;
    if (!images.includes(service.product_image)) {
      images = [service.product_image, ...images];
    }
    Promise.all(
      images.map((image) => {
        edgestore.publicFiles.delete({
          url: image
        });
      })
    )
      .then()
      .catch((error) => {
        throw new Error(error);
      });
  };

  const handleDeleteService = (service: Service) => {
    deleteService(service.id).then(async (res) => {
      const data = await res.json();
      if (data === 1) {
        setMyServices(myService.filter((data) => data.id !== service.id));
      }
    });
    toast.promise(
      async () => {
        await deleteServiceImages(service);
        await deleteService(service.id);
      },
      {
        pending: 'Deleting service',
        success: 'service deleted successfully',
        error: 'Failed to delete service'
      }
    );
  };

  return (
    <div className=" h-full">
      {myService?.length > 0 && (
        <div className="flex gap-5 flex-wrap items-center py-10">
          {myService?.map((service, i) => (
            <ServiceCard
              key={i}
              service={service}
              onClick={() => {}}
              hideAuthor
              showMenu
              onClickDelete={handleDeleteService}
            />
          ))}
        </div>
      )}

      {loading && (
        <div className="flex gap-3   items-center justify-center self-center flex-wrap animate-pulse">
          {[1, 2, 3, 4, 5, 6].map((_, index) => (
            <div key={index} className="w-64 h-64 bg-gray-300 rounded-md shadow-md"></div>
          ))}
        </div>
      )}

      {myService?.length === 0 && !loading && (
        <div className="flex gap-5 h-full w-full flex-wrap items-center justify-center ">
          <h3>Oops! you do not have service yet</h3>
        </div>
      )}
    </div>
  );
};

export default DisplayMyServices;
