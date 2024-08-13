import React, { useState } from 'react';
import Image from 'next/image';
import ProfileAvatar from '../../molecules/Avatar';
import { motion } from 'framer-motion';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/core/components/ui/dropdown-menu';

import { HiDotsVertical } from 'react-icons/hi';
import DialogBox from '../modals/dailogBox/DialogBox';
import Link from 'next/link';
import HelperFunctions from '@/core/utils/service/helperFunctions';

type CardTypes = {
  service: Service;
  onClick: () => void;
  hideAuthor?: boolean;
  showMenu?: boolean;
  onClickDelete?: (service: Service) => void;
};

const ServiceCard = ({
  service,
  onClick,
  onClickDelete,
  hideAuthor,
  showMenu = false
}: CardTypes) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="shadow-lg border border-gray-100 rounded-md w-64 overflow-hidden  relative mobile:max-sm:w-[100%] self-center items-center bg-white pb-2"
      onClick={onClick}>
      <Image
        src={service.product_image}
        alt=""
        width={400}
        height={50}
        sizes="100%"
        objectFit="cover"
        className="w-[100%] h-[150px] object-cover hover:scale-110 duration-300 transition-all hover:cursor-pointer"
      />
      <div className="flex p-2 justify-between w-full items-center">
        <h3 className="subText  rounded-md">{HelperFunctions.capitalizeText(service.name)}</h3>
        <p className="smallText">{service.category_name}</p>
      </div>
      <div className="flex w-full px-2 justify-between items-center">
        {service.user && (
          <div className="flex items-center justify-center gap-1">
            {!hideAuthor && <ProfileAvatar image={service.user.image} size={2} />}
            {!hideAuthor && <p className="smallText">{service.user.name}</p>}
          </div>
        )}
        {!hideAuthor && <span className="smallText ">{service.price}CFA/hour</span>}
      </div>
      {hideAuthor && <span className="smallText px-2">{service.price}CFA/hour</span>}
      {showMenu && (
        <DropdownMenu>
          <DropdownMenuTrigger className="absolute top-2 right-2 shadow-md bg-white flex justify-center items-center rounded-full h-8 w-8">
            <HiDotsVertical size={20} />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <Link href={`/dashboard/my-services/edit/${service.id}`}>
              <DropdownMenuItem>Edit</DropdownMenuItem>
            </Link>

            <DropdownMenuItem
              onClick={(e) => {
                setOpenModal(true);
                e.stopPropagation();
              }}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}

      <DialogBox
        open={openModal}
        setOpen={setOpenModal}
        onClickAction={() => onClickDelete && service && onClickDelete(service)}
        isWarning
        title="Are you absolutely sure?"
        description=" This action cannot be undone. This will permanently
                        delete your service and remove your data from our
                        servers."
      />
    </motion.div>
  );
};

export default ServiceCard;
