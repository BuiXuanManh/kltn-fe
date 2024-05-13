import { useQuery } from "@tanstack/react-query";
import Card from "./card";
import BarChart from "./charts/BarChart";
import {
  barChartDataWeeklyRevenue,
  barChartOptionsWeeklyRevenue,
} from "./variables/charts";
import { MdBarChart } from "react-icons/md";
import { useState } from "react";
import ComputedService from "../../service/ComputedService";

const WeeklyRevenue = () => {
  const [emoList, setEmoList] = useState([]);
  const [rateList, setRateList] = useState([]);
  const [commentList, setCommentList] = useState([]);
  let service = new ComputedService();
  const getEmo = useQuery({
    queryKey: ["emoList"],
    queryFn: () => service.getEmo().then((res) => {
      if (res.data) {
        setEmoList(res.data);
        return res.data;
      }
    }).catch((err) => {
      console.error(err);
    })
  })
  const getRate = useQuery({
    queryKey: ["rateList"],
    queryFn: () => service.getRate().then((res) => {
      if (res.data) {
        setRateList(res.data);
        return res.data;
      }
    }).catch((err) => {
      console.error(err);
    })
  })
  const getComment = useQuery({
    queryKey: ["commentList"],
    queryFn: () => service.getComment().then((res) => {
      if (res.data) {
        setCommentList(res.data);
        return res.data;
      }
    }).catch((err) => {
      console.error(err);
    })
  })
  console.log(emoList)
  return (
    <Card extra="flex flex-col bg-white w-full rounded-3xl py-6 px-2 text-center">
      <div className="mb-auto flex items-center justify-between px-6">
        <h2 className="text-lg font-bold text-navy-700 dark:text-white">
          Weekly Revenue
        </h2>
        <button className="!linear z-[1] flex items-center justify-center rounded-lg bg-lightPrimary p-2 text-brand-500 !transition !duration-200 hover:bg-gray-100 active:bg-gray-200 dark:bg-navy-700 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/10">
          <MdBarChart className="h-6 w-6" />
        </button>
      </div>

      <div className="md:mt-16 lg:mt-0">
        <div className="h-[250px] w-full xl:h-[350px]">
          <BarChart
            chartData={barChartDataWeeklyRevenue(emoList, commentList, rateList)}
            chartOptions={barChartOptionsWeeklyRevenue}
          />
        </div>
      </div>
    </Card>
  );
};

export default WeeklyRevenue;
