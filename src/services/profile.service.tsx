import HttpRequest from "../adapter/http/http.adapter";
import ProjectsKeeper from "../keepers/projects.keeper";

export default class ProfileService {

    static path = '/profile';

    static getClients() {
        return HttpRequest.get(ProfileService.path + '/clients');
    }
}