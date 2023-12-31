"use client"
import React, { FC, useEffect, useState } from 'react'
import CourseInformation from "../CourseInformation"
import CourseOptions from "../CourseOptions"
import CourseData from "../CourseData"
import CourseContent from "../CourseContent";
import CoursePreview from "../CoursePreview"
import { useEditCourseMutation, useGetAllCoursesQuery } from '@/redux/features/courses/coursesApi'
import toast from 'react-hot-toast'
import { redirect } from 'next/navigation'

type Props = {
    id: string
}

const CreateCourse: FC<Props> = ({ id }) => {


    const [editCourse, { isSuccess, error }] = useEditCourseMutation();

    const { isLoading, data, refetch } = useGetAllCoursesQuery({}, { refetchOnMountOrArgChange: true });


    const editCourseData = data && data.courses.find((i: any) => i._id === id);
    // console.log(editCourseData);


    useEffect(() => {
        if (editCourseData) {
            setCourseInfo({
                name: editCourseData?.name,
                description: editCourseData?.description,
                categories: editCourseData?.categories,
                price: editCourseData?.price,
                estimatedPrice: editCourseData?.estimatedPrice,
                tags: editCourseData?.tags,
                thumbnail: editCourseData?.thumbnail,
                level: editCourseData?.level,
                demoUrl: editCourseData?.demoUrl,
            })
            setBenefits(editCourseData.benefits);
            setPrerequisites(editCourseData.prerequisites);
            setCourseContentData(editCourseData.courseData);

        }

    }, [editCourseData])




    useEffect(() => {
        if (isSuccess) {
            toast.success("Course Updated successfully");
            redirect("/admin/courses");
        }
        if (error) {
            if ("data" in error) {
                const errorMessage = error as any;

                toast.error(errorMessage.data.message)

            }
        }
    }, [isLoading, isSuccess, error])

    const [active, setActive] = useState(0);
    const [courseInfo, setCourseInfo] = useState({
        name: "",
        description: "",
        price: "",
        estimatedPrice: "",
        tags: "",
        level: "",
        categories:"",
        demoUrl: "",
        thumbnail: "",
    });
    const [benefits, setBenefits] = useState([{ title: "" }]);
    const [prerequisites, setPrerequisites] = useState([{ title: "" }]);
    const [courseContentData, setCourseContentData] = useState([
        {
            videoUrl: "",
            title: "",
            description: "",
            videoSection: "Untitled Section",
            videoLength: "",
            links: [
                {
                    title: "",
                    url: "",
                }
            ],
            suggestion: ""
        },
    ]);
    const [courseData, setCourseData] = useState({});
    // console.log(courseData)

    const handleSubmit = async () => {
        // format benefits array
        const formattedBenefits = benefits.map((benefit) => ({ title: benefit.title }));
        // formated prerequisites
        const formattedPrerequisites = prerequisites.map((prerequisite) => ({ title: prerequisite.title }));
        // format course content array
        const formattedCourseContentData = courseContentData.map((courseContent) => ({
            videoUrl: courseContent.videoUrl,
            title: courseContent.title,
            description: courseContent.description,
            videoSection: courseContent.videoSection,
            videoLength: courseContent.videoLength,
            links: courseContent.links.map((link) => ({
                title: link.title,
                url: link.url,
            })),
            suggestion: courseContent.suggestion,
        }));

        // prepareour data object
        const data = {
            name: courseInfo.name,
            description: courseInfo.description,
            price: courseInfo.price,
            estimatedPrice: courseInfo.estimatedPrice,
            tags: courseInfo.tags,
            thumbnail: courseInfo.thumbnail,
            level: courseInfo.level,
            categories: courseInfo.categories,
            demoUrl: courseInfo.demoUrl,
            totalVideos: courseContentData.length,
            benefits: formattedBenefits,
            prerequisites: formattedPrerequisites,
            courseData: formattedCourseContentData,
        };
        setCourseData(data);
    };

    // console.log(courseData);

    const handleCourseCreate = async (e: any) => {
        const data = courseData;
        // console.log(data);

        await editCourse({ id: editCourseData?._id, data });
    }



    return (
        <div
            className='w-full flex min-h-screen'
        >
            <div className='w-[80%]'>
                {
                    active === 0 && (
                        <CourseInformation
                            courseInfo={courseInfo}
                            setCourseInfo={setCourseInfo}
                            active={active}
                            setActive={setActive}
                        />
                    )
                }
                {
                    active === 1 && (
                        <CourseData
                            benefits={benefits}
                            setBenefits={setBenefits}
                            prerequisites={prerequisites}
                            setPrerequisites={setPrerequisites}
                            active={active}
                            setActive={setActive}
                        />
                    )
                }
                {
                    active === 2 && (
                        <CourseContent
                            active={active}
                            setActive={setActive}
                            courseContentData={courseContentData}
                            setCourseContentData={setCourseContentData}
                            handleSubmit={handleSubmit}
                        />
                    )
                }
                {
                    active === 3 && (
                        <CoursePreview
                            active={active}
                            setActive={setActive}
                            courseData={courseData}
                            handleCourseCreate={handleCourseCreate}
                            isEdit={true}
                        />
                    )
                }
            </div>
            <div className='w-[20%] mt-[100px] h-screen z-[-1] top-18 right-0'>
                <CourseOptions active={active} setActive={setActive} />
            </div>
        </div>
    )
}

export default CreateCourse