'use client';
import NavBar from '@/components/organisms/NavBar';
import { useParams, usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import * as Queries from '@/utils/queries';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
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
} from '@/components/ui/form';
import { ActionBtn } from '@/components/atoms/buttons/ActionBtn';

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
        location_detials: z.string().min(10, { message: 'details hould be atleast 10 characters' }),
        description: z.string().min(100, { message: 'description hould be atleast 10 characters' })
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

        const data = await Queries.creatApointment(bookingDetails);
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
        <div className=" h-full">
            <NavBar hideSearchBar={true} onDashBoard={false} />
            <div className="flex pt-[10rem] md:max-xl:pt-[5rem] pb-10 mobile:max-md:pt-[5rem] px-24 gap-10 justify-center mobile:max-lg:flex-col mobile:max-md:px-2 ">
                <div className="self-center text-center mb-10 w-[30%] mobile:max-lg:w-full">
                    <h1 className="text-center text-3xl font-bold">Ready to Book your service?</h1>
                    <p className="text-sm text-gray-700">
                        lets make sure the provider get what you need by providing details in the
                        form bellow
                    </p>
                </div>
                <div className="w-[50rem] flex flex-col mobile:max-sm:w-full h-auto  p-2 bg-white  sm:shadow-md">
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="flex flex-col gap-4 space-y-3">
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
                                {dateError && (
                                    <p className="text-sm font-semibold text-red-500">
                                        {dateError}
                                    </p>
                                )}
                            </div>
                            <FormField
                                control={form.control}
                                name="phone_number"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>WhatsApp number</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="670000000"
                                                {...field}
                                                type="number"
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            This should be an active whatsApp number do not include
                                            country code.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="location_detials"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Discribe your location</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter location details here"
                                                {...field}
                                                type="text"
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            A short description of your presice location will help
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
                                            <Textarea
                                                className="text-gray-800 min-h-40"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            To help the service provider come prepare, explain what
                                            you need here
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />{' '}
                            <div className="flex w-full items-end justify-end">
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
