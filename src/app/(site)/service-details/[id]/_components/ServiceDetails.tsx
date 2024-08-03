'use client';
import React, { useState } from 'react';
import * as Queries from '@/core/utils/queries';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import DetailsSkeleton from './DetailsSkeleton';
import { ImWhatsapp } from 'react-icons/im';
import { IoMdArrowRoundBack } from 'react-icons/io';
import MasonryList from '@/core/components/organisms/MasonryList';
import { Button } from '@/core/components/ui/button';
import { PopUpModal } from '@/core/components/organisms/modals';
import { Login } from '@/core/components/organisms';
import SignUp from '@/core/components/organisms/SignUp';
import { useUserStore } from '@/store';

const ServiceDetails = () => {
  const [service, setService] = useState<Service | null>(null);
  const [relatedProducts, SetRelatedProducts] = useState<Service[] | null>(null);
  const [view, setView] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [onSign, setOnSignUp] = useState(false);

  const router = useRouter();
  const { user } = useUserStore();

  // get Service Id form the params
  const serviceId = useParams().id as string;

  useEffect(() => {
    Queries.getServiceByServiceID(serviceId).then((res) => {
      if (res.id) {
        setService(res);
        setView(res.product_image);
        Queries.getServiceByCategoryID(res.category_id).then((res) => {
          if (!res.error) SetRelatedProducts(res);
          // console.log("related products", res);
        });
        // console.log(res);
      }
    });
  }, []);

  const handleOnclickBookAppointment = () => {
    if (!user.id) {
      setOpenModal(true);
    } else {
      service && router.push(`/booking/${service.id}`);
    }
  };

  return (
    <>
      <div className="pt-[55px] mobile:max-sm:pt-[60px] mobile:max-sm:px-2 px-24 bigScreen:px-80 gap-5 mobile:max-sm:gap-1">
        <div className="flex flex-col gap-2 h-[80vh] mt-10 rounded-3xl shadow-md border mobile:max-sm:h-full">
          <div className="flex  h-full mobile:max-sm:flex-col justify-between items-center shadow-sm mobile:max-sm:p-0">
            <div className="iamges mobile:max-sm:w-[100%] mobile:max-sm:h-[300px] w-full h-full rounded-tl-2xl mobile:max-sm:rounded-b-[0px]  rounded-bl-2xl mobile:max-sm:rounded-2xl bg-gray-200 relative">
              <button
                onClick={() => router.back()}
                className="absolute left-5 top-5 bg-primarytheme hover:bg-secondrytheme duration-300 p-2 rounded-full text-white">
                <IoMdArrowRoundBack size={40} />
              </button>

              <Image
                src={
                  view || 'https://i.pinimg.com/564x/9d/90/33/9d903364960a75dcb7f5ea8af91fa44f.jpg'
                }
                alt=""
                width={400}
                height={400}
                className="w-full h-full object-cover rounded-tl-2xl  rounded-bl-2xl mobile:max-sm:rounded-b-[0px] mobile:max-sm:rounded-t-2xl"
              />
            </div>
            {!service ? (
              <DetailsSkeleton />
            ) : (
              <div className="detials w-[100%] flex flex-col gap-5 p-5 h-full ">
                <div className="flex justify-between">
                  <div className="">
                    <h3 className="font-bold text-gray-700 text-2xl">
                      {`${service?.name.charAt(0).toUpperCase()}${service?.name.slice(1)}`}
                    </h3>
                    <p className="text-slate-600 text-sm">{service?.category_name} services</p>
                  </div>
                  <button className="" onClick={() => alert('conneting to whatsApp')}>
                    <ImWhatsapp size={30} className="text-green-600" />
                  </button>
                </div>
                <div className="flex-grow">
                  <span className="bg-secondrytheme p-1 px-3  text-white">
                    {service?.price} CFA per hour
                  </span>

                  <p className="text-sm text-slate-700 mt-3 h-32 ">{service?.description}</p>
                </div>

                <div className="flex gap-2 ">
                  {service?.images.map((image, i) => (
                    <div
                      className="w-[100px] h-[100px] hover:cursor-pointer hover:scale-105 duration-300"
                      key={i}
                      onClick={() => setView(image)}>
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

                <Button
                  variant={'secondary'}
                  onClick={handleOnclickBookAppointment}
                  className=" bg-primarytheme">
                  BOOK AN APPOINTMENT
                </Button>
              </div>
            )}
          </div>
        </div>

        <div className="pt-10">
          {relatedProducts && (
            <h3 className=" text-center text-3xl font-semibold text-gray-700">Related Services</h3>
          )}
        </div>
      </div>

      {relatedProducts && (
        <MasonryList
          services={relatedProducts.filter((item) => item.id !== serviceId)}
          onClickOpen={(id) => router.push(`/${id}`)}
        />
      )}

      {/* authentication modal */}
      <PopUpModal open={openModal} setOpen={setOpenModal}>
        {onSign ? <SignUp onSuccessSignUp={()=> setOpenModal(false)} /> : <Login onSuccessLogin={() => setOpenModal(false)} />}

        <p className="text-center">
          {onSign ? 'Already have an account' : "Don't have an account yet"}

          <Button
            onClick={() => setOnSignUp((prev) => !prev)}
            variant={'link'}
            className="text-primarytheme font-semibold">
            {onSign ? 'Log in' : 'Sign Up'}
          </Button>
        </p>
      </PopUpModal>
    </>
  );
};

export default ServiceDetails;
