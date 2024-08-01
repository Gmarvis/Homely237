import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiDotsHorizontal } from 'react-icons/hi';
import Overlay from '../atoms/Overlay';

//react icons
import { RiVerifiedBadgeFill } from 'react-icons/ri';
import { DropDownMenu } from '../organisms/modals';
import { DropdownMenuItem } from '@radix-ui/react-dropdown-menu';

type ImageCardProps = {
  image: string;
  children: React.ReactNode;
  showBadge: boolean;
};

const ProductImageCard = ({ image, children, showBadge }: ImageCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, translateY: -20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        backgroundImage: `url(${image})`,

        backgroundSize: 'cover',
        backgroundPosition: 'center',
        objectFit: 'fill'
      }}
      className={`${
        showBadge ? 'border-4 border-secondrytheme' : ''
      } w-[100px] mobile:max-sm:w-[22vw]  h-[100px] mobile:max-sm:h-[22vw] bg-white shadow-md flex items-end flex-col p-2 relative bigScreen:w-[150px] bigScreen:h-[150px] transition-all`}
    >
      <DropDownMenu>
        <DropdownMenuItem className="shadow-md rounded-md py-2 w-full z-50 flex flex-col">
          {children}
        </DropdownMenuItem>
      </DropDownMenu>

      {showBadge && (
        <span className="absolute left-2 top-2 text-secondrytheme shadow-xl">
          <RiVerifiedBadgeFill size={20} />
        </span>
      )}
    </motion.div>
  );
};

export default ProductImageCard;
