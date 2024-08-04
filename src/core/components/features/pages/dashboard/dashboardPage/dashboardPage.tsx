'use client';
import Card, { CardContainer } from '@/core/components/ui/card';
import { Users, Workflow, CalendarCheck2, Ratio, HandshakeIcon } from 'lucide-react';
import { useAppointmentStore, useUserStore } from '@/store';
import Image from 'next/image';
import { useEffect } from 'react';
import * as Queries from '@/core/utils/queries';
import ProfileAvatar from '@/core/components/molecules/Avatar';
import { formatDistanceToNow } from 'date-fns';

const cardData = [
  {
    label: 'Services',
    text: '03/05',
    icon: Workflow,
    description: 'number services'
  },
  {
    label: 'Rating',
    text: '3 Stars',
    icon: Workflow,
    description: 'your average rating based on you services'
  },
  {
    label: 'Appointments',
    text: '0',
    icon: Workflow,
    description: 'you most resent Appointments'
  },
  {
    label: 'delivered Services',
    text: '03/05',
    icon: Workflow,
    description: 'total number of services delivered'
  }
];

export default function DashboardPage() {
  const { user } = useUserStore();
  const { receivedappointments, setReceivedAppointments } = useAppointmentStore();

  const getAnointments = async (id: string) => {
    await Queries.getReceivedAnointments(id).then((data) => {
      setReceivedAppointments(data);
      console.log('data', data);
    });
  };

  useEffect(() => {
    getAnointments(user.id);
  }, []);
  return (
    <section className="w-full h-full py-3 px-3 space-y-4">
      <section className=" justify-between grid grid-cols-2 w-full gap-3 mobile:max-lg:grid-cols-1 pt-2 mobile:max-md:pt-8">
        <CardContainer className="w-full h-64 bg-slate-200 flex justify-between relative">
          <div className=" self-start w-full m-auto">
            <h3 className="text-3xl font-bold">Hi, {user.name}</h3>
            <p>Ready to grow you service business</p>
          </div>
          <div className=" w-[50%]">
            <Image
              src={'/dashboard_hero.png'}
              width={300}
              height={300}
              alt=""
              className="absolute bottom-[-20px] right-0 mobile:max-sm:hidden"
            />
          </div>
        </CardContainer>
        <CardContainer></CardContainer>
      </section>
      <section className="grid grid-cols-4 gap-3 mobile:max-lg:grid-cols-2">
        {cardData.map((data, index) => (
          <Card
            key={index}
            label={data.label}
            icon={data.icon}
            text={data.text}
            description={data.description}
          />
        ))}
      </section>
      <section className="grid grid-cols-2 gap-2 h-[45vh] flex-wrap mobile:max-md:grid-cols-1">
        <CardContainer className="h-full">
          <h2 className="font-semibold">Statistics</h2>
        </CardContainer>
        <CardContainer className="h-full flex flex-col">
          <h2 className="font-semibold">Resent Appointment</h2>

          <div className="w-full h-full">
            {!receivedappointments.length ? (
              <div className=" m-auto ">
                <h3 className=" text-center pt-32 text-gray-600 text-sm">no recent Appointment!</h3>
              </div>
            ) : (
              <div className="space-y-2">
                {receivedappointments.slice(0, 4).map((appointment, index) => (
                  <CardContainer
                    key={index}
                    className="flex justify-between items-center hover:cursor-pointer hover:bg-slate-100 duration-300">
                    <div className="flex gap-2">
                      <ProfileAvatar size={4} image={appointment.user.image} />
                      <div>
                        <p className="font-semibold">{appointment.user.name}</p>
                        <p className="text-xs text-gray-500">{appointment.user.email}</p>
                      </div>
                    </div>
                    <p> {formatDistanceToNow(appointment.createdAt, { addSuffix: true })}</p>
                  </CardContainer>
                ))}
              </div>
            )}
          </div>
        </CardContainer>
      </section>
    </section>
  );
}
