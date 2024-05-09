"use client";
import React, { useEffect, useState } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useCategoryStore from "@/store/categoryStore";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    Select,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import Steps from "@/app/booking/[service_id]/_components/Steps";
import { LOCAL_STORAGE } from "@/utils/storage";
import UploadImages from "./components/UploadImages";

const formSchema = z.object({
    title: z.string().min(5, {
        message: "title must contain at least 5 character(s)",
    }),
    price: z.string().min(3, {
        message: "price must contain at least 3 digits",
    }),
    category_id: z.string({
        message: "category is required",
    }),
    description: z.string().min(50),
});

const Page = () => {
    const [currentStep, setCurrentStep] = useState<number>(
        JSON.parse(localStorage.getItem("serviceData") || "{}").currentStep || 1
    );
    const [data, setData] = useState({
        title: "",
        price: "",
        category_id: "",
        description: "",
    });
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: data.title,
            price: data.price,
            category_id: data.category_id,
            description: data.description,
        },
    });

    const handleSubmit = (value: z.infer<typeof formSchema>) => {
        const category = categories.find((cat) => cat.id === value.category_id);
        const serviceDetails = { ...value, category_name: category?.name };
        LOCAL_STORAGE.save("serviceData", { currentStep: 2, serviceDetails });
        setCurrentStep(2);
    };

    const { categories } = useCategoryStore();

    const serviceData = JSON.parse(localStorage.getItem("serviceData") || "{}");

    useEffect(() => {
        // console.log(serviceData);
        if (serviceData.currentStep) {
            // setCurrentStep(serviceData.currentStep);
            setData(serviceData.serviceDetails);
        }
    }, [setCurrentStep, currentStep]);

    return (
        <div className="flex flex-col w-full  justify-center items-center">
            <div className="max-w-lg w-full">
                <h1 className="text-center text-2xl py-2 text-gray-700 font-bold">
                    Create a service in Few simple steps
                </h1>
                <Steps
                    steps={{
                        stpesCount: [1, 2, 3],
                        currentStep: currentStep,
                    }}
                />
            </div>
            <div className="flex flex-col w-full h-full  justify-center items-center">
                {currentStep === 1 && (
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(handleSubmit)}
                            className="max-w-lg w-full flex flex-col gap-4"
                        >
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => {
                                    return (
                                        <FormItem>
                                            <FormLabel>Service Title</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="enter service title"
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
                                            <FormLabel>
                                                Price per hour
                                            </FormLabel>
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
                                            <Select
                                                onValueChange={field.onChange}
                                                {...field}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="select service category" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {categories?.map(
                                                        (category) => (
                                                            <SelectItem
                                                                key={
                                                                    category.id
                                                                }
                                                                value={
                                                                    category.id
                                                                }
                                                            >
                                                                {category.name}
                                                            </SelectItem>
                                                        )
                                                    )}
                                                </SelectContent>
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
                                        <FormItem>
                                            <FormLabel>Description</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="description"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    );
                                }}
                            />
                            <Button className="w-full bg-primarytheme">
                                continue
                            </Button>
                        </form>
                    </Form>
                )}
                {currentStep === 2 && (
                    <UploadImages
                        onPrevClick={() => {
                            setCurrentStep(1);
                            setData(serviceData.serviceDetails);
                        }}
                    />
                )}
            </div>
        </div>
    );
};

export default Page;
