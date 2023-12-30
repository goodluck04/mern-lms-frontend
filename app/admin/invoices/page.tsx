import React from 'react'
import Heading from '../../utils/Heading'
import AdminSidebar from '@/app/components/Admin/sidebar/AdminSidebar'
import DashboardHeader from '@/app/components/Admin/DashboardHeader'
import AllInvoices from '@/app/components/Admin/Order/AllInvoices'


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
                        <AllInvoices />
                    </div>
                </div>
    </div>
  )
}

export default Page