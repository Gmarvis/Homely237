'use client';
import { Navbar } from '@/core/components/organisms/';
import { useParams, usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import * as Queries from '@/core/utils/queries';
import { Input } from '@/core/components/ui/input';
import { Label } from '@/core/components/ui/label';
import { Textarea } from '@/core/components/ui/textarea';
import { Button } from '@/core/components/ui/button';
import DatePicker from './_components/DatePicker';
import useUserStore from '@/store/userStore';
import useLocationStore from '@/store/locationStore';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/core/components/ui/form';
import { ActionBtn } from '@/core/components/atoms/buttons/ActionBtn';

const Page = () => {
  const [service, setService] = useState<Service | null>();
  const [location, setLocation] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date>();
  const { user } = useUserStore();
  const serviceId = usePathname().split('/')[2];
  const [isLoading, setIsLoading] = useState(false);
  const [dateError, setDateError] = useState('');
  // console.log("serviceId", serviceId);

  const { currentLocation } = useLocationStore();

  // form schema
  const formSchema = z.object({
    phone_number: z
      .string()
      .min(9, { message: 'number should not be less than (9) digits' })
      .max(9, { message: 'number should not be greater than (9) digits' }),
    location_details: z.string().min(10, { message: 'details should be at least 10 characters' }),
    description: z.string().min(100, { message: 'description should be at least 10 characters' })
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!selectedDate) {
      setDateError('date is required');
      return;
    }
    setIsLoading(true);
    const bookingDetails = {
      ...values,
      user_id: user.id,
      provider_id: service?.user?.id,
      product_id: serviceId,
      city: currentLocation.city,
      locality: currentLocation.locality,
      date: selectedDate
    };

    const data = await Queries.createAppointment(bookingDetails);
    console.log(data);
    setIsLoading(false);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone_number: ''
    }
  });
  useEffect(() => {
    Queries.getServiceByServiceID(serviceId).then((res: Service) => {
      if (res.id) {
        setService(res);
        console.log(res);
      }
    });
  }, []);
  return (
    <div className=" h-screen">
      <Navbar hideSearchBar={true} onDashBoard={false} />
      <div className="flex pt-[10rem] md:max-xl:pt-[5rem] h-full pb-10 mobile:max-md:w-full mobile:max-md:pt-[5rem] px-24 gap-10 justify-center items-center mobile:max-lg:flex-col mobile:max-md:px-2 ">
        <div
          className="bg-cover bg-center self-center text-center w-[50%] h-full mobile:max-md:w-full mobile:max-lg:w-full rounded-lg"
          style={{
            backgroundImage: `url('${service?.product_image}')`
          }}
        >
          <div className="bg-slate-900/70 h-full w-full rounded-lg flex justify-center items-center text-white">
            <div className="self-center pb-12 pt-24">
              <h1 className="text-center  font-bold">Book an Appointment with</h1>
              <h1 className="text-center text-6xl font-bold">{service?.name}</h1>
              <p className="text-sm text-gray-300">
                lets make sure the provider get what you need by providing details in the form
                bellow
              </p>
            </div>
          </div>
        </div>
        <div className="w-[50rem] flex flex-col mobile:max-sm:w-full h-full relative  p-4 bg-white  sm:shadow-md">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 space-y-3">
              <div>
                <p> City: {currentLocation.city}</p>
                <p> Locality: {currentLocation.locality}</p>
              </div>
              <div className="flex flex-col">
                <Label>Enter date</Label>
                <DatePicker
                  onSelectDate={(date) => {
                    setSelectedDate(date);
                    setDateError('');
                  }}
                />
                {dateError && <p className="text-sm font-semibold text-red-500">{dateError}</p>}
              </div>
              <FormField
                control={form.control}
                name="phone_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>WhatsApp number</FormLabel>
                    <FormControl>
                      <Input placeholder="670000000" {...field} type="number" />
                    </FormControl>
                    <FormDescription>
                      This should be an active whatsApp number do not include country code.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location_details"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Describe your location</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter location details here" {...field} type="text" />
                    </FormControl>
                    <FormDescription>
                      A short description of your preside location will help
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea className="text-gray-800 min-h-40" {...field} />
                    </FormControl>
                    <FormDescription>
                      To help the service provider come prepare, explain what you need here
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />{' '}
              <div className="flex absolute bottom-2 right-2 w-full items-end justify-end">
                <ActionBtn className="self-end justify-end" loading={isLoading}>
                  Book Now
                </ActionBtn>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Page;

//  todo
// 1 prevent users from adding past dates
// 2
