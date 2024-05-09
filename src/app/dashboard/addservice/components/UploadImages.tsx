import { ActionBtn } from "@/components/atoms/buttons/ActionBtn";
import ProductImageCard from "@/components/molucles/ProductImageCard";
import { SingleImageDropzone } from "@/components/molucles/SingleImageDropZone";
import { Button } from "@/components/ui/button";
import { useEdgeStore } from "@/lib/edgestore";
import { LOCAL_STORAGE } from "@/utils/storage";
import { progress } from "framer-motion";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const UploadImages = ({ onPrevClick }: { onPrevClick: () => void }) => {
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
        <div className="flex flex-col max-w-lg w-full gap-4  justify-center items-center  p-2 ">
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

            <div className="flex  gap-3 mobile:max-sm:gap-2   justify-start pt-1">
                {!images.length && (
                    <div className="h-[100px] justify-center text-center items-center w-full">
                        <p className="text-sm text-slate-400">
                            Upload 4 images of you you performing your service
                        </p>
                    </div>
                )}
                {images.map((image: any, i: React.Key | null | undefined) => (
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
                ))}
            </div>
            <div className="flex justify-between w-full ">
                <Button onClick={onPrevClick} className=" px-10 bg-slate-500">
                    prev
                </Button>
                <Button className="bg-primarytheme px-10">Next</Button>
            </div>
        </div>
    );
};

export default UploadImages;
