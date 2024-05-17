"use client";
import NavBar from "@/components/organisms/NavBar";
import React from "react";
import ProfileSection from "../_components/ProfileSection";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const page = () => {
    return (
        <div>
            <NavBar />
            <div className="pt-[58px] px-24 w-full  mobile:max-sm:px-2 pb-10">
                <div className="w-full flex justify-center">
                    <div className=" max-w-2xl mobile:max-sm:max-w-full mobile:max-sm:w-full w-full space-y-3">
                        <ProfileSection />
                        <form>
                            <Label className=" text-gray-600 text-xs">
                                Name
                            </Label>
                            <Input placeholder="name" />
                            <Label className=" text-gray-600 text-xs">
                                Phone number (whatsapp)
                            </Label>
                            <Input placeholder="Phone number" type="number" />
                            <Label className=" text-gray-600 text-xs">
                                Location
                            </Label>
                            <Input placeholder="location" />
                            <Label className=" text-gray-600 text-xs">
                                National ID card front image
                            </Label>
                            <Input type="file" />
                            <Label className=" text-gray-600 text-xs">
                                National ID card back image
                            </Label>
                            <Input type="file" />
                            <Label className=" text-gray-600 text-xs">
                                Bio (say something about yourself)
                            </Label>

                            <Textarea />

                            <Button className="bg-primarytheme mt-5">
                                Procceed
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default page;
