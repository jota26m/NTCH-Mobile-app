import HttpRequest from "../adapter/http/http.adapter";

export default class ParamsService {

    static path = '/params';

    static getActivityTypes() {
        return HttpRequest.get(ParamsService.path + '/activities/types');
    }

    static getActivitySubtypes() {
        return HttpRequest.get(ParamsService.path + '/activities/types/subtypes');
    }

    static getZoneTypes() {
        return HttpRequest.get(ParamsService.path + '/zones/types');
    }

    static getLandUses() {
        return HttpRequest.get(ParamsService.path + '/zones/types/landuses');
    }
}