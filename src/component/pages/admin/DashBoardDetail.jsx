import React, { useState } from 'react';
import TotalSpent from "./TotalSpent";
import PieChartCard from "./PieChartCard";
import { IoBookSharp } from "react-icons/io5";
import { MdOutlineStarRate } from "react-icons/md";
import { columnsDataCheck } from "./variables/columnsData";
import Widget from "./widget/Widget";
import CheckTable from "./CheckTable";
import DailyTraffic from "./DailyTraffic";
import { tableDataCheck } from "./variables/tableDataCheck";
import WeeklyRevenue from "./WeeklyRevenue";
import { chatbubbleEllipsesSharp, eyeSharp, heartSharp } from "ionicons/icons";
import { IonIcon } from "@ionic/react";
import { HiUsers } from "react-icons/hi";
import { useQuery } from '@tanstack/react-query';
import ComputedService from '../../service/ComputedService';

const DashBoardDetail = () => {
    const [totalComputed, setTotalComputed] = useState();
    let service = new ComputedService();
    const getTotal = useQuery({
        queryKey: 'totalComputed',
        queryFn: () => service.getTotal().then((res) => {
            if (res.data) {
                setTotalComputed(res.data);
                return res.data;
            }
        })
    })
    return (
        <div className="-ml-20 pt-5s h-full min-h-[84vh] md:pr-10">
            <div className='' >
                <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
                    <Widget
                        icon={<IonIcon icon={eyeSharp} className="h-7 w-7" />}
                        title={"Lượt đọc"}
                        subtitle={totalComputed?.readCount}
                    />
                    <Widget
                        icon={<IoBookSharp className="h-6 w-6" />}
                        title={"Số lượng sách"}
                        subtitle={totalComputed?.bookCount}
                    />
                    <Widget
                        icon={<MdOutlineStarRate className="h-7 w-7" />}
                        title={"Số đánh giá"}
                        subtitle={totalComputed?.reviewCount}
                    />
                    <Widget
                        icon={<IonIcon icon={chatbubbleEllipsesSharp} className="h-6 w-6" />}
                        title={"Số bình luận"}
                        subtitle={totalComputed?.commentCount}
                    />
                    <Widget
                        icon={<IonIcon icon={heartSharp} className="h-7 w-7" />}
                        title={"Số lượng thả cảm xúc"}
                        subtitle={totalComputed?.totalEmotion}
                    />
                    <Widget
                        icon={<HiUsers className="h-6 w-6" />}
                        title={"Số lượng user active"}
                        subtitle={totalComputed?.activeUser}
                    />
                </div>
                <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
                    <TotalSpent totalReadCount={totalComputed?.readCount} />
                    <WeeklyRevenue />
                </div>
                <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-2">
                    <div>
                        <CheckTable
                            columnsData={columnsDataCheck}
                            tableData={tableDataCheck}
                        />
                    </div>
                    <div className="grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-2">
                        <DailyTraffic />
                        <PieChartCard />
                    </div>
                    <div className="grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-2">
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashBoardDetail;