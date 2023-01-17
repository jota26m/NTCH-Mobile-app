import axios from 'axios';
import { environment } from '../../environment/environment';
import SessionKeeper from '../../keepers/session.keeper';

export default class HttpRequest {

    static baseUrl = environment.SERVER + environment.API_VERSION;
    static apiPath = '';

    static get(url: string, version = true, params = {}) {
        if (SessionKeeper.getToken() != null) {
            axios.defaults.headers.get['Authorization'] = 'Bearer ' + SessionKeeper.getToken();
        }
        return HttpRequest.checkResponse(axios.get((version ? HttpRequest.baseUrl : environment.SERVER) + url, {params: params}));
    }
    
    static post(url: string, data: any, version = true) {
        if (SessionKeeper.getToken() != null) {
            axios.defaults.headers.post['Authorization'] = 'Bearer ' + SessionKeeper.getToken();
        }
        axios.defaults.headers.post['Content-Type'] = 'application/json';
        return HttpRequest.checkResponse(axios.post((version ? HttpRequest.baseUrl : environment.SERVER) + url, data));
    }
    
    static put(url: string, data: any, version = true) {
        if (SessionKeeper.getToken() != null) {
            axios.defaults.headers.put['Authorization'] = 'Bearer ' + SessionKeeper.getToken();
        }
        axios.defaults.headers.put['Content-Type'] = 'application/json';
        return HttpRequest.checkResponse(axios.put((version ? HttpRequest.baseUrl : environment.SERVER) + url, data));
    }
    
    static remove(url: string, version = true) {
        if (SessionKeeper.getToken() != null) {
            axios.defaults.headers.delete['Authorization'] = 'Bearer ' + SessionKeeper.getToken();
        }
        return HttpRequest.checkResponse(axios.delete((version ? HttpRequest.baseUrl : environment.SERVER) + url));
    }

    static async checkResponse(response: any) {
        try {
            await response;
            return response;
        }
        catch (error) {
            throw error;
        }
    }
}



