"use client"
import { useGetAllCoursesQuery } from '@/redux/features/courses/coursesApi';
import { Box } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useTheme } from 'next-themes';
import React, { FC, useEffect, useState } from 'react'
import Loader from '../../Loader/Loader';
import { format } from 'timeago.js';
import { useGetAllOrdersQuery } from '@/redux/features/orders/ordersApi';
import { useGetAllUsersQuery } from '@/redux/features/user/userApi';
import { AiOutlineMail } from 'react-icons/ai';




type Props = {
    isDashboard?: boolean;
}

const AllInvoices: FC<Props> = ({ isDashboard }) => {

    const { theme, setTheme } = useTheme();
    const { isLoading, data } = useGetAllOrdersQuery({});
    const { data: userData } = useGetAllUsersQuery({});
    const { data: courseData } = useGetAllCoursesQuery({});

    const [orderData, setOrderData] = useState<any>([]);
    // console.log(courseData);


    useEffect(() => {
        if (data) {
            const temp = data.courses.map((item: any) => {
              const user = userData?.users.find((user: any) => user._id === item.userId);
              const course = courseData?.courses.find((course: any) => course._id === item.courseId);
        
             
                return {
                  ...item,
                  userName: user?.name,
                  userEmail: user?.email,
                  title: course?.name,
                  price: "$" + course?.price,
                };
            });
            setOrderData(temp);
          }
        }, [data, userData, courseData]);

    // console.log(orderData);

    const columns: any = [
        { field: "id", headerName: "ID", flex: 0.3 },
        { field: "userName", headerName: "Name", flex: isDashboard ? 0.6 : 0.5 },
        ...(isDashboard
          ? []
          : [
              { field: "userEmail", headerName: "Email", flex: 1 }, // Changed field to "userEmail"
              { field: "title", headerName: "Course Title", flex: 1 },
            ]),
        { field: "price", headerName: "Price", flex: 0.5 },
        ...(isDashboard
          ? [{ field: "createdAt", headerName: "Created At", flex: 0.5 }]
          : [
              {
                field: "emailAction", // Changed field name to avoid duplication
                headerName: "Email",
                flex: 0.2,
                renderCell: (params: any) => {
                  return (
                    <a href={`mailto:${params.row.userEmail}`}>
                      <AiOutlineMail className="dark:text-white text-black" size={20} />
                    </a>
                  );
                },
              },
            ]),
      ];
      

    const rows: any = [
        // {
        //     id: "12345353453453",
        //     userName: "hi there",
        //     userEmail: "dsnfiknfioewoi",
        //     title: "ReactJS",
        //     price: "$550",
        //     createdAt: "2days ago"
        // },
        // {
        //     id: "12345353453453",
        //     userName: "hi there",
        //     userEmail: "dsnfiknfioewoi",
        //     title: "ReactJS",
        //     price: "$550",
        //     createdAt: "2days ago"
        // },
        // {
        //     id: "12345353453453",
        //     userName: "hi there",
        //     userEmail: "dsnfiknfioewoi",
        //     title: "ReactJS",
        //     price: "$550",
        //     createdAt: "2days ago"
        // },
        // {
        //     id: "12345353453453",
        //     userName: "hi there",
        //     userEmail: "dsnfiknfioewoi",
        //     title: "ReactJS",
        //     price: "$550",
        //     createdAt: "2days ago"
        // },
        // {
        //     id: "12345353453453",
        //     userName: "hi there",
        //     userEmail: "dsnfiknfioewoi",
        //     title: "ReactJS",
        //     price: "$550",
        //     createdAt: "2days ago"
        // },
        // {
        //     id: "12345353453453",
        //     userName: "hi there",
        //     userEmail: "dsnfiknfioewoi",
        //     title: "ReactJS",
        //     price: "$550",
        //     createdAt: "2days ago"
        // },
        // {
        //     id: "12345353453453",
        //     userName: "hi there",
        //     userEmail: "dsnfiknfioewoi",
        //     title: "ReactJS",
        //     price: "$550",
        //     createdAt: "2days ago"
        // },
        // {
        //     id: "12345353453453",
        //     userName: "hi there",
        //     userEmail: "dsnfiknfioewoi",
        //     title: "ReactJS",
        //     price: "$550",
        //     createdAt: "2days ago"
        // },
        // {
        //     id: "12345353453453",
        //     userName: "hi there",
        //     userEmail: "dsnfiknfioewoi",
        //     title: "ReactJS",
        //     price: "$550",
        //     createdAt: "2days ago"
        // },
    ];

    // if (data && orderData.orders) {
    //     orderData.orders.forEach((item: any) => {
    //         rows.push({
    //             id: item._id,
    //             userName: item.userName,
    //             userEmail: item.userEmail,
    //             title: item.title,
    //             price: item.price,
    //             createdAt: format(item.createdAt)
    //         })
    //     });
    // }

    if (orderData && orderData.length > 0) {
        orderData.forEach((item: any) => {
          rows.push({
            id: item._id,
            userName: item.userName,
            userEmail: item.userEmail,
            title: item.title,
            price: item.price,
            createdAt: format(item.createdAt),
          });
        });
      }

    return (
        <div className={!isDashboard ? "mt-[120px]" : "mt-[0px]"}>
            {isLoading ? (
                <Loader />
            ) : (
                <Box m={isDashboard ? "0" : "40px"}>
                    <Box
                        m={isDashboard ? "0" : "40px 0 0 0"}
                        height={isDashboard ? "35vh" : "90vh"}
                        overflow={"hidden"}
                        sx={{
                            "& .MuiDataGrid-root": {
                                border: "none",
                                outline: "none",
                            },
                            "& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon": {
                                color: theme === "dark" ? "#fff" : "#000",
                            },
                            "& .MuiDataGrid-sortIcon": {
                                color: theme === "dark" ? "#fff" : "#000",
                            },
                            "& .MuiDataGrid-row": {
                                color: theme === "dark" ? "#fff" : "#000",
                                borderBottom:
                                    theme === "dark"
                                        ? "1px solid #ffffff30!important"
                                        : "1px solid #ccc!important",
                            },
                            "& .MuiTablePagination-root": {
                                color: theme === "dark" ? "#fff" : "#000",
                            },
                            "& .MuiDataGrid-cell": {
                                borderBottom: "none",
                            },
                            "& .name-column-cell": {
                                color: theme === "dark" ? "#fff" : "#000",
                            },
                            "& .MuiDataGrid-columnHeaders": {
                                backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC",
                                borderBottom: "none",
                                color: theme === "dark" ? "#fff" : "#000",
                            },
                            "& .MuiDataGrid-virtualScroller": {
                                backgroundColor: theme === "dark" ? "#1F2A40" : "#F2F0F0",
                            },
                            '& .MuiDataGrid-footerContainer': {
                                borderTop: 'none',
                                backgroundColor: theme === 'dark' ? '#3e4396' : '#A4A9FC',
                                color: theme === 'dark' ? '#fff' : '#000',
                            },
                            "& .MuiCheckbox-root": {
                                color: theme === "dark" ? `#b7ebde !important` : `#000 !important`,
                            },
                            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                                color: `#fff !important`,
                            },
                        }}
                    >
                        <DataGrid
                            checkboxSelection={isDashboard ? false : true}
                            rows={rows}
                            columns={columns}
                            components={isDashboard ? {} : { Toolbar: GridToolbar }}
                        />
                    </Box>
                </Box>
            )}
        </div>
    )
}

export default AllInvoices