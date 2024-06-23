import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from '@/components/ui/alert-dialog';

import React from 'react';

type PropType = {
    triggerComponent: React.ReactNode;
    onClickAction: () => void;
    title: string;
    description: string;
    isWarning?: boolean;
};

const DailogBox = ({
    triggerComponent,
    onClickAction,
    description,
    title,
    isWarning = false
}: PropType) => {
    return (
        <AlertDialog>
            <AlertDialogTrigger className="w-full text-start">
                {triggerComponent}
            </AlertDialogTrigger>
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

export default DailogBox;
