'use client';

import { Button } from '@/components/ui/button';
import {
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
  Sheet
} from '@/components/ui/sheet';
import React from 'react';

type PropTypes = {
  title: string;
  description?: string;
  trigger: React.ReactNode;
  children: React.ReactNode;
  className?: string;
};

export function RightModal({ className, title, description, trigger, children }: PropTypes) {
  return (
    <div className={`${className}  grid grid-cols-2 gap-2`}>
      <Sheet>
        <SheetTrigger asChild>{trigger}</SheetTrigger>
        <SheetContent className={className} side={'right'}>
          <SheetHeader>
            <SheetTitle>{title}</SheetTitle>
            <SheetDescription>{description}</SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4">{children}</div>
          <SheetFooter></SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
