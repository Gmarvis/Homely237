import {
  DropdownMenuContent,
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/core/components/ui/dropdown-menu';
import { ReactNode } from 'react';
import { HiDotsHorizontal } from 'react-icons/hi';

type PropTypes = {
  children: ReactNode;
};

export default function DropDownMenu({ children }: PropTypes) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className=" top-2 right-2 shadow-md bg-white flex justify-center items-center rounded-full h-8 w-8">
        <HiDotsHorizontal size={20} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>{children}</DropdownMenuContent>
    </DropdownMenu>
  );
}
