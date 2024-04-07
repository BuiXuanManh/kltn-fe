import axios from 'axios';
export default axios.create({
    baseURL: 'http://localhost:8080',
    // headers: { "ngrok-skip-browser-warning": "true" }
    headers: {
        'Content-Type': 'application/json', // Kiểu dữ liệu gửi đi là JSON
        // Các headers khác (nếu cần)
    },
});