"use client";
import React, { useEffect, useRef, useState } from "react";
import ProductImageCard from "@/components/molucles/ProductImageCard";
import CreateServiceForm from "@/components/organisms/CreateServiceForm";

// EdgeStoreImports
import { useEdgeStore } from "@/lib/edgestore";
import { SingleImageDropzone } from "@/components/molucles/SingleImageDropZone";
// import { deleteObject } from '@edgestore/client';

import { ImagePlus } from "lucide-react";
import { LOCAL_STORAGE } from "@/utils/storage";
import { toast } from "react-toastify";
import { ActionBtn } from "@/components/atoms/buttons/ActionBtn";

const Page = () => {
    // store upload
    const [file, setFile] = React.useState<File>();
    const { edgestore } = useEdgeStore();
    const [progress, setProgress] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const [images, setImages] = useState<string[]>([]);
    const [mainImage, setMainImage] = useState("");

    const savedImages = localStorage.getItem("service_images") || "[]";

    useEffect(() => {
        // if (savedImages) setImages(JSON.parse(savedImages));

        setMainImage(localStorage.getItem("main_image") || "");
    }, []);

    const setmainImg = (image: string) => {
        setMainImage(image);
        localStorage.setItem("main_image", image);
    };

    const handleDeleteImage = async (image: string) => {
        /*>>>>>>>>>> TODO<<<<<<<<<<*/
        /*>>>>>>>>>> ADD A FUCTION THAT DELETES IMAGE FROM EDGESTORE <<<<<<<<<<*/

        const updateImages: any = images.filter((img: string) => img !== image);
        if (mainImage === image) {
            setMainImage("");
            localStorage.removeItem("main_image");
        }
        setImages(updateImages);
        localStorage.setItem("service_images", updateImages);
    };

    const uplaodImage = async () => {
        if (file) {
            if (images.length === 4) {
                toast.warning("You can only uplaod 4 images", {
                    position: "top-right",
                    hideProgressBar: true,
                    autoClose: 3000,
                });
                return;
            }
            setProgress(0);
            setIsLoading(true);
            const res = await edgestore.publicFiles.upload({
                file,
                onProgressChange: (preg) => setProgress(preg),
            });
            setImages([...images, res.url]);
            LOCAL_STORAGE.save("service_images", [...images, res.url]);
            setIsLoading(false);
            // console.log("upload", res);
        }
    };

    return (
        <div className=" w-full mobile:max-sm:h-full   h-[calc(90vh-96px)] flex justify-center items-center mobile:max-sm:mb-[60px] mobile:max-sm:items-start relative pb-10">
            <div className="flex gap-5 mobile:max-sm:flex-col   mobile:max-sm:mt-5 ">
                <div className="w-[40vw] h-[30vw] mobile:max-sm:h-full bg-white mobile:max-sm:w-[98vw] p-2">
                    <div className="form w-full">
                        <h3 className="text-md font-bold text-gray-700 mb-2">
                            SERVICE DETIALS
                        </h3>
                        <CreateServiceForm />
                    </div>
                </div>
                <div className="flex flex-col justify-between h-[400px] p-2 ">
                    <div>
                        <SingleImageDropzone
                            width={450}
                            height={200}
                            value={file}
                            dropzoneOptions={{
                                maxSize: 1024 * 1024 * 1,
                                onFileDialogCancel: () => setProgress(0),
                            }}
                            onChange={(file) => {
                                setFile(file);
                            }}
                            className="mobile:max-sm:hidden"
                        />
                        <div className="w-full flex justify-center items-center sm:hidden ">
                            <SingleImageDropzone
                                width={200}
                                height={200}
                                value={file}
                                dropzoneOptions={{
                                    maxSize: 1024 * 1024 * 1,
                                    onFileDialogCancel: () => setProgress(0),
                                }}
                                onChange={(file) => {
                                    setFile(file);
                                }}
                                className="sm:hidden self-center justify-self-center"
                            />
                        </div>

                        <div className="progress w-full border h-2 my-2">
                            <div
                                style={{
                                    width: `${progress}%`,
                                }}
                                className="h-full w-[50%] transition-all duration-150 bg-green-600"
                            ></div>
                        </div>
                        <div className="flex justify-between">
                            <p className="py-1 text-slate-600 self-end  px-2 rounded-md shadow-md">
                                {images.length}/4
                            </p>
                            <ActionBtn
                                title="upload"
                                loading={isLoading}
                                onClick={uplaodImage}
                            />
                        </div>
                    </div>

                    <div className="flex gap-3 mobile:max-sm:gap-2 mobile:max-sm:mb-40  justify-start pt-1">
                        {!images.length && (
                            <div className="h-[100px] justify-center text-center items-center w-full">
                                <p className="text-sm text-slate-400">
                                    Upload 4 images of you you performing your
                                    service
                                </p>
                            </div>
                        )}
                        {images.map(
                            (image: any, i: React.Key | null | undefined) => (
                                <ProductImageCard
                                    key={i}
                                    image={image}
                                    showBadge={image === mainImage}
                                >
                                    <button
                                        className="text-sm hover:bg-slate-300  text-slate-600 p-1 duration-300"
                                        onClick={() => setmainImg(image)}
                                    >
                                        set as main
                                    </button>
                                    <button
                                        className="text-sm hover:bg-slate-300  text-red-600 p-1 duration-300"
                                        onClick={() => handleDeleteImage(image)}
                                    >
                                        Delete
                                    </button>
                                </ProductImageCard>
                            )
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;

// PESIST IMAGES SAVING THEM TO THE LOCAL STORAGE
