import Image from 'next/image';
import React, { FC } from 'react'
import avatarDefault from "../../../../public/assets/avatar.png"
import { RiLockPasswordLine } from "react-icons/ri";
import { PiStudent } from "react-icons/pi";
import { AiOutlineLogout } from "react-icons/ai";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import Link from 'next/link';


type Props = {
    user: any
    active: number;
    avatar: string | null;
    setActive: (active: number) => void;
    logOutHandler: any;

}

const SideBarProfile: FC<Props> = ({ user, active, avatar, setActive, logOutHandler }) => {
    return (
        <div className='w-full'>
            {/*my account 1 */}
            <div
                className={`w-full flex items-center px-3 py-4 cursor-pointer ${active === 1 ? "dark:bg-slate-800 bg-slate-100" : "bg-transparent"
                    }`}
                onClick={() => setActive(1)}
            >
                <Image
                    src={user.avatar || avatar ? user.avatar?.url || avatar : avatarDefault}
                    alt={``}
                    width={20}
                    height={20}
                    className='w-[20px] h-[20px] 800px:w-[30px] 800px:h-[30px] cursor-pointer rounded-full'
                />
                <h5
                    className='pl-2 800px:block hidden font-Poppins dark:text-white text-black'
                >
                    My Account
                </h5>
            </div>
            {/* Change Password */}
            <div
                className={`w-full flex items-center px-3 py-4 cursor-pointer ${active === 2 ? "dark:bg-slate-800 bg-slate-100" : "bg-transparent"
                    }`}
                onClick={() => setActive(2)}
            >
                <RiLockPasswordLine size={20} fill="rgb(100 116 139)" />
                <h5 className='pl-2 800px:block hidden font-Poppins dark:text-white text-black'>Change Password</h5>
            </div>
            {/* COURSES ENROLLED */}
            <div
                className={`w-full flex items-center px-3 py-4 cursor-pointer ${active === 3 ? "dark:bg-slate-800 bg-slate-100" : "bg-transparent"
                    }`}
                onClick={() => setActive(3)}
            >
                <p><PiStudent size={20} fill="rgb(100 116 139)" /></p>
                <h5 className='pl-2 800px:block hidden font-Poppins dark:text-white text-black'>
                    Enrolled Courses
                </h5>
            </div>
            {user.role === "admin" && (
                <Link
                    href={"/admin"}
                    className={`w-full flex items-center px-3 py-4 cursor-pointer ${active === 3 ? "dark:bg-slate-800 bg-slate-100" : "bg-transparent"
                        }`}
                    
                >
                    <p><MdOutlineAdminPanelSettings size={20} fill="rgb(100 116 139)" /></p>
                    <h5 className='pl-2 800px:block hidden font-Poppins dark:text-white text-black'>
                        Admin Dashboard
                    </h5>
                </Link>
            )}
            <div
                className={`w-full flex items-center px-3 py-4 cursor-pointer active:dark:bg-slate-800  active:bg-slate-500 bg-slate-100 bg-transparent
                    }`}
                onClick={() => logOutHandler()}
            >
                <p><AiOutlineLogout size={20} fill="rgb(100 116 139)" /></p>
                <h5 className='pl-2 800px:block hidden font-Poppins dark:text-white text-black'>Log Out</h5>
            </div>
            {/* Courses Enrollerd */}


        </div>
    )
}

export default SideBarProfile