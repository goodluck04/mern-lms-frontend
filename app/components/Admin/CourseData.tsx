import { styles } from '@/app/style/styles';
import { AddCircle } from '@mui/icons-material';
import React, { FC } from 'react';
import toast from 'react-hot-toast';


type Props = {
    benefits: { title: string }[];
    setBenefits: (benefits: { title: string }[]) => void;
    prerequisites: { title: string }[];
    setPrerequisites: (prerequisites: { title: string }[]) => void;
    active: number;
    setActive: (active: number) => void;
}

const CourseData: FC<Props> = ({
    benefits,
    setBenefits,
    prerequisites,
    setPrerequisites,
    active,
    setActive,
}) => {

    const handleBenefitChange = (index: number, value: any) => {
        const updatedBenefits = [...benefits];
        updatedBenefits[index].title = value;
        setBenefits(updatedBenefits);
    }

    // it will create new row to add benefit row
    const handleAddBenefit = () => {
        if (benefits[benefits.length - 1].title !== "") {
            setBenefits([...benefits, { title: "" }]);
        } else {
            toast.error("Please fill the fields for go next!");
        }
        
    };

    // handlePrerequisites
    const handlePrerequisitesChange = (index: number, value: any) => {
        const updatedPrerequisites = [...prerequisites];
        updatedPrerequisites[index].title = value;
        setPrerequisites(updatedPrerequisites);
    }

    // it will create new row to add handlePrerequisites row
    const handlePrerequisites = () => {
        if (prerequisites[prerequisites.length - 1].title !== "") {
            setPrerequisites([...prerequisites, { title: "" }]);

        } else {
            toast.error("Please fill the fields for go next!");
        }
    };

    // prev next
    const prevButton = () => {
        setActive(active - 1);
    }

    const handleOptions = () => {
        if (benefits[benefits.length - 1].title !== "" && prerequisites[prerequisites.length - 1].title !== "") {
            setActive(active + 1);
        } else {
            toast.error("Please fill the fields for go next!");
        }
    }

    return (
        <div className='w-[80%] m-auto mt-24 block'>
            <div>
                <label htmlFor="" className={`${styles.label} text-[20px]`}>
                    What are the benefits for students in this course ?
                </label>
                <br />
                {
                    benefits.map((benefit: any, index: number) => (
                        <input
                            type="text"
                            name="benefit"
                            id=""
                            key={index}
                            placeholder='benefit...'
                            value={benefit.title}
                            className={`${styles.input} my-2`}
                            onChange={(e: any) => handleBenefitChange(index, e.target.value)}
                        />
                    ))
                }
                <AddCircle
                    style={{ margin: "10px 0px", cursor: "pointer", width: "30px" }}
                    onClick={handleAddBenefit}
                />
            </div>


            <div>
                <label htmlFor="" className={`${styles.label} text-[20px]`}>
                    What are the Prerequisites for students in this course ?
                </label>
                <br />
                {
                    prerequisites.map((prerequisite: any, index: number) => (
                        <input
                            type="text"
                            name="benefit"
                            id=""
                            key={index}
                            placeholder='prerequisites...'
                            value={prerequisite.title}
                            className={`${styles.input} my-2`}
                            onChange={(e: any) => handlePrerequisitesChange(index, e.target.value)}
                        />
                    ))
                }
                <AddCircle
                    style={{ margin: "10px 0px", cursor: "pointer", width: "30px" }}
                    onClick={handlePrerequisites}
                />
            </div>
            <div className='w-full flex items-center justify-between
            '>
                <div
                    className='w-44 800px:[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer'
                    onClick={() => prevButton()}
                >Prev</div>
                <div
                    className='w-44 800px:[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer'
                    onClick={() => handleOptions()}
                >Next</div>
            </div>
        </div>
    )
}

export default CourseData