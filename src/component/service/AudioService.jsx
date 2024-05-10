import api from "../api/api";
const key = import.meta.env.VITE_TTS_KEY;
const endPoint = `https://us-central1-texttospeech.googleapis.com/v1beta1/text:synthesize?key=${key}`;
export default class AudioService {
    getAudio(payload) {
        return api.post(endPoint, payload);
    }
}