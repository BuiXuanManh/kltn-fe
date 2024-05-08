import api from "../api/api";

export default class GenreService {
    getGenres() {
        return api.get(`/api/genres`);
    }
}