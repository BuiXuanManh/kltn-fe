// import MiniCalendar from "components/calendar/MiniCalendar";
import TotalSpent from "./TotalSpent";
import PieChartCard from "./PieChartCard";
import { IoMdHome } from "react-icons/io";
import { IoBookSharp, IoDocuments } from "react-icons/io5";
import { MdBarChart, MdDashboard, MdOutlineStarRate } from "react-icons/md";

import { columnsDataCheck, columnsDataComplex } from "./variables/columnsData";

import Widget from "./widget/Widget";
import CheckTable from "./CheckTable";
// import ComplexTable from "views/admin/default/components/ComplexTable";
import DailyTraffic from "./DailyTraffic";
// import TaskCard from "views/admin/default/components/TaskCard";
import { tableDataCheck } from "./variables/tableDataCheck";
import WeeklyRevenue from "./WeeklyRevenue";
// import tableDataComplex from "./variables/tableDataComplex.json";
import Sidebar from "./sidebar";
import { chatbubbleEllipsesSharp, eyeSharp, heartSharp } from "ionicons/icons";
import { IonIcon } from "@ionic/react";
import { HiUsers } from "react-icons/hi";

const Dashboard = () => {
    return (
        <div className="grid grid-cols-8 w-full h-full">
            <div className="col-span-2">
                <Sidebar />
            </div>
            <div className=" col-span-6">
                <div className="pt-5s mx-auto mb-auto h-full min-h-[84vh] p-2 md:pr-2">
                    <div >
                        {/* Card widget */}
                        {/* open={open} onClose={() => setOpen(false)} */}
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

                        {/* Charts */}

                        <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
                            <TotalSpent />
                            <WeeklyRevenue />
                        </div>

                        {/* Tables & Charts */}

                        <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-2">
                            {/* Check Table */}
                            <div>
                                <CheckTable
                                    columnsData={columnsDataCheck}
                                    tableData={tableDataCheck}
                                />
                            </div>

                            {/* Traffic chart & Pie Chart */}

                            <div className="grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-2">
                                <DailyTraffic />
                                <PieChartCard />
                            </div>

                            {/* Complex Table , Task & Calendar */}

                            {/* <ComplexTable
          columnsData={columnsDataComplex}
          tableData={tableDataComplex}
        /> */}

                            {/* Task chart & Calendar */}

                            <div className="grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-2">
                                {/* <TaskCard /> */}
                                {/* <div className="grid grid-cols-1 rounded-[20px]">
                        <MiniCalendar />
                    </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
