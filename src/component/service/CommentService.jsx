import api from "../api/api";
import AuthService from "./AuthService";

export default class CommentService {
    getCommentByPageId(pageId) {
        return api.get(`/api/comments/page/${pageId}`);
    }
    addComment(token, pageId, content) {
        return api.post(`/api/comments/${pageId}?rate=comment`, content, AuthService(token));
    }
    // addRate(token, pageId, content) {
    //     return api.post(`/api/comments/${pageId}?rate=rate`, content, AuthService(token));
    // }
    getComment(token, pageId) {
        return api.get(`/api/comments/page/get/${pageId}?type=rate`, AuthService(token));
    }
    getCommentByBookId(bookId, type) {
        return api.get(`/api/comments/book/${bookId}?type=${type}`);
    }
    addRateBook(token, bookId, rate) {
        return api.post(`/api/comments/rateBook/${bookId}`, rate, AuthService(token));
    }
}