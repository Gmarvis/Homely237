"use client";

import ProfileAvatar from "@/components/molucles/Avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    SheetTrigger,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
    SheetFooter,
    SheetClose,
    Sheet,
} from "@/components/ui/sheet";
import React from "react";

type PropTypes = {
    title: string;
    description?: string;
    trigger: React.ReactNode;
    children: React.ReactNode;
};

export function RightModal({
    title,
    description,
    trigger,
    children,
}: PropTypes) {
    return (
        <div className="grid grid-cols-2 gap-2">
            <Sheet>
                <SheetTrigger asChild>{trigger}</SheetTrigger>
                <SheetContent side={"right"}>
                    <SheetHeader>
                        <SheetTitle>{title}</SheetTitle>
                        <SheetDescription>{description}</SheetDescription>
                    </SheetHeader>
                    <div className="grid gap-4 py-4">{children}</div>
                    <SheetFooter>
                        <SheetClose asChild>
                            <Button type="submit">Save changes</Button>
                        </SheetClose>
                    </SheetFooter>
                </SheetContent>
            </Sheet>
        </div>
    );
}
