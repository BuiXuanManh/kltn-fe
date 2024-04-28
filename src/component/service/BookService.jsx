import api from "../api/api";
import AuthService from "./AuthService";

export default class BookService {
    getBooks(page, size) {
        return api.get(`/api/books/getAll?page=${page}&size=${size}`);
    }
    getBookById(id) {
        return api.get(`/api/books/${id}`);
    }
    getBookByGenres(genres, page, size) {
        return api.post(`/api/books/genres?page=${page}&size=${size}`, genres);
    }
    updateBookInteraction(token, bookId, pageId, page) {
        return api.post(`/api/books/interactions/read/${bookId}/${pageId}/${page}`, {}, AuthService(token));
    }
    getInteractions(token) {
        return api.get(`/api/books/interactions`, AuthService(token));
    }
}