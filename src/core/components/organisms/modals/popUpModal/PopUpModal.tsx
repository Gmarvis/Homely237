import { ActionBtn } from '@/core/components/atoms/buttons/ActionBtn';
import { Button } from '@/core/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/core/components/ui/dialog';
import Image from 'next/image';
import { Dispatch, ReactNode, SetStateAction } from 'react';

type PropTypes = {
  title?: string;
  description?: string;
  footer?: string | JSX.Element
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;

};

export default function PopUpModal({ open, setOpen, title, description, children , footer}: PropTypes) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>

          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
      <DialogHeader>
        {footer}
      </DialogHeader>
    </Dialog>
  );
}
