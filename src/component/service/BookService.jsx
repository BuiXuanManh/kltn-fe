import api from "../api/api";
import AuthService from "./AuthService";

export default class BookService {
    saveBook(token, book, author) {
        return api.post(`/api/books/save?author=${author}`, book, AuthService(token));
    }
    findByTitle(title) {
        return api.get(`/api/books/title/${title}`);
    }
    getBooks(page, size, field) {
        return api.get(`/api/books/getAll?field=${String(field)}&page=${page}&size=${size}`);
    }
    getNewBooks(page, size) {
        return api.get(`/api/books/get/new?page=${page}&size=${size}`);
    }
    getBookById(id) {
        return api.get(`/api/books/${id}`);
    }
    getBookByGenres(genres, dto, page, size) {
        return api.post(`/api/books/genres?page=${page}&size=${size}`, { genres: genres, dto: dto });
    }
    updateBookInteraction(token, bookId, pageId, page) {
        return api.post(`/api/books/interactions/read/${bookId}/${pageId}/${page}`, {}, AuthService(token));
    }
    getInteractions(token) {
        return api.get(`/api/books/interactions`, AuthService(token));
    }
    findRateBookByProfileIdAndBookId(token, bookId) {
        return api.get(`/api/books/rateBook/${bookId}`, AuthService(token));
    }
    findRateBookById(bookId) {
        return api.get(`/api/books/rateBook/getAll/${bookId}`);
    }
    findInteraction(token, bookId) {
        return api.get(`/api/books/interaction/${bookId}`, AuthService(token));
    }
    findBook(keyword, page, size) {
        return api.get(`/api/books/find/keyword?keyword=${keyword}&page=${page}&size=${size}`);
    }
    follow(token, bookId) {
        return api.post(`/api/books/follow/${bookId}`, {}, AuthService(token));
    }
    followCancel(token, bookId) {
        return api.post(`/api/books/follow/cancel/${bookId}`, {}, AuthService(token));
    }
    nominate(token, bookId) {
        return api.post(`/api/books/nominate/${bookId}`, {}, AuthService(token));
    }
    nominateCancel(token, bookId) {
        return api.post(`/api/books/nominate/cancel/${bookId}`, {}, AuthService(token));
    }
}