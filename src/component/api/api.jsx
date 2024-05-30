import axios from 'axios';

class AxiosSingleton {
    static instance = null;

    constructor() {
        if (AxiosSingleton.instance) {
            return AxiosSingleton.instance; // Trả về instance hiện có nếu đã tồn tại
        }

        this.api = axios.create({
            // baseURL: 'http://ec2-13-212-191-226.ap-southeast-1.compute.amazonaws.com:8080',
            baseURL: 'http://ec2-52-221-196-43.ap-southeast-1.compute.amazonaws.com:8080',
            headers: {
                'Content-Type': 'application/json',
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