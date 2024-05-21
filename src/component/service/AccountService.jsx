import api from "../api/api";
import AuthService from "./AuthService";

export default class AccountService {
    validAdmin(token) {
        return api.get('/auth/valid', AuthService(token));
    }
    login(acc) {
        return api.post('/auth/signin', acc);
    }
    register(acc) {
        return api.post('/auth/signup', acc);
    }
    getProfile(token) {
        return api.get("/users/profile", AuthService(token));
    }

}