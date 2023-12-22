import { styles } from '@/app/style/styles';
import React, { FC, useState } from 'react'
import { AiOutlineDelete, AiOutlinePlus, AiOutlinePlusCircle } from 'react-icons/ai';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { BsLink45Deg, BsPencil } from 'react-icons/bs';
import toast from 'react-hot-toast';


type Props = {
    active: number;
    setActive: (active: number) => void;
    courseContentData: any;
    setCourseContentData: (courseContent: any) => void;
    handleSubmit: any;
}

const CourseContent: FC<Props> = ({
    courseContentData,
    setCourseContentData,
    active,
    setActive,
    handleSubmit: handleCourseSubmit,
}) => {

    // collapse functionality
    const [isCollapse, setIsCollapsed] = useState(
        Array(courseContentData.length).fill(false)
    );


    // handling section
    const [activeSection, setActiveSection] = useState(1);

    // handle submit course
    const handleSubmit = (e: any) => {
        e.preventDefault();

    }


    // collapsing
    const handleCollapseToggle = (index: number) => {
        const updatedCollapsed = [...isCollapse];
        updatedCollapsed[index] = !updatedCollapsed[index];
        setIsCollapsed(updatedCollapsed);
    }

    const handleRemoveLink = (index: number, linkIndex: number) => {
        const updatedData = [...courseContentData];
        updatedData[index].links.splice(linkIndex, 1);
        setCourseContentData(updatedData);
    }

    //  add links
    const handleAddlink = (index: number) => {
        const updatedData = [...courseContentData];
        updatedData[index].links.push({ title: "", url: "" });
        setCourseContentData(updatedData);
    }

    // add new course in array
    const newContentHandler = (item: any) => {
        if (item.title === "" || item.description === "" || item.videoUrl === "" || item.links[0].title === "" || item.links[0].url === "") {
            toast.error("Please fill all fields first");
        } else {
            let newVideoSection = "";

            if (courseContentData.length > 0) {
                const lastVideoSection = courseContentData[courseContentData.length - 1].videoSection;

                // use the last videoSection if available, else use user input
                if (lastVideoSection) {
                    newVideoSection = lastVideoSection;
                }
                const newContent = {
                    videoUrl: "",
                    title: "",
                    description: "",
                    videoSection: newVideoSection,
                    links: [{ title: "", url: "" }]
                };
                setCourseContentData([...courseContentData, newContent]);
            }
        }
    }


    // add new section 
    const addNewSection = () => {
        if (
            courseContentData[courseContentData.length - 1].title === "" ||
            courseContentData[courseContentData.length - 1].description === "" ||
            courseContentData[courseContentData.length - 1].videoUrl === "" ||
            courseContentData[courseContentData.length - 1].links[0].title === "" ||
            courseContentData[courseContentData.length - 1].links[0].url === ""
        ) {
            toast.error("Please fill all the fields first!");
        } else {
            setActiveSection(activeSection + 1);
            const newSection = {
                videoUrl: "",
                title: "",
                description: "",
                videoSection: `Untitled Section ${activeSection}`,  // You can set a default value or leave it empty
                links: [{ title: "", url: "" }]
            };

            setCourseContentData([...courseContentData, newSection]);
        }
    }

    // prev page
    const prevButton = () => {
        setActive(active - 1);
    }

    // submit or next handling
    const handleOptions = () => {
        if (
            courseContentData[courseContentData.length - 1].title === "" ||
            courseContentData[courseContentData.length - 1].description === "" ||
            courseContentData[courseContentData.length - 1].videoUrl === "" ||
            courseContentData[courseContentData.length - 1].links[0].title === "" ||
            courseContentData[courseContentData.length - 1].links[0].url === ""
        ) {
            toast.error("Please fill all the fields first!");
        } else {
            setActive(active + 1);
            handleCourseSubmit();
        }
    }
    

    return (
        <div className='w-[80%] m-auto mt-24 p-3'>
            <form onSubmit={handleSubmit}>
                {courseContentData?.map((item: any, index: number) => {
                    const showSectionInput = index === 0 || item.videoSection !== courseContentData[index - 1].videoSection;
                    return (
                        <>
                            <div className={`w-full bg-[#cdc8c817] p-4 ${showSectionInput ? "mt-10" : "mb-0"}`}>
                                {/* section change  */}
                                {showSectionInput && (
                                    <>
                                        <div className='flex w-full items-center'>
                                            <input type="text"
                                                className={`text-[20px] ${item.videoSection === "Untitled Section" ? "w-[170px]" : "w-min"} font-Poppins cursor-pointer dark:text-white text-black bg-transparent outline-none`}
                                                value={item.videoSection}
                                                onChange={(e) => {
                                                    const updatedData = [...courseContentData];
                                                    updatedData[index].videoSection = e.target.value;
                                                    setCourseContentData(updatedData);
                                                }}
                                            />
                                            <BsPencil
                                                className="cursor-pointer dark:text-white text-black" />
                                        </div>
                                        <br />
                                    </>
                                )}
                                <div className='flex w-full items-center justify-between my-0'>
                                   {/* colloased section */}
                                    {
                                        isCollapse[index] ? (
                                            <>
                                                {item.title ? (
                                                    <p className='font-Poppins dark:text-white text-black'>{index + 1}. {item.title}</p>
                                                ) : <></>}
                                            </>
                                        ) : (<div></div>)
                                    }

                                    {/* // arrow button for collapse video button */}
                                    <div className='flex items-center'>
                                        <AiOutlineDelete
                                            className={`dark:text-white text-black text-[20px] mr-2 ${index > 0 ? "cursor-pointer" : "cursor-no-drop"
                                                }`}
                                            onClick={() => {
                                                if (index > 0) {
                                                    const updatedData = [...courseContentData];
                                                    updatedData.splice(index, 1);
                                                    setCourseContentData(updatedData);
                                                }
                                            }}
                                        />
                                        <MdOutlineKeyboardArrowDown
                                            fontSize="large"
                                            className="dark:text-white text-black"
                                            style={{
                                                transform: isCollapse[index] ? "rotate(180deg)" : "rotate(0deg)"
                                            }}
                                            onClick={() => handleCollapseToggle(index)}
                                        />
                                    </div>
                                </div>
                                {
                                    !isCollapse[index] && (
                                        <>
                                            <div className='my-3'>
                                                <label htmlFor="" className={styles.label}>Video Title</label>
                                                <input type="text"
                                                    placeholder='Project Plan...'
                                                    className={`${styles.input}`}
                                                    value={item.value}
                                                    onChange={(e) => {
                                                        const updatedData = [...courseContentData];
                                                        updatedData[index].title = e.target.value;
                                                        setCourseContentData(updatedData)
                                                    }}
                                                />
                                            </div>
                                            <div
                                                className='mb-3'
                                            >
                                                <label htmlFor=""
                                                    className={styles.label}
                                                >Video Url</label>
                                                <input type="text"
                                                    placeholder='link..'
                                                    className={styles.input}
                                                    value={item.videoUrl}
                                                    onChange={(e) => {
                                                        const updatedData = [...courseContentData];
                                                        updatedData[index].videoUrl = e.target.value;
                                                        setCourseContentData(updatedData);
                                                    }}
                                                />
                                            </div>
                                            <div
                                                className='mb-3'
                                            >
                                                <label htmlFor=""
                                                    className={styles.label}
                                                >Video Description</label>
                                                <textarea
                                                    rows={8}
                                                    cols={30}
                                                    placeholder='Description..'
                                                    className={`${styles.input} !h-min py-2`}
                                                    value={item.description}
                                                    onChange={(e) => {
                                                        const updatedData = [...courseContentData];
                                                        updatedData[index].description = e.target.value;
                                                        setCourseContentData(updatedData);
                                                    }}
                                                />
                                                <br />
                                            </div>
                                            {item?.links.map((link: any, linkIndex: number) => (
                                                <div
                                                    className='mb-3 block'
                                                >
                                                    <div
                                                        className='w-full flex items-center justify-between'
                                                    >
                                                        <label htmlFor=""
                                                            className={styles.label}
                                                        >Link {linkIndex + 1}</label>
                                                        <AiOutlineDelete
                                                            className={`${linkIndex === 0 ? "cursor-no-drop" : "cursor-pointer"
                                                                } text-black dark:text-white text-[20px]`}
                                                            onClick={() => linkIndex === 0 ? null : handleRemoveLink(index, linkIndex)
                                                            }
                                                        />
                                                    </div>
                                                    <input
                                                        type="text"
                                                        placeholder='Source Code... (Link title)'
                                                        className={`${styles.input}`}
                                                        value={link.title}
                                                        onChange={(e) => {
                                                            const updatedData = [...courseContentData];
                                                            updatedData[index].links[linkIndex].title = e.target.value;
                                                            setCourseContentData(updatedData);
                                                        }}
                                                    />
                                                    <input
                                                        type="text"
                                                        placeholder='Source Code... (Link URL)'
                                                        className={`${styles.input} mt-6`}
                                                        value={link.url}
                                                        onChange={(e) => {
                                                            const updatedData = [...courseContentData];
                                                            updatedData[index].links[linkIndex].url = e.target.value;
                                                            setCourseContentData(updatedData);
                                                        }}
                                                    />
                                                </div>
                                            ))}
                                            <br />
                                            {/* add links button */}
                                            <div className='inline-block mb-4'>
                                                <p
                                                    className='flex items-center text-[18px] dark:text-white text-black cursor-pointer'
                                                    onClick={() => handleAddlink(index)}
                                                >
                                                    <BsLink45Deg className="mr-2" /> Add Link
                                                </p>
                                            </div>
                                        </>
                                    )
                                }
                                <br />
                                {/* add new content */}
                                {index === courseContentData.length - 1 && (
                                    <div>
                                        <p
                                            className='flex items-center text-[18px] dark:text-white text-black cursor-pointer'
                                            onClick={(e: any) => newContentHandler(item)}
                                        >
                                            <AiOutlinePlus className="mr-2" /> Add New Content
                                        </p>
                                    </div>
                                )}
                            </div>
                        </>
                    )
                })}
                <br />
                <div
                    className='flex items-center text-[20px] dark:text-white text-black cursor-pointer'
                    onClick={() => addNewSection()}
                >
                    <AiOutlinePlusCircle className="mr-2" /> Add new Section
                </div>
            </form>
            <br />
            <div className='w-full flex items-center justify-between'>
                <div
                    className='w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer'
                    onClick={() => prevButton()}>Prev</div>
                <div
                    className='w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer'
                    onClick={() => handleOptions()}>Next</div>
            </div>
            <br />
            <br />
            <br />
        </div>
    )
}

export default CourseContent