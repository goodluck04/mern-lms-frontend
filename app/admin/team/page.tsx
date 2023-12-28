"use client"
import DashboardHero from '@/app/components/Admin/DashboardHero'
import AdminSidebar from '@/app/components/Admin/sidebar/AdminSidebar'
import AdminProtected from '@/app/hooks/adminProtectd'
import Heading from '@/app/utils/Heading'
import React from 'react'
import AllUsers from "../../components/Admin/Users/AllUsers"

type Props = {}

const Page = (props: Props) => {
    return (
        <div>
            <AdminProtected>
                <Heading
                    title='LMS - Admin'
                    description='LMS is a platform for students to learn'
                    keywords='Programmin,DSA,REDUX,'
                />
                <div className='flex h-screen'>
                    <div className='1500px:w-[16%] w-1/5'>
                        <AdminSidebar />
                    </div>
                    <div className='w-[85%]'>
                        <DashboardHero />
                        <AllUsers isTeam={true} />
                    </div>
                </div>
            </AdminProtected>
        </div>
    )
}

export default Page