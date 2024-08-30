'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import { getAppointmentById } from '@/core/utils/queries';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/core/components/ui/button';
import { Badge } from '@/core/components/ui/badge';
import Image from 'next/image';
import { LogoLoader, SpinningLoader } from '@/core/components/loaders';
import { dateFormatter } from '@/core/utils/date';
import { useUserStore } from '@/store';
import * as QUERIES from '@/core/utils/queries';

import { formatDistanceToNow } from 'date-fns';

export default function AppointmentDetailsPage() {
  const [appointment, SetAppointment] = useState<Appointment>();
  const id = useParams().id;
  const [upDating, setUpdating] = useState(false);

  const getAppointment = async () => {
    const data = await getAppointmentById(id as string);
    SetAppointment(data);
    console.log(data);
  };

  const { user } = useUserStore();

  const router = useRouter();

  useEffect(() => {
    getAppointment();
  }, []);

  const handleRespToAppointment = async (id: string, status: string) => {
    setUpdating(true);
    await QUERIES.updateAppointment(id, { status: status }).then((res) => {
      if (res.id) {
        SetAppointment(res);
        setUpdating(false);
      }
    });
    setUpdating(false);
  };

  return (
    <div className="w-full h-full  flex flex-col justify-center">
      {!appointment ? (
        <div className="w-[50%] mobile:max-lg:w-full mobile:max-lg:m-0 lg:max-2xl:w-[60%] m-auto shadow h-[85vh] flex flex-col justify-between bg-white rounded-md p-2 space-y-5">
          <div className="m-auto rounded-full ">
            <LogoLoader />
          </div>
        </div>
      ) : (
        <div className="w-[50%] bg-primarytheme/20 mobile:max-lg:w-full mobile:max-lg:m-0 mobile:max-lg:h-auto lg:max-2xl:w-[60%] m-auto shadow h-[85vh] flex flex-col justify-between bg-white rounded-md p-2 space-y-5">
          <div className="flex justify-between">
            <Button onClick={() => router.back()} variant={'outline'} className="text-gray-700">
              <ArrowLeft />
            </Button>

            <Badge variant={'secondary'}>
              {formatDistanceToNow(appointment.createdAt, { addSuffix: true })}
            </Badge>
          </div>
          <div className="space-y-4 flex-grow">
            <div className="flex w-full justify-center items-center p-2">
              <Image src={'/Calendar-bro.png'} height={200} width={200} alt="Calendar-image" />
            </div>
            <div className="flex flex-col space-y-4 justify-center px-4">
              {user.id !== appointment.user.id && (
                <p>
                  <span className="font-semibold">{appointment?.user.name}</span> sent you an
                  Appointment
                </p>
              )}

              <h3>
                <span className="font-semibold">Scheduled Date:</span>{' '}
                {dateFormatter.formatDate(appointment.date)}
              </h3>
              <h3>
                <span className="font-semibold">Location:</span> {appointment?.city}
              </h3>
              <h3>
                <span className="font-semibold text-wrap">Location Details: </span>{' '}
                {appointment?.location_details}
              </h3>

              <div className="w-full break-all">
                <p className="font-semibold text-wrap break-all ">Location Details: </p>{' '}
                {appointment?.description}
              </div>
            </div>
          </div>

          {appointment.status !== 'pending' ? (
            <div className="flex justify-center pb-10 duration-300">
              <Button
                variant={'ghost'}
                className={`${appointment.status === 'accepted' ? 'text-green-600' : 'text-red-500'}`}
              >
                Appointment {appointment.status}
              </Button>
            </div>
          ) : (
            <div className=" flex justify-center gap-10">
              {user.id === appointment.user_id ? (
                <>
                  <Button variant={'outline'}>Waiting for Response</Button>
                </>
              ) : (
                <>
                  {upDating ? (
                    <div className="pb-10">
                      <SpinningLoader />
                    </div>
                  ) : (
                    <div className="pb-10 space-x-5">
                      <Button
                        onClick={() => {
                          handleRespToAppointment(appointment.id, 'declined');
                        }}
                        variant={'destructive'}
                      >
                        Decline
                      </Button>
                      <Button
                        onClick={() => {
                          handleRespToAppointment(appointment.id, 'accepted');
                        }}
                        variant={'outline'}
                      >
                        Approve
                      </Button>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
