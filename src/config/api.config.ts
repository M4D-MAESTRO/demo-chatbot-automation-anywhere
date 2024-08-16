import { MODE } from "./app.config";

let API_CONFIG;
let CURRENT_DATE;
if (MODE.CURRENT_MODE == 'PROD') {
  API_CONFIG = {
    baseURL: 'http://192.168.0.30:3002',
    socketURL: 'http://192.168.0.30:3002',
  }
  CURRENT_DATE = new Date();
} else {
  API_CONFIG = {
    baseURL: 'http://192.168.0.30:3002',
    socketURL: 'http://192.168.0.30:3002',
  };
  CURRENT_DATE = new Date('2023-02-01');
}

export function changeBaseURL(newUrl: string) {
  API_CONFIG.baseURL = newUrl;
  API_CONFIG.socketURL = newUrl;
}

export { API_CONFIG, CURRENT_DATE };