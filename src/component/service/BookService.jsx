import api from "../api/api";
import AuthService from "./AuthService";

export default class BookService{
    getBooks(){
        return api.get('/api/books');
    }
}