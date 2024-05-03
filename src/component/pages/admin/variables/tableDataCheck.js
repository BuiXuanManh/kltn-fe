import moment from 'moment';
const date = Date.now()
const days = [];
const getDays = () => {
  for (let i = 0; i < 6; i++) {
    days.push(moment(date).subtract(i + 1, 'days').format('DD/MM')); // Tính toán và thêm ngày vào mảng
  }
  return days.reverse();
}
export const tableDataCheck =
  [
    {
      "stt": 1,
      "name": "Marketplace",
      "read": 200,
      "date": "12-12-2022",
      "emotion": 400
    },
    {
      "stt": 2,
      "name": "Marketplace",
      "read": 200,
      "date": "12-12-2022",
      "emotion": 400
    },
    {
      "stt": 3,
      "name": "Marketplace",
      "read": 200,
      "date": "12-12-2022",
      "emotion": 400
    },
    {
      "stt": 4,
      "name": "Marketplace",
      "read": 200,
      "date": "12-12-2022",
      "emotion": 400
    },
    {
      "stt": 5,
      "name": "Marketplace",
      "read": 200,
      "date": "12-12-2022",
      "emotion": 400
    },
  ]
