import HttpRequest from "../adapter/http/http.adapter";
import ProjectsKeeper from "../keepers/projects.keeper";

export default class ClientService {

    static path = '/clients';

    static getSonometers(clientId: number = 0) {
        return HttpRequest.get(ClientService.path + '/' + (clientId == 0 ? ProjectsKeeper.clientId : clientId) + '/sonometers');
    }

    static getCalibrators(clientId: number = 0) {
        return HttpRequest.get(ClientService.path + '/' + (clientId == 0 ? ProjectsKeeper.clientId : clientId) + '/calibrators');
    }

    static getProjects(clientId: number = 0) {
        return HttpRequest.get(ClientService.path + '/' + (clientId == 0 ? ProjectsKeeper.clientId : clientId) + '/projects');
    }

}