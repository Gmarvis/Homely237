import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { HiDotsHorizontal } from "react-icons/hi";
import DropDown from "./DropDown";
import Overlay from "../atoms/Overlay";

type ImageCardProps = {
  image: string;
  // onClick: () => void;
  children: React.ReactNode;
};

const ProductImageCard = ({ image, children }: ImageCardProps) => {
  const [showMenu, setShowImageMenu] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, translateY: -20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        backgroundImage: `url(${image})`,

        backgroundSize: "cover",
        backgroundPosition: "center",
        objectFit: "fill",
      }}
      className="w-[100px] mobile:max-sm:w-[22vw]  h-[100px] mobile:max-sm:h-[22vw] bg-white shadow-md flex items-end flex-col p-2 relative bigScreen:w-[150px] bigScreen:h-[150px]"
    >
      <button
        className="flex  self-end bg-white rounded-full"
        onClick={() => setShowImageMenu((prev) => !prev)}
      >
        <HiDotsHorizontal size={20} />
      </button>
      {showMenu && (
        <Overlay
          transparent
          onClick={() => setShowImageMenu((prev) => !prev)}
        />
      )}
      {showMenu && (
        <motion.div
          initial={{ opacity: 0, translateY: -20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute top-6 shadow-md bg-white mt-2 rounded-md py-2 w-full z-50 flex flex-col"
        >
          {children}
        </motion.div>
      )}
    </motion.div>
  );
};

export default ProductImageCard;
