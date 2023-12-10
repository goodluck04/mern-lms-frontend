import { AiOutlineCamera } from 'react-icons/ai';
import avatarIcon from "../../../../public/assets/avatar.png";
import React, { FC, useEffect, useState } from 'react';
import Image from 'next/image';
import { styles } from '@/app/style/styles';
import { useEditProfileMutation, useUpdateAvatarMutation } from '@/redux/features/user/userApi';
import { useLoadUserQuery } from '@/redux/features/api/apiSlice';
import toast from 'react-hot-toast';


type Props = {
    avatar: string | null;
    user: any;
}

const ProfileInfo: FC<Props> = ({ avatar, user }) => {
    const [name, setName] = useState(user && user.name);
    const [updateAvatar, { isSuccess, error }] = useUpdateAvatarMutation();
    const [loadUser, setLoadUser] = useState(false);
    const { } = useLoadUserQuery(undefined, { skip: loadUser ? false : true })
    const [editProfile, { isSuccess: EditSuccess, error: editError }] = useEditProfileMutation();




    // not working bcoz cloudinary is slow
    const imageHandler = async (e: any) => {
        const fileReader = new FileReader();
        fileReader.onload = () => {
            if (fileReader.readyState === 2) {
                const avatar = fileReader.result
                updateAvatar(avatar);
            }
        }
        fileReader.readAsDataURL(e.target.files[0]);
    };

    useEffect(() => {
        if (isSuccess || EditSuccess) {
            setLoadUser(true);
        }
        if (EditSuccess) {
            toast.success("Profile updated succesfully");
        }
        if (error || editError) {
            console.log(error)
            console.log(editError);

        }
    }, [isSuccess, error, editError, EditSuccess])


    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (name !== "") {
            await editProfile({
                name: name,
                email: user.email,
            });
        }


    }

    return (
        <>
            <div className='w-full flex justify-center'>
                <div className='relative'>
                    <Image
                        src={user.avatar || avatar ? user.avatar.url || avatar : avatarIcon}
                        alt=''
                        className='w-[120px] h-[120px] cursor-pointer border-[3px] border-[#37a39a] rounded-full'
                        width={120}
                        height={120}
                    />

                    <label htmlFor="avatar">
                        <div className='w-[30px] h-[30px] bg-slate-900 rounded-full absolute bottom-2 right-2 flex items-center justify-center cursor-pointer'>
                            <input
                                type="file"
                                name=""
                                id="avatar"
                                onChange={imageHandler}
                                accept='image/png,image/jpg,image/jpeg,image/webp'
                                className='hidden'
                            />
                            <span className='z-1'> <AiOutlineCamera size={20} />
                            </span>
                        </div>
                    </label>
                </div>
            </div>
            <br />
            <br />
            <div className='w-full pl-6 800px:pl-10'>
                <form onSubmit={handleSubmit}>
                    <div className='800px:w-[50%] m-auto block pb-4'>
                        <div className='w-[100%]'>
                            <label className='block pb-2' htmlFor="">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                required
                                value={name}
                                className={`${styles.input} !w-[95%] mb-1 800px:mb-0`}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className='!w-[100%] pt-2'>
                            <label className='block pb-2' htmlFor="">Email Address</label>
                            <input
                                type="email"
                                name="name"
                                readOnly
                                id="name"
                                required
                                value={user?.email}
                                className={`${styles.input} !w-[95%] mb-1 800px:mb-0`}
                            // onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <input
                            type="submit"
                            value="Update"
                            className={`!w-[95%] 800px:w-[250px] h-[40px] border-[#37a39a] border dark:text-[#fff] text-center text-black rounded-[3px] mt-8 cursor-pointer`}
                    />
                    </div>
                </form>
                <br />
            </div>
        </>

    )
}

export default ProfileInfo