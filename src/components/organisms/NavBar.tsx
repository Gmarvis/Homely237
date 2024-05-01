"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import SearchForm from "../molucles/SearchForm";
import BellBtn from "../atoms/buttons/BellBtn";

import { motion } from "framer-motion";
import DropDown from "../molucles/DropDown";
// import { useTheme } from "next-themes";
// import ToggleThemeBtn from "../atoms/ToggleThemeBtn";

import ProfileAvatar from "../molucles/Avatar";
import ProfileCard from "../molucles/ProfileCard";
import Overlay from "../atoms/Overlay";
import { getAllCategories, getAllServices } from "@/utils/queries";

// STORE IMPORTS
import useUserStore from "@/store/userStore";
import useCategoryStore from "@/store/categoryStore";
import useServiceStore from "@/store/serviceStore";
import { LinkBtn, LinkBtnTheme } from "../atoms/buttons/LinkBtn";

const navLinks = [
    {
        name: "appointments",
        path: "/dashboard/appointments",
    },
    {
        name: "dashboard",
        path: "/dashboard/appointments",
    },
    {
        name: "appointments",
        path: "/dashboard/appointments",
    },
    {
        name: "appointments",
        path: "/dashboard/appointments",
    },
];

type NavTypes = {
    onDashBoard: Boolean;
    hideSearchBar?: Boolean;
};

const NavBar = ({ onDashBoard, hideSearchBar = false }: NavTypes) => {
    const { user } = useUserStore();
    const { setServices } = useServiceStore();
    const { setCategories } = useCategoryStore();
    const [showNotifiaction, setShowNotification] = useState(false);
    const [showProfile, setShowProfile] = useState(false);

    const update = async () => {
        //Fetch all Categories from DB
        const allCategories = await getAllCategories();
        setCategories(allCategories);
        //Fetch all Services from DB
        const allServices = await getAllServices();
        setServices(allServices);
    };

    useEffect(() => {
        update();
    }, []);

    return (
        <div
            className={`flex bigScreen:px-80 w-full justify-between z-50 shadow-md ${
                onDashBoard ? " px-5 relative" : "px-24 fixed "
            }  py-2 items-center mobile:max-sm:px-5  w-full bg-white`}
        >
            <div>
                <Link
                    href={"/"}
                    className={`self-center w-full ${
                        onDashBoard ? "sm:hidden mobile:max-sm:visible" : ""
                    }  flex items-center justify-center`}
                >
                    <Image
                        src={"/logohomygig.png"}
                        alt="homygig logo"
                        width={110}
                        height={60}
                    />
                </Link>
            </div>
            <div
                className={`sear mobile:max-sm:hidden  ${
                    onDashBoard ? "hidden" : "visible"
                }`}
            >
                {!hideSearchBar && <SearchForm />}
            </div>

            {user.id ? (
                <div className="flex justify-center items-center gap-3">
                    <Link
                        className={`text-xs ${onDashBoard ? "hidden" : ""} `}
                        href={"dashboard"}
                    >
                        Dashboard
                    </Link>
                    <BellBtn
                        onClick={() => setShowNotification((prev) => !prev)}
                    />
                    {/* {
          >>>>>>>>>>>>>>THE APP THEME PROVIDER IS NO WORKING PROPERLY
          >>>>>>>>>>>>>>CUSTOMIZED COLORS WON'T CHANGE AS THEME MODE CHANGE
          } */}
                    {/* <ToggleThemeBtn /> */}
                    <ProfileAvatar
                        onClick={() => setShowProfile((prev) => !prev)}
                        user={user}
                        size={3}
                    />
                    {showProfile && (
                        <Overlay
                            onClick={() => setShowProfile((prev) => !prev)}
                            transparent
                        />
                    )}
                    {showProfile && (
                        <motion.div
                            className="absolute top-[57px] right-4 w-[300px] mobile:max-sm:w-[80vw]  mobile:max-sm:right-10 z-40"
                            initial={{ opacity: 0, translateY: -20 }}
                            animate={{ opacity: 1, translateY: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <DropDown
                                title="Profile"
                                onBlur={() => setShowProfile((prev) => !prev)}
                                className={""}
                            >
                                <ProfileCard />
                            </DropDown>
                        </motion.div>
                    )}

                    {showNotifiaction && (
                        <Overlay
                            onClick={() => setShowNotification((prev) => !prev)}
                            transparent
                        />
                    )}

                    {showNotifiaction && (
                        <motion.div
                            initial={{ opacity: 0, translateY: -20 }}
                            animate={{ opacity: 1, translateY: 0 }}
                            transition={{ duration: 0.3 }}
                            className="absolute top-[57px] right-2 z-40"
                        >
                            <DropDown
                                title={"Notifications"}
                                onBlur={() =>
                                    setShowNotification((prev) => !prev)
                                }
                                className="w-[20vw]"
                            >
                                <h3>fist notification</h3>
                            </DropDown>
                        </motion.div>
                    )}
                </div>
            ) : (
                <div className="flex items-center gap-3">
                    <LinkBtn
                        title="Get Started"
                        path="/auth"
                        theme={LinkBtnTheme.themeColor}
                    />
                </div>
            )}
        </div>
    );
};

export default NavBar;
