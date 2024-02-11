"use client";
import React, { useState } from "react";
import FormInput from "../atoms/FormInput";
import Link from "next/link";
import { IoBookOutline } from "react-icons/io5";
import FormBtn from "../atoms/FormBtn";
import { toast } from "react-toastify";

// STORE IMPORTS
import useCategoryStore from "@/store/categoryStore";
import useUserStore from "@/store/userStore";

const CreateServiceForm = () => {
  const { categories } = useCategoryStore();
  const { user } = useUserStore();
  const [serviceName, setServiceName] = useState("");
  const [category_name, setCategory_name] = useState("");
  const [category_id, setCategory_id] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  // error messages

  // ERROR HANDLERS

  const handleAddService = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    //get service images from localstatorage
    const images = JSON.parse(localStorage.getItem("service_images") || "[]");
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
  };

  return (
    <form
      action=""
      onSubmit={handleAddService}
      className="w-full flex flex-col gap-2"
    >
      <label htmlFor="name" className="text-slate-700">
        Name{" "}
        <span className="text-xs">(eg, cleaning, babbing, cooking, etc)</span>
      </label>
      <FormInput
        label={"Service Name"}
        onChange={(e) => setServiceName(e.target.value)}
      />
      <div className=" flex w-full justify-between text-slate-700">
        <div className="w-full flex flex-col">
          <label htmlFor="price">
            Price/hour <span className="text-xs">(eg 2000 CFA)</span>
          </label>
          <input
            type="number"
            name="price"
            placeholder="2000CFA/hour"
            onChange={(e) => setPrice(e.target.value)}
            className="bg-transparent w-[50%] text-sm outline-none border border-primarytheme p-2 rounded-md"
          />
        </div>
        <div className=" flex flex-col">
          <label htmlFor="Category">Category</label>
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
            className="bg-transparent text-sm w-[8rem] outline-none border border-primarytheme p-2 rounded-md"
          >
            {categories.map((category, i) => (
              <option key={i} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <label htmlFor="description">Description</label>
      <textarea
        name=""
        id=""
        onChange={(e) => setDescription(e.target.value)}
        // cols="30
        // rows="10"
        className="h-[100px] outline-none border border-primarytheme p-2 text-sm rounded-md"
        placeholder="Give clear description of the sercive your are provide, this will make your sercive stand out and atract more custumers"
      ></textarea>

      <FormBtn
        isLoading={false}
        title={"Add Service"}
        // onClick={handleAddService}
      />
      <Link
        href={""}
        className="text-secondrytheme text-center flex items-center w-full justify-center gap-3"
      >
        <p>To get better Results, Read our Guide </p>
        <IoBookOutline size={20} />
      </Link>
    </form>
  );
};

export default CreateServiceForm;
