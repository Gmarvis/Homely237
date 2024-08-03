'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import { getAppointmentById } from '@/core/utils/queries';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/core/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { LogoLoader } from '@/core/components/loaders';
import { dateFormatter } from '@/core/utils/date';
import { useUserStore } from '@/store';

import { formatDistanceToNow } from 'date-fns';

export default function AppointmentDetailsPage() {
  const [appointment, SetAppointment] = useState<Appointment>();
  const id = useParams().id;

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

  return (
    <div className="w-full h-full  flex flex-col justify-center bg-slate-100">
      {!appointment ? (
        <div className="w-[50%] mobile:max-lg:w-full mobile:max-lg:m-0 lg:max-2xl:w-[60%] m-auto shadow h-[85vh] flex flex-col justify-between bg-white rounded-md p-2 space-y-5">
          <div className="m-auto rounded-full ">
            <LogoLoader />
          </div>
        </div>
      ) : (
        <div className="w-[50%] mobile:max-lg:w-full mobile:max-lg:m-0 mobile:max-lg:h-auto lg:max-2xl:w-[60%] m-auto shadow h-[85vh] flex flex-col justify-between bg-white rounded-md p-2 space-y-5">
          <div className="flex justify-between">
            <Button onClick={() => router.back()} variant={'outline'} className="text-gray-700">
              <ArrowLeft />
            </Button>

            <Badge variant={'secondary'}>
              {formatDistanceToNow(appointment.createdAt, { addSuffix: true })}
            </Badge>
          </div>
          <div className="space-y-4 flex-grow">
            <div className="flex w-full justify-center items-center p-5">
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
                <span className="font-semibold">Location Details: </span>{' '}
                {appointment?.location_details}
              </h3>

              <p>
                <span className="font-semibold">Location Details: </span> {appointment?.description}
              </p>
            </div>
          </div>

          <div className=" flex justify-end gap-3">
            {user.id === appointment.user_id ? (
              <>
                <Button variant={'outline'}>Edit Appointment</Button>
              </>
            ) : (
              <>
                <Button variant={'destructive'}>Decline</Button>
                <Button variant={'outline'}>Approve</Button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
