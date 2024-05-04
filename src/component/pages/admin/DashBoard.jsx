import Sidebar from "./sidebar";
import { useState } from "react";
import DashBoardDetail from "./DashBoardDetail";
import AddBook from "./AddBook";

const Dashboard = () => {
    const [activeRoute, setActiveRoute] = useState("dashboard");
    return (
        <div className="grid grid-cols-8 w-full h-full">
            <div className="col-span-2 justify-start items-start">
                <Sidebar activeRoute={activeRoute} setActiveRoute={setActiveRoute} />
            </div>
            <div className="col-span-6">
                {activeRoute === "dashboard" && <DashBoardDetail />}
                {activeRoute === "addBook" && <AddBook />}
            </div>
        </div>
    );
};

export default Dashboard;
