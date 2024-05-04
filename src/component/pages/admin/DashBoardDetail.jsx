import React from 'react';
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

const DashBoardDetail = () => {
    return (
        <div className="-ml-20 pt-5s h-full min-h-[84vh] md:pr-10">
            <div className='' >
                <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
                    <Widget
                        icon={<IonIcon icon={eyeSharp} className="h-7 w-7" />}
                        title={"Lượt đọc"}
                        subtitle={"4500"}
                    />
                    <Widget
                        icon={<IoBookSharp className="h-6 w-6" />}
                        title={"Số lượng sách"}
                        subtitle={"9"}
                    />
                    <Widget
                        icon={<MdOutlineStarRate className="h-7 w-7" />}
                        title={"Số đánh giá"}
                        subtitle={"40"}
                    />
                    <Widget
                        icon={<IonIcon icon={chatbubbleEllipsesSharp} className="h-6 w-6" />}
                        title={"Số bình luận"}
                        subtitle={"30"}
                    />
                    <Widget
                        icon={<IonIcon icon={heartSharp} className="h-7 w-7" />}
                        title={"Số lượng thả cảm xúc"}
                        subtitle={"145"}
                    />
                    <Widget
                        icon={<HiUsers className="h-6 w-6" />}
                        title={"Số lượng user active"}
                        subtitle={"100"}
                    />
                </div>
                <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
                    <TotalSpent />
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