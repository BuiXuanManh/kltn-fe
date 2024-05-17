import { book } from 'ionicons/icons';
import moment from 'moment';
const date = Date.now()
const days = [];
const getDays = () => {
  for (let i = 0; i < 6; i++) {
    days.push(moment(date).subtract(i + 1, 'days').format('DD/MM')); // Tính toán và thêm ngày vào mảng
  }
  return days.reverse();
}
export const tableDataCheck = (nominatedBook) =>
  nominatedBook?.map((book, index) => ({
    stt: index + 1,
    name: book?.nominatedBook?.book?.title,
    nominate: book?.nominated,
    date: book?.nominatedBook?.updateAt
  }));

