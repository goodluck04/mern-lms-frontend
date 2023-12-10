"use client"
import React, { FC, useState } from "react";
import Protected from "../hooks/useProtectd";
import Heading from "../utils/Heading";
import Header from "../components/Header";
import Profile from "./components/Profile/Profile"
import { useSelector } from "react-redux";

type Props = {}

const Page: FC<Props> = (props) => {
    const [open, setOpen] = useState(false);
    const [activeItem, setActiveItem] = useState(5);
    const [route, setRoute] = useState("Login");
    const { user } = useSelector((state: any) => state.auth)

    return (
        <div>
            <Protected>
                <Heading
                    title={`${user?.name} profile`}
                    description="E learning platform for student to learn and get help from teachers"
                    keywords="Programmin,Redux,ML,"
                />
                <Header
                    open={open}
                    setOpen={setOpen}
                    activeItem={activeItem}
                    setRoute={setRoute}
                    route={route}
                />
                <Profile user={user} />
            </Protected>
        </div>
    )
}

export default Page;

