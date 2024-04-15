import api from "../api/api";
import AuthService from "./AuthService";

export default class BookService {
    getBooks(page, size) {
        return api.get(`/api/books/getAll?page=${page}&size=${size}`);
    }
}