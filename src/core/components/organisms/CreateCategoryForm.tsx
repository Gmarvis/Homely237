'use client';
import React, { useRef, useState } from 'react';
import { IoCloudUploadOutline } from 'react-icons/io5';
import FormBtn from '../atoms/buttons/FormBtn';

const CreateCategoryForm = () => {
  const [categoryImage, setCategoryImage] = useState('');

  const handleImageUpload = (e: any) => {};

  const inputRef: any = useRef();
  return (
    <form className="flex flex-col gap-2">
      <div
        style={{
          backgroundImage: `url(${categoryImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          objectFit: 'fill'
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

        <input type="file" onChange={(e) => handleImageUpload(e)} hidden ref={inputRef} />
      </div>
      <input
        type="text"
        placeholder="Category name"
        className="bg-transparent w-[100%] text-sm outline-none border border-primarytheme p-2"
      />
      <FormBtn
        isLoading={false}
        title={'Add Category'}
        onClick={function (): void {
          throw new Error('Function not implemented.');
        }}
      />
    </form>
  );
};

export default CreateCategoryForm;
