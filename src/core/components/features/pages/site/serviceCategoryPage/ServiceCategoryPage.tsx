'use client';

import { Footer, Navbar, Testimonies, ServiceGrid, SellWithUs } from '@/core/components/organisms';
import React, { useEffect, useState } from 'react';

import { useParams, useRouter } from 'next/navigation';
import { getServiceByCategoryID } from '@/core/utils/queries';
import { randomArrayWithinRange } from '@/app/(site)/category/helperFuntions';
import HeroContainer from '@/core/components/ui/heroContainer';
import { useUserStore, useCategoryStore } from '@/store';
import MasonryList from '@/core/components/organisms/MasonryList';

export default function ServiceCategoryPage() {
  const [services, setServices] = useState<Service[]>([]);
  const { user } = useUserStore();
  const { categories } = useCategoryStore();
  const [loading, setLoading] = useState(false);

  const category_id = useParams().id;
  const router = useRouter();

  const getServices = () => {
    setLoading(true);
    getServiceByCategoryID(category_id as unknown as string)
      .then((res) => {
        setServices(res);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getServices();
  }, []);

  const cat = categories.find((cat) => cat.id === category_id);

  console.log('services', services);
  return (
    <>
      <div className="min-h-screen">
        <Navbar onDashBoard={false} />
        <HeroContainer title={cat?.name} description="all you ever need is here" />

        {!services?.length && !loading && (
          <div className="w-full h-80 flex justify-center items-center">
            <h3>{`No ${cat?.name} service found`}</h3>
          </div>
        )}
        {services?.length > 0 && (
          <MasonryList
            services={services}
            onClickOpen={(id) => router.push(`/service-details/${id}`)}
          />
        )}
        {loading && (
          <MasonryList
            services={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
            onClickOpen={(id) => router.push(`/service-details/${id}`)}
          />
        )}
        <Testimonies />
        {![, '', 'admin', 'provider'].includes(user.role) && <SellWithUs />}
        <Footer />
      </div>
    </>
  );
}
