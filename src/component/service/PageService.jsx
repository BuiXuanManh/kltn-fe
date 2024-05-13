import api from "../api/api";
import AuthService from "./AuthService";

export default class PageService {
    postInteraction(pageId) {
        return api.post(`/api/pages/interactions/create/${pageId}`);
    }
    getPageByBookIdAndPageNo(bookId, pageNo) {
        return api.get(`/api/pages/${bookId}/${pageNo}`);
    }
    getInteractionPage(token, pageId) {
        return api.get(`/api/pages/interactions/${pageId}`, AuthService(token));
    }
    addEmotion(token, pageId, type) {
        return api.post(`/api/pages/emotion/${pageId}?type=${type}`, {}, AuthService(token));
    }
    mark(token, pageId, type) {
        return api.post(`/api/pages/flag/${pageId}?type=${type}`, {}, AuthService(token));
    }
    getPagesByBookId(bookId) {
        return api.get(`/api/pages/book/${bookId}`);
    }
    addRatePage(token, pageId, rate) {
        return api.post(`/api/pages/ratePage/${pageId}`, rate, AuthService(token));
    }
    getRatePage(token, pageId) {
        return api.get(`/api/pages/ratePage/${pageId}`, AuthService(token));
    }
    savePages(token, pages, bookId) {
        return api.post(`/api/pages/save/${bookId}`, pages, AuthService(token));
    }
}