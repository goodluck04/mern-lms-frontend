import { styles } from '@/app/style/styles'
import { useUpdatePasswordMutation } from '@/redux/features/user/userApi';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

type Props = {}

function ChangePassword({ }: Props) {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [updatePassword, { isSuccess, error }] = useUpdatePasswordMutation();
    const PasswordChangeHandler = async (e: any) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            toast.error("Password do not match");
        } else {
            await updatePassword({ oldPassword, newPassword })
        }
    };

    useEffect(() => {
        if (isSuccess) {
            toast.success("Password changed successfully");
        }
        if (error) {
            if ("data" in error) {
                const errorData = error as any;
                toast.error(errorData.data.message)
            }
        }
    }, [error, isSuccess])



    return (
        <div className='w-full pl-7 px-2 800px:px-5 800px:pl-0'>
            <h1 className='block text-[25px] 800px:text-[30px] font-Poppins text-center font-[500] text-black dark:text-[#fff] pb-2'>
                Change Password
            </h1>
            <div className='w-full'>
                <form
                    aria-required
                    onSubmit={PasswordChangeHandler}
                    className='flex flex-col items-center'
                >
                    <div className='w-[100%] 800px:w-[60%] mt-5'>
                        <label htmlFor="" className='block pb-2  text-black dark:text-[#fff]'>Enter your old Password</label>
                        <input type="password" name="" id=""
                            className={`${styles.input} !w-[95%] mb-4 800px:mb-0  text-black dark:text-[#fff]`}
                            required
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                        />
                    </div>
                    <div className='w-[100%] 800px:w-[60%] mt-5'>
                        <label htmlFor="" className='block pb-2  text-black dark:text-[#fff]'>Enter your new Password</label>
                        <input type="password" name="" id=""
                            className={`${styles.input} !w-[95%] mb-4 800px:mb-0  text-black dark:text-[#fff]`}
                            required
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </div>
                    <div className='w-[100%] 800px:w-[60%] mt-5'>
                        <label htmlFor="" className='block pb-2  text-black dark:text-[#fff]'>Enter your confirm Password</label>
                        <input type="password" name="" id=""
                            className={`${styles.input} !w-[95%] mb-4 800px:mb-0  text-black dark:text-[#fff]`}
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <input type="submit" name="" id=""
                            className={`w-[95%] h-[48px] border border-[#37a39a] text-center dark:text-[#fff] text-black rounded-[3px] mt-8 cursor-pointer`}
                            required
                            value="Update"
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ChangePassword