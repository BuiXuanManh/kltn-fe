import api from "../api/api";

export default class GenreService {
    getGenres(page, size) {
        return api.get(`/api/genres?page=${page}&size=${size}`);
    }
}