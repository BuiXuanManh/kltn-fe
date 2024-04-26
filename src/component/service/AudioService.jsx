import api from "../api/api";
const key = "AIzaSyBMx0yhBWDDEloj9H0n1qeJq3lnBE0-CPQ"
const endPoint = `https://us-central1-texttospeech.googleapis.com/v1beta1/text:synthesize?key=${key}`;
export default class AudioService {
    getAudio(payload) {
        return api.post(endPoint, payload);
    }
}