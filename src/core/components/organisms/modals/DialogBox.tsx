import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/core/components/ui/alert-dialog';

import React, { Dispatch, SetStateAction } from 'react';

type PropType = {
  onClickAction?: () => void;
  title: string;
  description: string;
  isWarning?: boolean;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const DialogBox = ({
  onClickAction,
  description,
  title,
  isWarning = false,
  open,
  setOpen
}: PropType) => {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className={`${isWarning ? 'bg-red-600' : 'bg-primarytheme'}`}
            onClick={onClickAction}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DialogBox;
