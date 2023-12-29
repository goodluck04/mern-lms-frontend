import { styles } from '@/app/style/styles';
import { useGetHeroDataQuery } from '@/redux/features/layout/layoutApi';
import React, { FC, useEffect, useState } from 'react'

type Props = {
    courseInfo: any;
    setCourseInfo: (courseInfo: any) => void;
    active: number;
    setActive: (active: number) => void;
}

const CourseInformation: FC<Props> = ({ courseInfo, setCourseInfo, active, setActive }) => {
    const [dragging, setDragging] = useState(false);

    const {data} = useGetHeroDataQuery("Categories");
    const [categories,setCategories] = useState([])

    useEffect(() => {
      if(data){
        setCategories(data.layout.categories);
      }
    
     
    }, [data])
    


    const handleSubmit = (e: any) => {
        e.preventDefault();
        setActive(active + 1);
    }

    const handleFileChange = (e: any) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();

            reader.onload = (e: any) => {
                if (reader.readyState === 2) {
                    setCourseInfo({ ...courseInfo, thumbnail: reader.result });
                }
            };
            reader.readAsDataURL(file);
        };
    }

    // drag and drop
    const handleDragOver = (e: any) => {
        e.preventDefault();
        setDragging(true);
    }

    const handleDragLeave = (e: any) => {
        e.preventDefault();
        setDragging(false)
    }

    const handleDrop = (e: any) => {
        e.preventDefault();
        setDragging(false);


        const file = e.dataTransfer.files?.[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setCourseInfo({ ...courseInfo, thumbnail: reader.result });
            }
            reader.readAsDataURL(file);
        }
    }

    return (
        <div className='w-[80%] m-auto mt-24'>
            <form onSubmit={handleSubmit} >
                <div>
                    <label htmlFor="" className={`${styles.label}`}>
                        Course Name
                    </label>
                    <input required
                        value={courseInfo.name}
                        onChange={(e: any) => setCourseInfo({ ...courseInfo, name: e.target.value })}
                        type="text" name="name" id="name"
                        placeholder='MERN stack LMS platform '
                        className={`${styles.input}`}
                    />
                </div>
                <br />
                <br />
                <div className='mb-5'>
                    <label htmlFor="" className={`${styles.label}`}>Course Description</label>
                    <textarea required name="description" id="description" cols={30} rows={8} placeholder='Course Description'
                        value={courseInfo.description}
                        className={`${styles.input} !h-min !py-2`}
                        onChange={(e: any) => setCourseInfo({ ...courseInfo, description: e.target.value })}
                    ></textarea>
                </div>
                <br />
                <div className='w-full flex justify-between'>
                    <div className='w-[45%]'>
                        <label htmlFor="" className={`${styles.label}`}>Course Price</label>
                        <input required
                            value={courseInfo.price}
                            onChange={(e: any) => setCourseInfo({ ...courseInfo, price: e.target.value })}
                            type="number" name="price" id="price"
                            placeholder='20'
                            className={`${styles.input}`}
                        />
                    </div>
                    <div className='w-[45%]'>
                        <label htmlFor="" className={`${styles.label}`}>Estimated Price (optional)</label>
                        <input required
                            value={courseInfo.estimatedPrice}
                            onChange={(e: any) => setCourseInfo({ ...courseInfo, estimatedPrice: e.target.value })}
                            type="number" name="estimatedPrice" id="estimatedPrice"
                            placeholder='20'
                            className={`${styles.input}`}
                        />
                    </div>
                </div>
                <br />
                <div className='w-full flex justify-between'>
                    <div className='w-[45%]'>
                    <label htmlFor="" className={`${styles.label}`}>
                        Course Tags
                    </label>
                    <input required
                        value={courseInfo.tags}
                        onChange={(e: any) => setCourseInfo({ ...courseInfo, tags: e.target.value })}
                        type="text" name="tags" id="tags"
                        placeholder='MERN MEAN REACT'
                        className={`${styles.input}`}
                    />
                    </div>
                    <div className='w-[45%]'>
                        <label htmlFor="" className={`${styles.label}`}>Course Categories</label>
                       <select name="" id="" value={courseInfo.category}
                       onChange={(e:any) => 
                    setCourseInfo({...courseInfo, categories: e.target.value})}
                       className={`${styles.input}`}>
                        <option className='dark:bg-black' value="">Select Category</option>
                        {categories.map((item:any)=>(
                            <option className='dark:bg-black' value={item.title} key={item._id}>
                                {item.title}
                            </option>
                        ))}
                       </select>
                    </div>
                </div>
                <br />
                <div className='w-full flex justify-between'>
                    <div className='w-[45%]'>
                        <label htmlFor="" className={`${styles.label}`}>Course Level</label>
                        <input required
                            value={courseInfo.level}
                            onChange={(e: any) => setCourseInfo({ ...courseInfo, level: e.target.value })}
                            type="text" name="level" id="level"
                            placeholder='Beginner/Intermediate/Expert'
                            className={`${styles.input}`}
                        />
                    </div>
                    <div className='w-[45%]'>
                        <label htmlFor="" className={`${styles.label}`}>Demo Url</label>
                        <input required
                            value={courseInfo.demoUrl}
                            onChange={(e: any) => setCourseInfo({ ...courseInfo, demoUrl: e.target.value })}
                            type="text" name="demoUrl" id="demoUrl"
                            placeholder='eer74fd'
                            className={`${styles.input}`}
                        />
                    </div>
                </div>
                <br />
                <div className='w-full   relative'>
                    <input
                        type="file"
                        accept='image/*'
                        id="file"
                        name='thumbnail'
                        required={courseInfo.thumbnail ? false : true}
                        className='hidden opacity-0 absolute'
                        onChange={handleFileChange}
                    />
                    <label htmlFor="file"
                        className={`w-full hover:cursor-pointer   dark:bg-transparent border-[#00000026] p-3 dark:border-white flex items-center justify-center ${courseInfo?.thumbnail ? "min-h-[70vh]" : "min-h-[10vh]"} ${dragging ? "bg-blue-500" : "bg-transparent"} ${styles.input}`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrag={handleDrop}
                        draggable="true"
                    >
                        {
                            courseInfo.thumbnail ? (
                                <img src={courseInfo.thumbnail?.url ? courseInfo.thumbnail?.url : courseInfo.thumbnail} alt=""
                                    className='max-h-full w-full object-cover'
                                />
                            ) : (
                                <span className='text-black dark:text-white hover:cursor-pointer'>
                                    Drag and drop your thumbnail here or click to browse
                                </span>
                            )
                        }
                    </label>
                </div>

                <br />
                <div className='w-full flex items-center justify-end'>
                    <input required type="submit"
                        value="Next"
                        className='w-full 800px:w-[180px] h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer'
                    />
                </div>
                <br />
                <br />
            </form>
        </div>
    )
}

export default CourseInformation