import React, { useState } from "react";
import {
  MdArrowDropUp,
  MdOutlineCalendarToday,
  MdBarChart,
} from "react-icons/md";
import Card from "./card";
import {
  lineChartDataTotalSpent,
  lineChartOptionsTotalSpent,
} from "./variables/charts";
import LineChart from "./charts/LineChart";
import { IonIcon } from "@ionic/react";
import { eyeSharp } from "ionicons/icons";
import { useQuery } from "@tanstack/react-query";
import ComputedService from "../../service/ComputedService";

const TotalSpent = ({ totalReadCount }) => {
  const [readList, setReadList] = useState([]);
  const [emoList, setEmoList] = useState([]);
  let service = new ComputedService();
  const getRead = useQuery({
    queryKey: ["readList"],
    queryFn: () => service.getRead().then((res) => {
      if (res.data) {
        setReadList(res.data);
        return res.data;
      }
    }).catch((err) => {
      console.error(err);
    })
  })
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
  return (
    <Card extra="!p-[20px] text-center">
      <div className="flex justify-between">
        <h2 className="text-lg font-bold text-navy-700 dark:text-white">
          Lượt đọc / Đề cử
        </h2>
        {/* <button className="!linear z-[1] flex items-center justify-center rounded-lg bg-lightPrimary p-2 text-brand-500 !transition !duration-200 hover:bg-gray-100 active:bg-gray-200 dark:bg-navy-700 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/10">
          <MdBarChart className="h-6 w-6" />
        </button> */}
      </div>

      <div className="flex h-full w-full flex-row justify-between sm:flex-wrap lg:flex-nowrap 2xl:overflow-hidden">
        <div className="flex flex-col">
          <p className="flex mt-[20px] text-3xl font-bold text-navy-700 dark:text-white">
            <p className="text-brand-500 "><IonIcon icon={eyeSharp} className="w-7 h-7" /></p>
            <p className="ml-2">{totalReadCount}</p>
          </p>
          <div className="flex flex-col items-start">
            <p className="mt-2 text-sm text-gray-600">Tổng lượt đọc so với hôm qua</p>
            <div className="flex flex-row items-center justify-center">
              {/* <MdArrowDropUp className="font-medium text-green-500" /> */}
              {/* <p className="text-md mt-1 font-bold text-green-500"> +2.45% </p> */}
            </div>
          </div>
        </div>
        <div className="h-full w-full">
          <LineChart className="ml-2"
            options={lineChartOptionsTotalSpent}
            series={lineChartDataTotalSpent(readList, emoList)}
          />
        </div>
      </div>
    </Card>
  );
};

export default TotalSpent;
