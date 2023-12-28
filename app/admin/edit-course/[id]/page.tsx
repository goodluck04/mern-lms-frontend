import DashboardHeader from '@/app/components/Admin/DashboardHeader'
import AdminSidebar from '@/app/components/Admin/sidebar/AdminSidebar'
import Heading from '@/app/utils/Heading'
import React from 'react'
import CreateCourse from "../../../components/Admin/CreateCourse"
import EditCourse from "../../../components/Admin/Course/EditCourse"

type Props = {}

const Page = ({params}:any) => {
    const id = params?.id;
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
                        {/* <CreateCourse /> */}
                        <EditCourse id={id}  />
                    </div>
                </div>
    </div>
  )
}

export default Page