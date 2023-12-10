
import React, { FC, useState } from "react";
import SideBarProfile from "./SideBarProfile"
import { useLogoutQuery } from "@/redux/features/auth/authApi";
import { signOut } from "next-auth/react";
import ProfileInfo from "./ProfileInfo";
import ChangePassword from "./ChangePassword";

type Props = {
    user: any
}

const Profile: FC<Props> = ({ user }) => {
    const [scroll, setScroll] = useState(false);
    const [avatar, setAvatar] = useState(null);
    const [active, setActive] = useState(1);
    const [logout, setLogOut] = useState(false);
    const { } = useLogoutQuery(undefined, {
        // it call this this when make logout to true only 
        skip: !logout ? true : false,
    });

    // wi will implement firebase auth for social
    // TODO TASK
    const logOutHandler = async () => {
        // it will clear the refresh jwt token from the backened
        setLogOut(true);
        // it will logout from next auth 
        // will remove
        await signOut(); //it will wait for setLogout() 
    }



    if (typeof window !== "undefined") {
        window.addEventListener("scroll", () => {
            if (window.scrollY) {
                setScroll(true);
            } else {
                setScroll(false);
            }
        });
    }
    return (
        <div className="w-[85%] flex mx-auto">
            <div
                className={`w-[60px] 800px:w-[310px] h-[450px] dark:bg-slate-900 bg-white bg-opacity-90 border dark:border-[#ffffff1d] border-slate-300 rounded-[5px] shadow-sm mt-[80px] mb-[80px] sticky ${scroll ? "top-[120px]" : "to-[30px]"}`}
            >
                <SideBarProfile
                    user={user}
                    active={active}
                    avatar={avatar}
                    setActive={setActive}
                    logOutHandler={logOutHandler}
                />
            </div>
            {/* update proflie */}
            {
                active === 1 && (
                    <div className="w-full h-full bg-transparent mt-[80px]">
                        <ProfileInfo
                            user={user}
                            avatar={avatar}
                        />
                    </div>
                )
            }
            {/* change password */}
            {
                active === 2 && (
                    <div className="w-full h-full bg-transparent mt-[80px]">
                        <ChangePassword
                        />
                    </div>
                )
            }
            
        </div>
    )
}

export default Profile;
