import React from 'react';
import Image from 'next/image';
import ProfileAvatar from '../../molucles/Avatar';
import { useCaps } from '@/utils/service/helperFuntions';
import { motion } from 'framer-motion';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

import { HiDotsVertical } from 'react-icons/hi';
import DailogBox from '../modals/DailogBox';
import Link from 'next/link';

type CardTypes = {
    service: Service;
    onClick: () => void;
    hideAuthor?: boolean;
    showMenu?: boolean;
    onClickDelete?: (service_id: string) => void;
};

const ServiceCard = ({
    service,
    onClick,
    onClickDelete,
    hideAuthor,
    showMenu = false
}: CardTypes) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="shadow-lg border border-gray-100 rounded-md w-[250px] overflow-hidden  relative mobile:max-sm:w-[100%] self-center items-center bg-white pb-2"
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
            <div className="flex p-2 justify-between w-full items-center">
                <h3 className="subText  rounded-md">{useCaps(service.name)}</h3>
                <p className="smallText">{service.category_name}</p>
            </div>
            <div className="flex w-full px-2 justify-between items-center">
                {service.user && (
                    <div className="flex items-center justify-center gap-1">
                        {!hideAuthor && <ProfileAvatar image={service.user.image} size={2} />}
                        {!hideAuthor && <p className="smallText">{service.user.name}</p>}
                    </div>
                )}
                {!hideAuthor && <span className="smallText">{service.price}CFA/hour</span>}
            </div>
            {hideAuthor && <span className="smallText">{service.price}CFA/hour</span>}
            {showMenu && (
                <DropdownMenu>
                    <DropdownMenuTrigger className="absolute top-2 right-2 shadow-md bg-white flex justify-center items-center rounded-full h-8 w-8">
                        <HiDotsVertical size={20} />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => alert(service.name)}>
                            View
                        </DropdownMenuItem>
                        <Link href={`/dashboard/myservices/edit/${service.id}`}>
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                        </Link>
                        <DailogBox
                            onClickAction={() =>
                                onClickDelete && service.id && onClickDelete(service.id)
                            }
                            isWarning
                            title="Are you absolutely sure?"
                            description=" This action cannot be undone. This will permanently
                        delete your service and remove your data from our
                        servers."
                            triggerComponent={
                                <h3 className="px-2 py-1 hover:bg-gray-200">Delete</h3>
                            }
                        />
                    </DropdownMenuContent>
                </DropdownMenu>
            )}
        </motion.div>
    );
};

export default ServiceCard;
