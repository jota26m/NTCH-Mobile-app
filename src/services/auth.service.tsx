import HttpRequest from "../adapter/http/http.adapter";

export default class AuthService {

    static path = '/auth';

    static login(username: string, password: string) {
        return HttpRequest.post(AuthService.path + '/app/login', {username: username, password: password}, false);
    }

    static register(firstName: string, lastName: string, email: string, password: string, confirmPassword: string) {
        return HttpRequest.post(AuthService.path + '/account/create', {firstName, lastName, email, password, confirmPassword}, false);
    }

    static recovery(username: string) {
        return HttpRequest.post(AuthService.path + '/recovery', {username}, false);
    }
}