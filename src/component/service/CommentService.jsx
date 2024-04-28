import api from "../api/api";

export default class CommentService{
    getCommentByPageId(pageId){
        return api.get(`/api/comments/page/${pageId}`);
    }
}