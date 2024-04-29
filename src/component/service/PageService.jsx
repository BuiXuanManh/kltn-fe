import api from "../api/api";
import AuthService from "./AuthService";

export default class PageService {
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
    findRatePageByProfileIdAndPageId(token, pageId) {
        return api.get(`/api/pages/ratePage/${pageId}`, AuthService(token));
    }
    addRatePage(token, pageId, rate) {
        return api.post(`/api/pages/ratePage/${pageId}`, { point: rate }, AuthService(token));
    }
    getPagesByBookId(bookId) {
        return api.get(`/api/pages/book/${bookId}`);
    }
}