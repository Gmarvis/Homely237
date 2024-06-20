'use client';
import React, { useEffect, useState } from 'react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import useCategoryStore from '@/store/categoryStore';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    Select
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import Steps from '@/app/booking/[service_id]/_components/Steps';
import { LOCAL_STORAGE } from '@/utils/storage';
import UploadImages from './components/UploadImages';
import CreatePage from './components/CreatePage';
import SuccessPage from './components/SuccessPage';
import ConfirmLocation from './components/ConfirmLocation';

const formSchema = z.object({
    name: z.string().min(5, {
        message: 'name must contain at least 5 character(s)'
    }),
    price: z.string().min(3, {
        message: 'price must contain at least 3 digits'
    }),
    category_id: z.string({
        message: 'category is required'
    }),
    description: z.string().min(50)
});

interface FormDataType {
    name: string;
    price: string;
    category_id: string;
    description: string;
    city: string;
    locality: string;
}

const Page = () => {
    const [currentStep, setCurrentStep] = useState<number>(
        JSON.parse(localStorage.getItem('serviceData') || '{}').currentStep || 1
    );
    const [data, setData] = useState<FormDataType>(
        JSON.parse(localStorage.getItem('serviceData') || '{}').serviceDetails
    );
    const [categotyError, setCategoryError] = useState('');
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: data?.name || '',
            price: data?.price || '',
            category_id: data?.category_id || '',
            description: data?.description || ''
        }
    });

    const handleSubmit = (value: z.infer<typeof formSchema>) => {
        if (!value.category_id) {
            setCategoryError('categoty is required');
            return;
        }
        setCategoryError('');

        const category = categories.find((cat) => cat.id === value.category_id);
        const serviceDetails = { ...value, category_name: category?.name };
        LOCAL_STORAGE.save('serviceData', { currentStep: 2, serviceDetails });
        setCurrentStep(2);
    };

    const { categories } = useCategoryStore();

    const serviceData = JSON.parse(localStorage.getItem('serviceData') || '{}');

    useEffect(() => {
        // console.log(serviceData);
        if (serviceData.currentStep) {
            // setCurrentStep(serviceData.currentStep);
            setData(serviceData.serviceDetails);
        }
    }, [setCurrentStep, currentStep]);

    return (
        <div className="flex flex-col w-full  justify-center items-center mobile:max-sm:mb-40">
            <div className="max-w-3xl w-full">
                <h1 className="text-center text-2xl pt-6 text-gray-700 font-bold">
                    Create a service in few simple steps
                </h1>
                <Steps
                    steps={{
                        stpesCount: [1, 2, 3, 4],
                        currentStep: currentStep
                    }}
                />
            </div>

            <div className="flex flex-col w-full h-full  justify-center items-center">
                {currentStep === 1 && (
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(handleSubmit)}
                            className="max-w-3xl w-full flex flex-col gap-4 h-[55vh]">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => {
                                    return (
                                        <FormItem>
                                            <FormLabel>Service name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="enter service name"
                                                    type="text"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    );
                                }}
                            />
                            <FormField
                                control={form.control}
                                name="price"
                                render={({ field }) => {
                                    return (
                                        <FormItem>
                                            <FormLabel>Price per hour</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="enter price"
                                                    type="number"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    );
                                }}
                            />

                            <FormField
                                control={form.control}
                                name="category_id"
                                render={({ field }) => {
                                    return (
                                        <FormItem>
                                            <FormLabel>Category</FormLabel>
                                            <Select onValueChange={field.onChange} {...field}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="select service category" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {categories?.map((category) => (
                                                        <SelectItem
                                                            key={category.id}
                                                            value={category.id}>
                                                            {category.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                                {categotyError && (
                                                    <span className="text-xs text-red-600">
                                                        {categotyError}
                                                    </span>
                                                )}
                                            </Select>

                                            <FormMessage />
                                        </FormItem>
                                    );
                                }}
                            />
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => {
                                    return (
                                        <FormItem className="flex flex-grow flex-col">
                                            <FormLabel>Description</FormLabel>
                                            <FormControl>
                                                <Textarea placeholder="description" {...field} className='h-full'/>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    );
                                }}
                            />
                            <Button className="w-full bg-primarytheme hover:bg-secondrytheme">
                                continue
                            </Button>
                        </form>
                    </Form>
                )}

                {currentStep === 2 && (
                    <ConfirmLocation
                        onNextClick={() => setCurrentStep(3)}
                        onClickBack={() => setCurrentStep((prev) => prev - 1)}
                    />
                )}

                {currentStep === 3 && (
                    <UploadImages
                        onNextClick={() => setCurrentStep(4)}
                        onClickBack={() => {
                            setCurrentStep(2);
                            setData(serviceData.serviceDetails);
                        }}
                    />
                )}
                {currentStep === 4 && (
                    <CreatePage
                        onClickBack={() => setCurrentStep(2)}
                        onCreateSuccess={() => setCurrentStep(5)}
                    />
                )}
                {currentStep === 5 && <SuccessPage />}
            </div>
        </div>
    );
};

export default Page;
