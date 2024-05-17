import api from "../api/api";

export default class ComputedService {
    getGenres() {
        return api.get(`/api/computed/books/genres`);
    }
    getUser() {
        return api.get(`/api/computed/books/user/date`);
    }
    getComment() {
        return api.get(`/api/computed/books/comment/date`);
    }
    getRate() {
        return api.get(`/api/computed/books/rate/date`);
    }
    getRead() {
        return api.get(`/api/computed/books/read/date`);
    }
    getEmo() {
        return api.get(`/api/computed/books/emo/date`);
    }
    getNominate() {
        return api.get(`/api/computed/books/nominate/date`);
    }
    getTotal() {
        return api.get(`/api/computed/books/total`);
    }
    getComputedBook(bookId) {
        return api.get(`/api/computed/books/${bookId}`);
    }
    addComputedBook(bookId) {
        return api.post(`/api/computed/books/${bookId}`);
    }
    addComputedInteractionBook(bookId) {
        return api.post(`/api/computed/books/interaction/${bookId}`);
    }
    addComputedCommentBook(bookId) {
        return api.post(`/api/computed/books/comment/${bookId}`);
    }
    addComputedRateBook(bookId) {
        return api.post(`/api/computed/books/rate/${bookId}`);
    }
    addComputedPageBook(bookId) {
        return api.post(`/api/computed/books/page/${bookId}`);
    }
    getComputedPage(pageId) {
        return api.get(`/api/computed/pages/${pageId}`);
    }
    addComputedPage(pageId) {
        return api.post(`/api/computed/pages/${pageId}`);
    }
    nonimate(date, page, size) {
        return api.get(`/api/computed/books/nominate?date=${date}&page=${page}&size=${size}`);
    }
    read(date, page, size) {
        return api.get(`/api/computed/books/read?date=${date}&page=${page}&size=${size}`);
    }
    find(type, page, size) {
        return api.get(`/api/computed/books/find?type=${type}&page=${page}&size=${size}`);
    }
    findByGenres(field, genres, keyword, page, size) {
        return api.post(`/api/computed/books/genres/find?page=${page}&size=${size}`, { field: field, genres: genres, keyword: keyword });
    }
}