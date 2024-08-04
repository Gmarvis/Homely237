'use client';
import Card, { CardContainer } from '@/core/components/ui/card';
import { Users } from 'lucide-react';
import { useUserStore } from '@/store';
import Image from 'next/image';

export default function DashboardPage() {
  const { user } = useUserStore();
  return (
    <section className="w-full h-full py-3 px-3 space-y-4">
      <section className=" justify-between grid grid-cols-2 w-full gap-3 mobile:max-lg:grid-cols-1 pt-2">
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
              className="absolute bottom-[-20px] right-0"
            />
          </div>
        </CardContainer>
        <CardContainer></CardContainer>
      </section>
      <section className="grid grid-cols-4 gap-3 mobile:max-lg:grid-cols-2">
        <Card
          label={'Services'}
          icon={Users}
          text={'03/05'}
          description={'you most resent Appointments'}
        />
        <Card
          label={'Appointments'}
          icon={Users}
          text={'10'}
          description={'number of Appointments this week'}
        />{' '}
        <Card
          label={'Rating'}
          icon={Users}
          text={'03 Stars'}
          description={'your average rating based on you services'}
        />{' '}
        <Card
          label={'delivered Services'}
          icon={Users}
          text={'20'}
          description={'you most resent Appointments'}
        />
      </section>
      <section className='flex gap-2 h-[45vh]'>
        <CardContainer className='h-full'>
            <h2 className='font-semibold'>Statistics</h2>
        </CardContainer>
        <CardContainer className='h-full'>
        <h2 className='font-semibold'>Resent Appointment</h2>
        </CardContainer>
      </section>
    </section>
  );
}
