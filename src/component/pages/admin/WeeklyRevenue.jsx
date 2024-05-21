import { useQuery } from "@tanstack/react-query";
import Card from "./card";
import BarChart from "./charts/BarChart";
import {
  barChartDataWeeklyRevenue,
  barChartOptionsWeeklyRevenue,
} from "./variables/charts";
import { useState } from "react";
import ComputedService from "../../service/ComputedService";
import Chart from 'react-apexcharts';
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
  return (
    <Card extra="flex flex-col bg-white w-full rounded-3xl py-6 px-2 text-center">
      <div className="mb-auto flex items-center justify-between px-6">
        <h2 className="text-lg font-bold text-navy-700 dark:text-white">
          Cảm xúc / Bình luận/ Đánh giá
        </h2>
      </div>

      <div className="md:mt-16 lg:mt-0">
        <div className="h-[250px] w-full xl:h-[350px]">
          <Chart
            options={barChartOptionsWeeklyRevenue}
            series={barChartDataWeeklyRevenue(getEmo?.data, commentList, rateList)}
            type="bar"
            width="100%"
            height="100%"
          />
        </div>
      </div>
    </Card>
  );
};

export default WeeklyRevenue;
