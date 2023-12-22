import DashboardHeader from '@/app/components/Admin/DashboardHeader'
import AdminSidebar from '@/app/components/Admin/sidebar/AdminSidebar'
import Heading from '@/app/utils/Heading'
import React from 'react'
import CreateCourse from "../../components/Admin/CreateCourse"


type Props = {}

const Page = (props: Props) => {
  return (
    <div>
         <Heading
                    title='create course - Admin'
                    description='LMS is a platform for students to learn'
                    keywords='Programmin,DSA,REDUX,'
                />
                <div className='flex'>
                    <div className='1500px:w-[16%] w-1/5'>
                        <AdminSidebar />
                    </div>
                    <div className='w-[85%]'>
                        <DashboardHeader />
                        <CreateCourse />
                    </div>
                </div>
    </div>
  )
}

export default Page