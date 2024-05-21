import BarChart from "./charts/BarChart";
import { barChartDataDailyTraffic } from "./variables/charts";
import { barChartOptionsDailyTraffic } from "./variables/charts";
import { MdArrowDropUp } from "react-icons/md";
import Card from "./card";
import { useState } from "react";
import ComputedService from "../../service/ComputedService";
import { useQuery } from "@tanstack/react-query";
import Chart from 'react-apexcharts';
const DailyTraffic = ({userCount}) => {
  const [userList, setUserList] = useState([]);
  let service = new ComputedService();
  const getUser = useQuery({
    queryKey: ["userList"],
    queryFn: () => service.getUser().then((res) => {
      if (res.data) {
        setUserList(res.data);
        return res.data;
      }
    }).catch((err) => {
      console.error(err);
    })
  })
  return (
    <Card extra="pb-7 p-[20px]">
      <div className="flex flex-row justify-between">
        <div className="ml-1 pt-2">
          <p className="text-xl font-bold leading-4 text-navy-700 dark:text-white">
            User
          </p>
          <p className="text-[34px] mt-3 font-bold text-navy-700 dark:text-white">
            {userCount}
          </p>
        </div>
        <div className="mt-2 flex items-start">
          {/* <div className="flex items-center text-sm text-green-500">
            <MdArrowDropUp className="h-5 w-5" />
            <p className="font-bold"> +2.45% </p>
          </div> */}
        </div>
      </div>

      <div className="h-[300px] w-full pt-10 pb-0">
      <Chart
        options={barChartOptionsDailyTraffic}
        series={barChartDataDailyTraffic(userList)}
        type="bar"
        width="100%"
        height="100%"
      />
      </div>
    </Card>
  );
};

export default DailyTraffic;
