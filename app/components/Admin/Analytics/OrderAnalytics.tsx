"use client"
import { styles } from '@/app/style/styles'
import { useGetOrdersAnalyticsQuery } from '@/redux/features/analytics/analyticsApi'
import React from 'react'
import {
    Line,
    LineChart,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,

} from 'recharts'
import Loader from '../../Loader/Loader'


type Props = {
    isDashboard?: boolean;
}

// const AnalyticsData = [
//     {
//         name: "Page A",
//         Count: 4000,
//     },
//     {
//         name: "Page B",
//         Count: 3000,
//     },
//     {
//         name: "Page C",
//         Count: 5000,
//     },
//     {
//         name: "Page D",
//         Count: 1000,
//     },
//     {
//         name: "Page E",
//         Count: 4000,
//     },
//     {
//         name: "Page F",
//         Count: 800,
//     },
//     {
//         name: "Page G",
//         Count: 200,
//     },
// ]


const OrderAnalytics = ({ isDashboard }: Props) => {
    const { isLoading, data } = useGetOrdersAnalyticsQuery({});

    const AnalyticsData:any = [];

    data &&
        data.orders.last12Months.forEach((item: any) => {
            AnalyticsData.push({ name: item.name, Count: item.count })
        });

    return (
        <>
            {
                isLoading ? (
                    <Loader />
                ) : (
                    <div className={`${isDashboard ? "h-[30vh]" : "h-screen"}`}>
                        <div className={`${isDashboard ? "mt-[0px] pl-[40px] mb-2" : "mt-[50px]"}`}>
                            <h1 className={`${styles.title} ${isDashboard && "!test-[20px]"} px-5 !text-start`}>
                                Orders Analytics
                            </h1>
                            {!isDashboard && (
                                <p className={`${styles.label} px-5`}>
                                    Last 12 months analytics data
                                </p>
                            )}
                        </div>
                        <div className={`w-full ${!isDashboard ? "h-[90%]" : "h-full"} flex items-center justify-center`}>
                            <ResponsiveContainer
                                width={isDashboard ? "100%" : "90%"}
                                height={isDashboard ? "100%" : "50%"}
                            >
                                <LineChart
                                    width={500}
                                    height={300}
                                    data={AnalyticsData}
                                    margin={{
                                        top: 5,
                                        right: 30,
                                        left: 20,
                                        bottom: 5,
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    {!isDashboard && <Legend />}
                                    <Line type="monotone" dataKey="Count" stroke='#82ca9d' />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default OrderAnalytics