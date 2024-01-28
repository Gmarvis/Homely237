"use client";
import React, { useRef, useState } from "react";

import { IoCloudUploadOutline } from "react-icons/io5";

const Page = () => {
  const [base64Image, setBase64Image] = useState<any>();
  const inputRef: any = useRef();

  const handleImageUpload = async (e: any) => {
    // console.log(e.target.files);

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
    setBase64Image(base64Data);
  };

  return (
    <div className=" w-full h-[calc(100vh-53px)] flex justify-center items-center mobile:max-sm:items-start ">
      <div className="flex gap-5 mobile:max-sm:flex-col">
        <div
          style={{
            backgroundImage: `url(${base64Image})`,

            backgroundSize: "cover",
            backgroundPosition: "center",
            objectFit: "fill",
          }}
          className="w-[30vw] mobile:max-sm:w-[98vw] mobile:max-sm:h-[50vw] h-[30vw] border border-dashed flex justify-center items-center border-slate-800 shadow-md"
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
        <div className="w-[50vw] h-[30vw] bg-white mobile:max-sm:w-[98vw]"></div>
      </div>
    </div>
  );
};

export default Page;
<h3>addservice</h3>;
