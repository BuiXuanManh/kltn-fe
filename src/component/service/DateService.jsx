import { differenceInMinutes, differenceInHours, differenceInDays, differenceInMonths, differenceInYears } from 'date-fns';
export default function formatTimeDifference(timestamp) {
    const currentDate = new Date().toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" })
    const parsedTimestamp = new Date(timestamp).toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" });
    const minutesDifference = differenceInMinutes(currentDate, parsedTimestamp);

    if (minutesDifference < 1) {
        return `vài giây trước`;
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
export function formatDate(d) {
    const date = new Date(d);

    // Adjust the time zone offset to Asia/Ho_Chi_Minh
    const timeZoneOffset = 7 * 60; // 7 hours ahead in minutes
    const localTime = date.getTime() + (timeZoneOffset * 60 * 1000);
    const adjustedDate = new Date(localTime);

    const day = String(adjustedDate.getUTCDate()).padStart(2, '0');
    const month = String(adjustedDate.getUTCMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = adjustedDate.getUTCFullYear();
    const hours = String(adjustedDate.getUTCHours()).padStart(2, '0');
    const minutes = String(adjustedDate.getUTCMinutes()).padStart(2, '0');
    const seconds = String(adjustedDate.getUTCSeconds()).padStart(2, '0');

    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
}