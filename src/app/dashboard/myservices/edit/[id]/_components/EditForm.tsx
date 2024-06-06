"use client";
import ImageUpLoader from "@/components/organisms/ImageUpLoader";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import * as Queries from "@/utils/queries";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import useCategoryStore from "@/store/categoryStore";
import { ActionBtn } from "@/components/atoms/buttons/ActionBtn";
import { toast } from "react-toastify";
import { MdOutlineArrowBack } from "react-icons/md";
import DedicatedLoader from "@/app/dashboard/_components/DedicatedLoader";

const EditServiceForm = () => {
    const [service, setService] = useState<Service>();
    const service_id = useParams().id.toString();
    const { categories } = useCategoryStore();

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category_id, setCategory_id] = useState("");
    const [category_name, setCategory_name] = useState("");
    const [description, setDescription] = useState("");
    const [product_image, setProduct_image] = useState("");
    const [images, setImages] = useState<any>(service?.images);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if (service) {
            setName(service.name);
            setPrice(service.price);
            setCategory_id(service.category_id);
            setCategory_name(service.category_name);
            setDescription(service.description);
            setProduct_image(service.product_image);
            setImages(service.images);
        }
    }, [service]);

    useEffect(() => {
        Queries.getServiceByServiceID(service_id).then((res: Service) => {
            if (res.id) {
                setService(res);
            }
        });
    }, []);

    // hande update service
    const handleUpdate = async () => {
        setLoading(true);
        const serviceData = {
            name,
            price,
            category_id,
            category_name,
            description,
            product_image,
            images,
        };

        if (service && service.id) {
            if (
                !name ||
                !price ||
                !category_id ||
                !description ||
                !product_image
            ) {
                toast.error(`all fields are required!`, {
                    position: "top-right",
                    hideProgressBar: true,
                    closeOnClick: true,
                });
                setLoading(false);
                return;
            }
            const updatedData = await Queries.updateService(
                service.id,
                serviceData
            );
            if (updatedData && updatedData.id) {
                toast.success("service updated seccessfully", {
                    position: "top-right",
                    hideProgressBar: true,
                    closeOnClick: true,
                });
                setLoading(false);
            } else if (!updatedData.id) {
                toast.error(
                    `failed to update service!} ${updatedData.message.toString()})}`,
                    {
                        position: "top-right",
                        hideProgressBar: true,
                        closeOnClick: true,
                    }
                );
                setLoading(false);
            }
            setLoading(false);
        }
    };

    const router = useRouter();

    if (!service) {
        return <DedicatedLoader />;
    }

    return (
        <div className="w-full pb-4">
            {service && (
                <div>
                    <h3 className="text-2xl  gap-10 bigScreen:gap-36 flex items-center w-full bg-slate-300 p-4  shadow-inner shadow-black/2 font-mono text-gray-800 ">
                        <button onClick={() => router.back()}>
                            {" "}
                            <MdOutlineArrowBack size={24} />{" "}
                        </button>
                        Edit Service Details
                    </h3>
                    <div className=" h-full flex justify-between mobile:max-lg:flex-col-reverse gap-5 py-4 px-4 bigScreen:px-40 bigScreen:py-20">
                        <div className=" w-[50%] mobile:max-md:w-full space-y-2 px-4">
                            <div>
                                <Label>Service name</Label>
                                <Input
                                    defaultValue={service?.name}
                                    className="text-sm text-gray-800"
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div>
                                <Label>Price per hour</Label>
                                <Input
                                    onChange={(e) => setPrice(e.target.value)}
                                    defaultValue={service?.price}
                                    className="text-sm text-gray-800"
                                />
                            </div>
                            <div>
                                <Label>Categrory</Label>
                                <Select
                                    onValueChange={(id) => {
                                        setCategory_id(id);
                                        const cat = categories.find(
                                            (cat) => cat.id === id
                                        );
                                        if (cat) {
                                            setCategory_name(cat.name);
                                        }
                                    }}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="select service category" />
                                    </SelectTrigger>

                                    <SelectContent className="text-sm text-gray-800">
                                        {categories?.map((category) => (
                                            <SelectItem
                                                key={category.id}
                                                value={category.id}
                                            >
                                                {category.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label>Description</Label>
                                <Textarea
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                    defaultValue={service?.description}
                                    className="text-sm text-gray-800 min-h-52"
                                />
                            </div>
                        </div>
                        <div className=" w-[50%] mobile:max-md:w-full border rounded-b-sm mobile:max-md:px-4 mobile:max-md:justify-center  flex justify-end ">
                            {service && (
                                <ImageUpLoader
                                    onUpdateMainImage={(image) =>
                                        setProduct_image(image)
                                    }
                                    onImagesUpload={(images) =>
                                        setImages(images)
                                    }
                                    allImages={service?.images}
                                    product_image={service?.product_image}
                                />
                            )}
                        </div>
                    </div>
                    <div className="flex justify-end pr-6 bigScreen:pr-40">
                        <ActionBtn
                            title="Update"
                            loading={loading}
                            onClick={handleUpdate}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default EditServiceForm;
