"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";
import * as Animation from "../framerMotion/animations";

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
    <motion.div
      variants={Animation.fadeInVariantContainer}
      className="w-full flex gap-3 justify-center py-10 flex-wrap"
    >
      {categories.map((category, i) => (
        <Link
          // variants={Animation.fadeGridVariants}
          href={""}
          key={i}
          className=" py-2 shadow-lgs text-slate-700 hover:scale-125 hover:bg-primarytheme hover:text-white duration-300 px-4 rounded-full bg-slate-200"
        >
          <span>{category.name}</span>
        </Link>
      ))}
    </motion.div>
  );
};

export default CategoryGrid;
