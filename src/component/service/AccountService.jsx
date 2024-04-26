import api from "../api/api";
import AuthService from "./AuthService";

export default class AccountService {
    login(acc) {
        return api.post('/auth/signin', acc);
    }
    register(acc) {
        return api.post('/auth/signup', acc);
    }
    getProfile(token) {
        return api.get("/users/profile", AuthService(token));
    }
    updateBookInteraction(token, bookId, page) {
        return api.post(`users/interaction/read/${bookId}/${page}`, {}, AuthService(token));
    }
}