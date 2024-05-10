import api from "../api/api";
import AuthService from "./AuthService";

export default class BookService {
    saveBook(token, book, author) {
        return api.post(`/api/books/save?author=${author}`, book, AuthService(token));
    }
    findByTitle(title) {
        return api.get(`/api/books/title/${title}`);
    }
    getBooks(page, size) {
        return api.get(`/api/books/get/new?page=${page}&size=${size}`);
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
    findRateBookByProfileIdAndBookId(token, bookId) {
        return api.get(`/api/books/rateBook/${bookId}`, AuthService(token));
    }
    findRateBookById(bookId) {
        return api.get(`/api/books/rateBook/getAll/${bookId}`);
    }
    findInteraction(token, bookId) {
        return api.get(`/api/books/interaction/${bookId}`, AuthService(token));
    }
    findBook(keyword) {
        return api.get(`/api/books/find/${keyword}`);
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