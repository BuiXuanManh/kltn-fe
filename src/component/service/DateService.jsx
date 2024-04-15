import { differenceInMinutes, differenceInHours, differenceInDays, differenceInMonths, differenceInYears } from 'date-fns';
export default function formatTimeDifference(timestamp) {
    const currentDate = new Date().toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" })
    const parsedTimestamp = new Date(timestamp).toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" });
    const minutesDifference = differenceInMinutes(currentDate, parsedTimestamp);

    if (minutesDifference < 1) {
        return `${Math.floor(minutesDifference)} giây trước`;
    }

    const hoursDifference = differenceInHours(currentDate, parsedTimestamp);

    if (hoursDifference < 1) {
        return `${Math.floor(minutesDifference)} phút trước`;
    }

    const daysDifference = differenceInDays(currentDate, parsedTimestamp);

    if (daysDifference < 1) {
        return `${Math.floor(hoursDifference)} giờ trước`;
    }

    const monthsDifference = differenceInMonths(currentDate, parsedTimestamp);

    if (monthsDifference < 1) {
        return `${Math.floor(daysDifference)} ngày trước`;
    }

    const yearsDifference = differenceInYears(currentDate, parsedTimestamp);
    if (yearsDifference < 1)
        return `${Math.floor(monthsDifference)} tháng trước`;
    return `${Math.floor(yearsDifference)} năm trước`;
}