import axios from 'axios';

class AxiosSingleton {
    static instance = null;

    constructor() {
        if (AxiosSingleton.instance) {
            return AxiosSingleton.instance; // Trả về instance hiện có nếu đã tồn tại
        }

        this.api = axios.create({
            baseURL: 'http://localhost:8080',
            // baseURL: 'https://9aca-113-185-77-11.ngrok-free.app',
            // baseURL: 'https://ec2-13-215-218-209.ap-southeast-1.compute.amazonaws.com:8080',
            headers: {
                'Content-Type': 'application/json',
                "ngrok-skip-browser-warning": "anything"
            },
        });

        AxiosSingleton.instance = this; // Lưu trữ instance
        return this;
    }
    get(url, config) {
        return this.api.get(url, config);
    }

    post(url, data, config) {
        return this.api.post(url, data, config);
    }
}

const api = new AxiosSingleton();
export default api;