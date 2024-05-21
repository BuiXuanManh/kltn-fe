import api from "../api/api";
import AuthService from "./AuthService";

export default class SettingService {
    getSetting(token) {
        return api.get(`/settings/user`, AuthService(token));
    }
    updateSetting(setting, token) {
        return api.post(`/settings/save`, setting, AuthService(token));
    }
}