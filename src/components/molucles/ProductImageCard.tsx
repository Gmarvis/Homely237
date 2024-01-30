import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { HiDotsHorizontal } from "react-icons/hi";
import DropDown from "./DropDown";

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
      className="w-[100px] mobile:max-sm:w-[22vw]  h-[100px] mobile:max-sm:h-[22vw] [bg-white100px] shadow-md flex items-end flex-col p-2 relative"
    >
      <button
        className="flex  self-end"
        onClick={() => setShowImageMenu((prev) => !prev)}
      >
        <HiDotsHorizontal size={20} />
      </button>
      {showMenu && (
        <div className="absolute top-6 shadow-md">
          <DropDown
            className="w-[100px] mobile:max-sm:w-[22vw]"
            onBlur={() => setShowImageMenu((prev) => !prev)}
          >
            {children}
          </DropDown>
        </div>
      )}
    </motion.div>
  );
};

export default ProductImageCard;
