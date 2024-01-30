import React from "react";
import { motion } from "framer-motion";
import { HiDotsHorizontal } from "react-icons/hi";

type ImageCardProps = {
  image: string;
  onClick: () => void;
};

const ProductImageCard = ({ image, onClick }: ImageCardProps) => {
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
      className="w-[100px] mobile:max-sm:w-[22vw] mobile:max-sm:h-[22vw] h-[bg-white100px] shadow-md flex items-end flex-col p-2"
    >
      <button className="flex  self-end">
        <HiDotsHorizontal size={20} />
      </button>
    </motion.div>
  );
};

export default ProductImageCard;
