import PieChart from "./charts/PieChart";
import { pieChartData, pieChartOptions } from "./variables/charts";
import Card from "./card";
import { useState } from "react";
import ComputedService from "../../service/ComputedService";
import { useQuery } from "@tanstack/react-query";
import Chart from "react-apexcharts";
const PieChartCard = () => {
  const [genresName, setGenresName] = useState([]);
  const [genresPercent, setGenresPercent] = useState([]);
  let service = new ComputedService();
  const getRead = useQuery({
    queryKey: ["genresList"],
    queryFn: () => service.getGenres().then((res) => {
      if (res.data) {
        // Chuyển đổi từ Map<String, Integer> sang hai mảng riêng biệt
        const genresArray = Object.entries(res.data);
        const names = genresArray.map(([name, percent]) => name);
        const percents = genresArray.map(([name, percent]) => percent);

        setGenresName(names);
        setGenresPercent(percents);

        return { names, percents };
      }
    }).catch((err) => {
      console.error(err);
    })
  })
  const colors = ["bg-[#4318FF]", "bg-[#6AD2FF]", "bg-[#FFED8A]", "bg-[#EAE4D3]"]
  return (
    <Card extra="rounded-[20px] p-3">
      <div className="flex flex-row justify-between px-3 pt-2">
        <div>
          <h4 className="text-lg font-bold text-navy-700 dark:text-white">
            Tỉ lệ thể loại và sách
          </h4>
        </div>
        {/* 
        <div className="mb-6 flex items-center justify-center">
          <select className="mb-3 mr-2 flex items-center justify-center text-sm font-bold text-gray-600 hover:cursor-pointer dark:!bg-navy-800 dark:text-white">
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
            <option value="weekly">Weekly</option>
          </select>
        </div> */}
      </div>

      <div className="mb-auto flex h-[220px] mt-10 w-full items-center justify-center">
        {/* <PieChart options={pieChartOptions} series={pieChartData} /> */}
        <Chart
          options={pieChartOptions(genresName)}
          type="pie"
          width="100%"
          height="100%"
          series={pieChartData(genresPercent)}
        />
      </div>
      {
        genresName.map((name, index) => (
          <div className="flex items-center !justify-between" key={index}>
            <div className="flex items-center">
              <div className={`h-2 w-2 rounded-full ${colors[index]}`} />
              <div className="ml-1 text-sm font-normal text-gray-600">{name}</div>
            </div>
            <p className="mt-px text-xl font-bold text-navy-700 dark:text-white">
              {genresPercent[index]}%
            </p>
          </div>
        ))
      }
      {/* <div className="flex items-center !justify-between">
        <div className="flex items-center">
          <div className="h-2 w-2 rounded-full bg-brand-500" />
          <div className="ml-1 text-sm font-normal text-gray-600">Phát triển bản thân</div>
        </div>
        <p className="mt-px text-xl font-bold text-navy-700 dark:text-white">
          25%
        </p>
      </div> */}

      {/* <div className="h-11 w-px bg-gray-300 dark:bg-white/10" /> */}

      {/* <div className="flex items-center !justify-between">
        <div className="flex ">
          <div className="h-2 w-2 rounded-full bg-[#6AD2FF]" />
          <div className="ml-1 text-sm font-normal text-gray-600">Phát triển bản thân</div>
        </div>
        <p className="mt-px text-xl font-bold text-navy-700 dark:text-white">
          25%
        </p>
      </div>
      <div className="flex items-center !justify-between">
        <div className="flex ">
          <div className="h-2 w-2 rounded-full bg-[#6AD2FF]" />
          <div className="ml-1 text-sm font-normal text-gray-600">Phát triển bản thân</div>
        </div>
        <p className="mt-px text-xl font-bold text-navy-700 dark:text-white">
          25%
        </p>
      </div>

      <div className="h-11 w-[1%] bg-gray-300 dark:bg-white/10" />
      <div className="flex items-center !justify-between">
        <div className="flex ">
          <div className="h-2 w-2 rounded-full bg-[#6AD2FF]" />
          <div className="ml-1 text-sm font-normal text-gray-600">Phát triển bản thân</div>
        </div>
        <p className="mt-px text-xl font-bold text-navy-700 dark:text-white">
          25%
        </p>
      </div> */}
    </Card >
  );
};

export default PieChartCard;
