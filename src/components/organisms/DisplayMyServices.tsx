'use client';
import { deleteService, getServiceByUserID } from '@/utils/queries';
import useUserStore from '@/store/userStore';
import React, { Suspense, useEffect, useState } from 'react';
import ServiceCard from './cards/ServiceCard';
import ServicesSection from './ServicesSection';
import SmoothLoader from '../atoms/SmoothLoader';
import { toast } from 'react-toastify';

/*>>>>>>>>>>>>>>THIS COMPONENT DISPLAYS ALL THE SERVICE PROVIDER'S SERVICE<<<<<<<<<<<<<*/
const DisplayMyServices = () => {
    const { user } = useUserStore();
    const [myService, setMyServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);

    const getServices = async () => {
        getServiceByUserID(user.id).then((res: any) => {
            setMyServices(res);
            setLoading(false);
        });
    };
    useEffect(() => {
        getServices();
    }, []);

    const handleDeleteService = async (id: string) => {
        const response = await deleteService(id);
        const results = await response.json();
        if (results === 1) {
            setMyServices(myService.filter((service) => service.id !== id));
        } else {
            toast.error('failed to delete service', {
                position: 'top-right',
                hideProgressBar: true,
                autoClose: 3000
            });
        }
    };

    return (
        <div>
            {myService?.length > 0 && (
                <div className="flex gap-5 flex-wrap items-center py-10">
                    <Suspense fallback={<ServicesSection />}>
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
                    </Suspense>
                </div>
            )}

            {loading && (
                <div className="flex gap-5  items-center justify-center py-10 pt-44 self-center">
                    <SmoothLoader />
                </div>
            )}

            {myService?.length === 0 && !loading && (
                <div className="flex gap-5 flex-wrap items-center justify-center pt-44 py-10">
                    <h3>Opps! you dont have services yet</h3>
                </div>
            )}
        </div>
    );
};

export default DisplayMyServices;
