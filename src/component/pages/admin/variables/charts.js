import moment from 'moment';
const date = Date.now()
const days = [];
const getDays = () => {
  for (let i = 0; i < 6; i++) {
    days.push(moment(date).subtract(i, 'days').format('DD/MM')); // Tính toán và thêm ngày vào mảng
  }
  return days.reverse();
}
export const barChartDataDailyTraffic = (userList) => [
  {
    name: "Số lượng user",
    data: userList,
  },
];

export const barChartOptionsDailyTraffic = {
  chart: {
    toolbar: {
      style: {
        fontSize: "12px",
        fontFamily: undefined, // Keep your existing font
        backgroundColor: "bg-gray-800", // Dark gray background for dark mode
        color: "text-white" // White text and icons for dark mode
      }
    },
  },
  tooltip: {
    style: {
      fontSize: "12px",
      fontFamily: undefined,
      backgroundColor: "#000000"
    },
    onDatasetHover: {
      style: {
        fontSize: "12px",
        fontFamily: undefined,
      },
    },
    theme: "dark",
  },
  xaxis: {
    categories: days,
    show: false,
    labels: {
      show: true,
      style: {
        colors: "#314155",
        fontSize: "14px",
        fontWeight: "500",
      },
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    show: false,
    color: "black",
    labels: {
      show: true,
      style: {
        colors: "#CBD5E0",
        fontSize: "14px",
      },
    },
  },
  grid: {
    show: false,
    strokeDashArray: 5,
    yaxis: {
      lines: {
        show: true,
      },
    },
    xaxis: {
      lines: {
        show: false,
      },
    },
  },
  fill: {
    type: "gradient",
    gradient: {
      type: "vertical",
      shadeIntensity: 1,
      opacityFrom: 0.7,
      opacityTo: 0.9,
      colorStops: [
        [
          {
            offset: 0,
            color: "#4318FF",
            opacity: 1,
          },
          {
            offset: 100,
            color: "rgba(67, 24, 255, 1)",
            opacity: 0.28,
          },
        ],
      ],
    },
  },
  dataLabels: {
    enabled: false,
  },
  plotOptions: {
    bar: {
      borderRadius: 10,
      columnWidth: "40px",
    },
  },
};

export const pieChartOptions = (name) => ({
  labels: name,
  colors: ["#4318FF", "#6AD2FF", "#FFED8A", "#EAE4D3"],
  chart: {
    width: "50px",
    stacked: true,
    toolbar: {
      show: true,
    },
  },
  states: {
    hover: {
      filter: {
        type: "none",
      },
    },
  },
  legend: {
    show: false,
  },
  dataLabels: {
    enabled: false,
  },
  hover: { mode: null },
  plotOptions: {
    donut: {
      expandOnClick: false,
      labels: {
        show: false,
      },
    },
  },
  fill: {
    colors: ["#4318FF", "#6AD2FF", "#FFED8A", "#EAE4D3"],
  },
  tooltip: {
    enabled: true,
    theme: "dark",
    style: {
      fontSize: "12px",
      fontFamily: undefined,
      backgroundColor: "#000000",
    },
  },
});


export const pieChartData = (percent) => percent;
export const barChartDataWeeklyRevenue = (emoList, commentList, rateList) => [
  {
    name: "Cảm xúc",
    data: emoList,
    color: "#6AD2Fa",
  },
  {
    name: "Bình luận",
    data: commentList,
    color: "#4318FF",
  },
  {
    name: "Đánh giá",
    data: rateList,
    color: "#FFED8A",
  },
];

export const barChartOptionsWeeklyRevenue = {
  chart: {
    stacked: true,
    // toolbar: {
    //   show: false,
    // },
  },
  // colors:['#ff3322','#faf']
  tooltip: {
    style: {
      fontSize: "12px",
      fontFamily: undefined,
      backgroundColor: "#000000"
    },
    theme: 'dark',
    onDatasetHover: {
      style: {
        fontSize: "12px",
        fontFamily: undefined,
      },
    },
  },
  xaxis: {
    categories: getDays(),
    show: false,
    labels: {
      show: true,
      style: {
        colors: "#314155",
        fontSize: "14px",
        fontWeight: "500",
      },
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    show: false,
    color: "black",
    labels: {
      show: false,
      style: {
        colors: "#A3AED0",
        fontSize: "14px",
        fontWeight: "500",
      },
    },
  },

  grid: {
    borderColor: "rgba(163, 174, 208, 0.3)",
    show: true,
    yaxis: {
      lines: {
        show: false,
        opacity: 0.5,
      },
    },
    row: {
      opacity: 0.5,
    },
    xaxis: {
      lines: {
        show: false,
      },
    },
  },
  fill: {
    type: "solid",
    colors: ["#5E37FF", "#6AD2FF", "#E1E9F8"],
  },
  legend: {
    show: false,
  },
  colors: ["#5E37FF", "#6AD2FF", "#E1E9F8"],
  dataLabels: {
    enabled: false,
  },
  plotOptions: {
    bar: {
      borderRadius: 10,
      columnWidth: "20px",
    },
  },
};

export const lineChartDataTotalSpent = (readList, emoList) => [
  {
    name: "lượt đọc",
    data: readList,
    color: "#4318FF",
  },
  {
    name: "đề cử",
    data: emoList,
    color: "#6AD2FF",
  },
];
export const lineChartOptionsTotalSpent = {
  legend: {
    show: false,
  },

  theme: {
    mode: "light",
  },
  chart: {
    type: "line",

    // toolbar: {
    //   show: false,
    // },
  },

  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "smooth",
  },

  tooltip: {
    style: {
      fontSize: "12px",
      fontFamily: undefined,
      backgroundColor: "#000000"
    },
    theme: 'dark',
    x: {
      format: "dd/MM/yy HH:mm",
    },
  },
  grid: {
    show: false,
  },
  xaxis: {
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
    labels: {
      style: {
        colors: "#314155",
        fontSize: "14px",
        fontWeight: "500",
      },
    },
    type: "text",
    range: undefined,
    categories: days,
  },

  yaxis: {
    show: false,
  },
};
