import Link from "next/link";
import React from "react";

const CategoryGrid = () => {
  const categories = [
    {
      name: "Beauty",
    },
    {
      name: "Home Care",
    },
    {
      name: "Electricity",
    },
    {
      name: "Lifting",
    },
    {
      name: "Repairs",
    },
    {
      name: "Plumbing",
    },
    {
      name: "Cleaning",
    },
    {
      name: "Cooking",
    },
    {
      name: "Nanny",
    },
  ];
  return (
    <div className="w-full flex gap-3 justify-center py-10 flex-wrap">
      {categories.map((category, i) => (
        <Link
          key={i}
          href=""
          className=" py-2 shadow-lg text-slate-700 hover:scale-125 hover:bg-primarytheme hover:text-white duration-300 px-4 rounded-full"
        >
          <span>{category.name}</span>
        </Link>
      ))}
    </div>
  );
};

export default CategoryGrid;
