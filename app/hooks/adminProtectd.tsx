import { redirect } from "next/navigation";
import userAuth from "./userAuth";
import React from "react";
import { useSelector } from "react-redux";

interface adminProtectedProps {
    children: React.ReactNode;
}

export default function AdminProtected({ children }: adminProtectedProps) {
    const { user } = useSelector((state: any) => state.auth);

    if (user) {
        const isAdmin = user?.role === "admin"
        return isAdmin ? children : redirect("/")
    } 

}