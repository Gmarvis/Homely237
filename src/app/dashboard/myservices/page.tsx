import H3 from "@/components/atoms/H3";
import DisplayMyServices from "@/components/organisms/DisplayMyServices";
import Link from "next/link";
import React from "react";

import { RiUpload2Line } from "react-icons/ri";
import { RightModal } from "../../../components/organisms/modals/RightModal";

const page = () => {
    return (
        <div className="p-5">
            <div className="header w-full flex justify-between items-center">
                <H3 className="text-slate-500" text="My Services" />
                <Link href={"/dashboard/addservice"}>
                    <button className="shadow-md py-1 px-2 text-white bg-primarytheme  flex justify-center gap-2 items-center rounded-md">
                        <RiUpload2Line />
                        Add Service
                    </button>
                </Link>
            </div>
            <RightModal
                title="Profile"
                trigger={<button>open</button>}
                description="hello world"
            >
                <p>heloo</p>
            </RightModal>
            {/* <DisplayMyServices /> */}
        </div>
    );
};

export default page;
