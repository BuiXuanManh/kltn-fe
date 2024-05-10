import api from "../api/api";

export default class ComputedService {
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
    nonimate(date) {
        return api.get(`/api/computed/nominate?date=${date}`);
    }
    read(date) {
        return api.get(`/api/computed/read?date=${date}`);
    }
}