import api from "../api/api";
import AuthService from "./AuthService";

export default class CommentService {
    getRatesRecent() {
        return api.get(`/api/comments/rate/recent?page=1&síze=12`);
    }
    getCommentByPageId(pageId) {
        return api.get(`/api/comments/page/${pageId}`);
    }
    addComment(token, pageId, content, id) {
        return api.post(`/api/comments/${pageId}?parent=${id}`, content, AuthService(token));
    }
    addCommentRate(token, bookId, content, id) {
        return api.post(`/api/comments/rate/${bookId}?parent=${id}`, content, AuthService(token));
    }
    addCommentByBookId(token, bookId, content, id) {
        return api.post(`/api/comments/book/${bookId}?parent=${id}`, content, AuthService(token));
    }
    getComment(token, pageId) {
        return api.get(`/api/comments/page/get/${pageId}?type=rate`, AuthService(token));
    }
    getCommentByBookId(bookId, type) {
        return api.get(`/api/comments/book/${bookId}?type=${type} `);
    }
    addRateBook(token, bookId, rate) {
        return api.post(`/api/comments/rateBook/${bookId}`, rate, AuthService(token));
    }
    handleLike(token, commentId) {
        return api.post(`/api/comments/like/${commentId}`, {}, AuthService(token));
    }
}