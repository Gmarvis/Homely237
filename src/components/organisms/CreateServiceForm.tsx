import React from "react";
import FormInput from "../atoms/FormInput";
import Link from "next/link";
import { IoBookOutline } from "react-icons/io5";

const Categories = [
  {
    name: "Cooking",
    image: "",
  },
  {
    name: "Baking",
    image: "",
  },
  {
    name: "Babing",
    image: "",
  },
  {
    name: "Makeup",
    image: "",
  },

  {
    name: "Hair Dressing",
    image: "",
  },
];

const CreateServiceForm = () => {
  return (
    <form action="" className="w-full flex flex-col gap-2">
      <label htmlFor="name" className="text-slate-700">
        Name{" "}
        <span className="text-xs">(eg, cleaning, babbing, cooking, etc)</span>
      </label>
      <FormInput
        label={"Service Name"}
        onChange={function (event: { target: { value: any } }): void {
          throw new Error("Function not implemented.");
        }}
      />
      <div className=" flex w-full justify-between text-slate-700">
        <div className="w-full flex flex-col">
          <label htmlFor="price">
            Price/Hour <span className="text-xs">(eg 2000 CFA)</span>
          </label>
          <input
            type="number"
            name="price"
            placeholder="2000CFA/hour"
            className="bg-transparent w-[50%] text-sm outline-none border border-primarytheme p-2 rounded-md"
          />
        </div>
        <div className=" flex flex-col">
          <label htmlFor="Category">Category</label>
          <select
            name="Category"
            id=""
            className="bg-transparent text-sm w-[8rem] outline-none border border-primarytheme p-2 rounded-md"
          >
            {Categories.map((category, i) => (
              <option key={i} value="">
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
        // cols="30
        // rows="10"
        className="h-[100px] outline-none border border-primarytheme p-2 text-sm rounded-md"
        placeholder="Give clear description of the sercive your are provide, this will make your sercive stand out and atract more custumers"
      ></textarea>
      <button className="w-full bg-primarytheme p-1 text-white">
        Add Service
      </button>
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
