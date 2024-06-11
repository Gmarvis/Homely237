"use client";
import NavBar from "@/components/organisms/NavBar";
import { useParams, usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import * as Queries from "@/utils/queries";
// react icons
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import DatePicker from "./_components/DatePicker";
import useUserStore from "@/store/userStore";

const Page = () => {
    const [service, setService] = useState<Service | null>();
    const [location, setLocation] = useState("");
    const [selectedDate, setSelectedDate] = useState<Date>();
    const [description, setDescription] = useState("");
    const { user } = useUserStore();
    // get Service Id form the params
    const serviceId = usePathname().split("/")[2];
    console.log("serviceId", serviceId);
    const service_id = useParams().id;

    useEffect(() => {
        Queries.getServiceByServiceID(serviceId).then((res: Service) => {
            if (res.id) {
                setService(res);
                console.log(res);
            }
        });
    }, []);

    const handleBooking = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        const bookingDetails = {
            user_id: user.id,
            provider_id: service?.user?.id,
            product_id: serviceId,
            location,
            selectedDate,
            description,
        };

        console.log("bookingDetails", bookingDetails);
    };

    return (
        <div>
            <NavBar hideSearchBar={true} onDashBoard={false} />
            <div className="flex justify-center items-center mobile:max-sm:justify-start  mobile:max-sm:items-start   pt-[60px] h-[100vh] w-full relative">
                <div className="w-[40rem] flex flex-col justify-center mobile:max-sm:w-full h-[35rem]  p-2 bg-white absolute sm:shadow-md">
                    <div className="max-w-md self-center text-center mb-10">
                        <h1 className="text-center font-bold">
                            Ready to Book your service?
                        </h1>
                        <p className="text-xs text-gray-700">
                            lets make sure the provider get what you need by
                            providing details in the form bellow
                        </p>
                    </div>

                    <form
                        onSubmit={handleBooking}
                        className="flex flex-col gap-4 space-y-3"
                    >
                        <div>
                            <Label>Discribe your location</Label>
                            <Input
                                onChange={(e) => setLocation(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col">
                            <Label>Enter date</Label>
                            <DatePicker onSelectDate={setSelectedDate} />
                        </div>
                        <div>
                            <Label className="flex py-1 justify-between">
                                <p>
                                    Describe what you need to help the provider
                                    come prepared
                                </p>
                                <span
                                    className={`${
                                        description.length < 600
                                            ? "text-red-600"
                                            : "text-green-600"
                                    }`}
                                >
                                    {description.length || 0}/ 600
                                </span>
                            </Label>
                            <Textarea
                                className="text-gray-800"
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>

                        <Button className="bg-primarytheme">Book Now</Button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Page;

// todo
// 1 prevent users from adding past dates
// 2
