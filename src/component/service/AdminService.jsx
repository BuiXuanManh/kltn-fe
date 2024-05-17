import api from "../api/api";
import AuthService from "./AuthService";

export default class AdminService {
    getUsers(token) {
        return api.get('/admin/users', AuthService(token));
    }
    saveUser(token, users) {
        return api.post('/admin/users/save', users, AuthService(token));
    }
    avtiveUser(token, id) {
        return api.post(`/admin/users/change/${id}?type=active`, {}, AuthService(token));
    }
    inAvtiveUser(token, id) {
        return api.post(`/admin/users/change/${id}?type=inActive`, {}, AuthService(token));
    }
}