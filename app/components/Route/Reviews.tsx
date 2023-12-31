import { styles } from '@/app/style/styles'
import Image from 'next/image'
import React from 'react'
import ReviewCard from "../Review/ReviewCard"

type Props = {}

const reviews = [
    {
        "name": "John Doe",
        "avatar": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D",
        "profession": "Software Engineer",
        "comment": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
        "name": "Jane Smith",
        "avatar": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D",
        "profession": "Graphic Designer",
        "comment": "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    },
    {
        "name": "Alex Johnson",
        "avatar": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D",
        "profession": "Marketing Specialist",
        "comment": "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
    },
    {
        "name": "Emily Davis",
        "avatar": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D",
        "profession": "UX/UI Designer",
        "comment": "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
        "name": "Michael Brown",
        "avatar": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D",
        "profession": "Data Scientist",
        "comment": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium."
    },
    {
        "name": "Sophia White",
        "avatar": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D",
        "profession": "Content Writer",
        "comment": "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
    }
]

const Reviews = (props: Props) => {
    return (
        <div className='w-[90%] 800px:w-[85%] m-auto'>
            <div className='w-full 800px:flex items-center mb-2'>
                <div className='800px:w-[50%] w-full'>
                    <Image
                        src={require("../../../public/assets/client-1.png")}
                        alt='business'
                        width={700}
                        height={700}
                    />
                </div>
                <div className='800px:[50%] w-full'>
                    <h3 className={`${styles.title} 800px:!text-[40px]`}>
                        Our Students are <span className='text-blue-400'>Our Strength</span>{" "}
                        <br /> See What They Say About Us
                    </h3>
                    <br />
                    <p className={`${styles.label}`}>
                        fwioefiokneflwn wkjljfniownfwklen kwdb
                        wqdjqoijoqihf qwdnioqhfoiwqhf qwdioqhoqwh
                        qwdqowdhoihq lqwdoiqjif
                        qwdklnqwqn qkjbddq idnqfklqnfiqo qwiownqnlq
                        qwoqfoqwhfqfwbf qkdhoqf?
                    </p>
                </div>
                <br />
                <br />
            </div>
            <div className='grid grid-cols-1 gap-[25px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-2 lg:gap-[25px] xl:grid-cols-2 xl:gap-[35px] mb-12 border-0 md:[&>*:nth-(3)]:!mt-[-60px] md:[&>*:nth-(6)]:!mt-[-40px]'>
                    {reviews && 
                    reviews.map((i,index)=> <ReviewCard item={i} key={index} /> )}        
                </div>
        </div>
    )
}

export default Reviews