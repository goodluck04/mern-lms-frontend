"use client"
import Link from "next/link";
import React, { FC, useState } from "react";
import NavItem from "../utils/NavItem"
import { ThemeSwitcher } from "../utils/ThemeSwitcher"
import { HiOutlineMenuAlt3, HiOutlineUserCircle } from "react-icons/hi";

type Props = {
    open: boolean;
    setOpen: (open: boolean) => void;
    activeItem: number;
}

const Header: FC<Props> = ({ activeItem, setOpen }) => {
    const [active, setActive] = useState(false);
    const [openSidebar, setOpenSidebar] = useState(false);

    // when active will be true
    // if scroll the the header will be sticky
    if (typeof window !== "undefined") {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 80) {
                setActive(true);
            } else {
                setActive(false);
            }
        });
    }

    const handleClose = (e: any) => {
        if (e.target.id === "screen") {
            setOpenSidebar(false);
        }
    }

    return (
        <div className="w-full relative">
            <div className={`${active ? "dark:bg-opacity-50 dark:bg-gradient-to-b dark:from-gray-900 dark:to-black fixed top-0 left-0 w-full h-[80px] z-[80] border-b dark:border-[#ffffff1c] shadow-xl transition duration-500" : "w-full border-b dark:border-[#ffffff1c] h-[80px] z-[80] dark:shadow"}`}>
                <div className="w-[95%] 800px:w-[92%] m-auto py-2 h-full">
                    <div className="w-full h-[80px] flex items-center justify-between p-3">
                        <div>
                            <Link
                                href={"/"}
                                className={`text-[25px] font-Poppins font-[500] text-black dark:text-white`}
                            >
                                LMS
                            </Link>
                        </div>
                        <div className="flex items-center">
                            <NavItem
                                activeItem={activeItem}
                                isMobile={false}
                            />
                            <ThemeSwitcher />
                            {/* ONLY FOR MOBILE */}
                            <div className="800px:hidden">
                                <HiOutlineMenuAlt3
                                    size={25}
                                    className="cursor-pointer dark:text-white text-black"
                                    onClick={() => setOpenSidebar(true)}
                                />
                            </div>
                            <HiOutlineUserCircle
                                size={25}
                                className="hidden 800px:block cursor-pointer dark:text-white text-black"
                                onClick={() => setOpen(true)}
                            />
                        </div>
                    </div>
                </div>
                {/* MOBILE SIDEBAR */}
                {
                    openSidebar && (
                        <div
                            className="fixed w-full h-screen top-0 left-0 z-[999] dark:bg-[uset] bg-[#00000024]"
                            onClick={handleClose}
                            id="screen"
                        >
                            <div className="w-[70%] fixed z-[9999] h-screen bg-white dark:bg-slate-900 dark:bg-opacity-90 top-0 right-0">
                                <NavItem
                                    activeItem={activeItem}
                                    isMobile={true}
                                />
                                <HiOutlineUserCircle
                                    size={25}
                                    className="cursor-pointer ml-5 my-2 text-black dark:text-white"
                                    onClick={() => setOpen(true)}
                                />
                                <br />
                                <br />
                                <p className="text-[16px] px-2 pl-5 text-black dark:text-white">
                                    Copyright &copy; 2023 LMS
                                </p>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Header;