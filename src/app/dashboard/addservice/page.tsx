"use client";
import React, { useRef, useState } from "react";

import { motion } from "framer-motion";

import { IoCloudUploadOutline } from "react-icons/io5";
import { HiDotsHorizontal } from "react-icons/hi";
import ProductImageCard from "@/components/molucles/ProductImageCard";
import { toast } from "react-toastify";
import FormInput from "@/components/atoms/FormInput";
import CreateServiceForm from "@/components/organisms/CreateServiceForm";

// EdgeStoreImports
import { useEdgeStore } from "@/lib/edgestore";
import { SingleImageDropzone } from "@/components/molucles/SingleImageDropZone";
import { ImagePlus } from "lucide-react";

const Page = () => {
  // store upload
  const [file, setFile] = React.useState<File>();
  const { edgestore } = useEdgeStore();
  const [progress, setProgress] = useState(0);

  const [images, setImages] = useState<any>([]);
  const [mainImage, setMainImage] = useState("");

  const inputRef: any = useRef();

  const handleImageUpload = async (e: any) => {
    // console.log(e.target.files);
    if (images.length === 4) {
      toast.warning("You can only uplaod 4 images", {
        position: "top-right",
        hideProgressBar: true,
        autoClose: 3000,
      });
      return;
    }

    const file = e.target.files[0];
    convertImageToBase64(file);
  };

  // convert image to base64
  const convertImageToBase64 = async (file: Blob) => {
    const reader = new FileReader();
    const base64Data = await new Promise((resolve, reject) => {
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
    // console.log(base64Data);
    setImages([...images, base64Data]);
  };

  const setmainImg = (image: string) => {
    setMainImage(image);
  };

  const handleDeleteImage = (image: string) => {
    const updateImages = images.filter((img: string) => img !== image);
    if (mainImage === image) setMainImage("");
    setImages(updateImages);
  };

  const uplaodImage = async () => {
    if (file) {
      setProgress(0);
      const res = await edgestore.publicFiles.upload({
        file,
        onProgressChange: (preg) => setProgress(preg),
      });

      setImages([...images, res.url]);

      console.log("upload", res);
    }
  };

  return (
    <div className=" w-full h-[calc(100vh-53px)] flex justify-center items-center mobile:max-sm:mb-[60px] mobile:max-sm:items-start ">
      <div className="flex gap-5 mobile:max-sm:flex-col  mobile:max-sm:mt-5">
        <div className="flex flex-col justify-between">
          <div>
            {/* edge upload component */}
            <p>{progress}</p>
            <SingleImageDropzone
              width={330}
              height={200}
              value={file}
              dropzoneOptions={{
                maxSize: 1024 * 1024 * 1,
                onFileDialogCancel: () => setProgress(0),
              }}
              onChange={(file) => {
                setFile(file);
              }}
            />
            <div className="progress w-full border h-2 my-2">
              <div
                style={{
                  width: `${progress}%`,
                }}
                className="h-full w-[50%] transition-all duration-150 bg-green-600"
              ></div>
            </div>
            <button className="bg-primarytheme w-full" onClick={uplaodImage}>
              upload
            </button>
          </div>
          <p className="py-1 text-slate-600 self-end">{images.length}/4</p>

          <div className="flex gap-3 mobile:max-sm:gap-2 justify-start pt-1">
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
        </div>

        <div className="w-[50vw] h-[30vw] mobile:max-sm:h-full bg-white shadow-md mobile:max-sm:w-[98vw] p-2">
          <div className="form w-full">
            <h3 className="text-md font-bold text-primarytheme mb-2">
              SERVICE DETIALS
            </h3>
            <CreateServiceForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
