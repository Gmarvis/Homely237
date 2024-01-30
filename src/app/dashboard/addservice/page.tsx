"use client";
import React, { useRef, useState } from "react";

import { motion } from "framer-motion";

import { IoCloudUploadOutline } from "react-icons/io5";
import { HiDotsHorizontal } from "react-icons/hi";
import ProductImageCard from "@/components/molucles/ProductImageCard";
import { toast } from "react-toastify";
import FormInput from "@/components/atoms/FormInput";
import CreateServiceForm from "@/components/organisms/CreateServiceForm";

const Page = () => {
  const [base64Images, setBase64Images] = useState<any>([]);
  const [mainImage, setMainImage] = useState("");

  const inputRef: any = useRef();

  const handleImageUpload = async (e: any) => {
    // console.log(e.target.files);
    if (base64Images.length === 4) {
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
    setBase64Images([...base64Images, base64Data]);
  };

  return (
    <div className=" w-full h-[calc(100vh-53px)] flex justify-center items-center mobile:max-sm:mb-[60px] mobile:max-sm:items-start ">
      <div className="flex gap-5 mobile:max-sm:flex-col  mobile:max-sm:mt-5">
        <div className="flex flex-col justify-between">
          <div
            style={{
              backgroundImage: `url(${mainImage})`,

              backgroundSize: "cover",
              backgroundPosition: "center",
              objectFit: "fill",
            }}
            className="w-[32vw] mobile:max-sm:w-[98vw] mobile:max-sm:h-[50vw] h-[20vw] border border-dashed flex justify-center items-center border-slate-800 shadow-md"
          >
            <button
              onClick={() => inputRef.current.click()}
              className="flex flex-col justify-center items-center text-slate-500"
            >
              <IoCloudUploadOutline size={30} />
              <span>Upload Image</span>
            </button>

            <input
              type="file"
              onChange={(e) => handleImageUpload(e)}
              hidden
              ref={inputRef}
            />
          </div>
          <p className="py-1 text-slate-600 self-end">
            {base64Images.length}/4
          </p>

          <div className="flex gap-3 mobile:max-sm:gap-2 justify-start pt-1">
            {!base64Images.length && (
              <div className="h-[100px] justify-center text-center items-center w-full">
                <p className="text-sm text-slate-400">
                  Upload 4 images of you you performing your service
                </p>
              </div>
            )}
            {base64Images.map((image: any, i: React.Key | null | undefined) => (
              <ProductImageCard
                key={i}
                image={image}
                onClick={function (): void {
                  throw new Error("Function not implemented.");
                }}
              />
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
