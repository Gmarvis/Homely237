"use client";
import React, { useState } from "react";
import FormInput from "../atoms/FormInput";
import Link from "next/link";
import { IoBookOutline } from "react-icons/io5";
import FormBtn from "../atoms/buttons/FormBtn";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
// STORE IMPORTS
import useCategoryStore from "@/store/categoryStore";
import useUserStore from "@/store/userStore";
import { createService } from "@/utils/queries";
import DailogBox from "../atoms/DailogBox";
import Spinner from "../atoms/Spinner";
import { ActionBtn } from "../atoms/buttons/ActionBtn";

const CreateServiceForm = () => {
    const { categories } = useCategoryStore();
    const { user } = useUserStore();
    const [serviceName, setServiceName] = useState("");
    const [category_name, setCategory_name] = useState("");
    const [category_id, setCategory_id] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // router
    const router = useRouter();

    const handleAddService = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        //get service images from localstatorage
        const images = JSON.parse(
            localStorage.getItem("service_images") || "[]"
        );
        const product_image = localStorage.getItem("main_image") || images[0];

        // form error
        if (!serviceName || !category_name || !description) {
            toast.warning("Please fill the form completely", {
                position: "top-right",
                hideProgressBar: true,
                autoClose: 3000,
            });
            return;
        }

        // image error
        if (!images.length) {
            toast.warning("Please add service images", {
                position: "top-right",
                hideProgressBar: true,
                autoClose: 3000,
            });
            return;
        }
        setIsLoading(true);
        const serviceDetails = {
            user_id: user.id,
            name: serviceName,
            category_name: category_name,
            images: images,
            product_image,
            price,
            category_id,
            description,
        };
        console.log("serviceDetails", serviceDetails);
        // create service by making a post request to the backend server
        createService(serviceDetails).then((res) => {
            if (res.error) {
                console.log("failded to create service", res.message);
                return;
            }
            toast.success("Service Added successfuly", {
                position: "top-right",
                hideProgressBar: true,
                autoClose: 3000,
            });
            console.log("responce", res);
            localStorage.removeItem("main_image");
            localStorage.removeItem("service_images");

            setIsLoading(false);
            router.push("/dashboard/myservices");
        });
    };

    return (
        <form
            action=""
            onSubmit={handleAddService}
            className="w-full h-auto flex flex-col "
        >
            <label htmlFor="name" className="text-slate-700 pt-2">
                Title{" "}
                <span className="text-xs">
                    (eg, cleaning, babbing, cooking, etc)
                </span>
            </label>
            <FormInput
                label={"Service Title"}
                onChange={(e) => setServiceName(e.target.value)}
                styles="border border-gray-400"
            />
            <div className="w-full flex flex-col text-sm">
                <label htmlFor="price" className="pt-3 text-gray-800">
                    Price/hour <span className="text-xs">(eg 2000 CFA)</span>
                </label>
                <input
                    type="number"
                    name="price"
                    placeholder="2000CFA/hour"
                    onChange={(e) => setPrice(e.target.value)}
                    className="bg-transparent w-full text-sm outline-none border border-gray-400 p-2"
                />
            </div>
            <div className=" flex flex-col text-sm">
                <label htmlFor="Category" className="pt-3 text-gray-800">
                    Category
                </label>
                <select
                    name="Category"
                    id=""
                    onChange={(e) => {
                        setCategory_id(e.target.value);
                        const catName = categories.find(
                            (cat) => cat.id === e.target.value
                        );
                        if (catName) setCategory_name(catName?.name);
                    }}
                    className="bg-transparent text-sm w-full outline-none border border-gray-400 py-2 px-1"
                >
                    <option> select a category</option>
                    {categories?.map((category, i) => (
                        <option key={i} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>
            <label htmlFor="description" className="pt-3 text-gray-800">
                Description
            </label>
            <textarea
                name=""
                id=""
                onChange={(e) => setDescription(e.target.value)}
                // cols="30
                // rows="10"
                className="h-[180px] outline-none border border-gray-400 p-2 text-sm"
                placeholder="Give clear description of the sercive your are provide, this will make your sercive stand out and atract more custumers"
            ></textarea>
            <div className="flex absolute bottom-0  mt-10 right-20 mobile:max-sm:bottom-4 mobile:max-sm:right-2">
                <ActionBtn
                    title="create"
                    onClick={() => {}}
                    loading={isLoading}
                />
            </div>
            <Link
                href={""}
                className="text-secondrytheme text-xs text-center flex items-center w-full justify-center gap-3"
            >
                <p>To get better Results, Read our Guide </p>
                <IoBookOutline size={20} />
            </Link>
        </form>
    );
};

export default CreateServiceForm;
