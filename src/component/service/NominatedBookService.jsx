import api from "../api/api";

export default class NominatedBookService {
    getNominatedBook() {
        return api.get("/api/nominatedBook/save");
    }
}