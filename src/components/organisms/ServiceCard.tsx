import React from "react";
import Image from "next/image";
import ProfileAvatar from "../molucles/Avatar";
import { useCaps } from "@/utils/service/helperFuntions";
import { motion } from "framer-motion";

type CardTypes = {
  service: Service;
  onClick: () => void;
  hideAuthor?: boolean;
};

const ServiceCard = ({ service, onClick, hideAuthor }: CardTypes) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="shadow-lg border border-gray-100 rounded-md w-[250px] p-2 mobile:max-sm:w-[100%] self-center items-center bg-white"
      onClick={onClick}
    >
      <Image
        src={service.product_image}
        alt=""
        width={400}
        height={50}
        sizes="100%"
        objectFit="cover"
        className="w-[100%] h-[150px] object-cover hover:scale-110 duration-300 transition-all hover:cursor-pointer"
      />
      <div className="flex justify-between w-full items-center">
        <h3 className="subText py-2 rounded-md">{useCaps(service.name)}</h3>
        <p className="smallText">{service.category_name}</p>
      </div>
      <div className="flex w-full justify-between items-center">
        <div className="flex items-center justify-center gap-1">
          {!hideAuthor && <ProfileAvatar user={service.user} size={2} />}
          {!hideAuthor && <p className="smallText">{service.user.name}</p>}
        </div>
        {!hideAuthor && (
          <span className="smallText">{service.price}CFA/hour</span>
        )}
      </div>
      {hideAuthor && <span className="smallText">{service.price}CFA/hour</span>}
    </motion.div>
  );
};

export default ServiceCard;
