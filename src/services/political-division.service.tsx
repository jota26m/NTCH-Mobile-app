import HttpRequest from "../adapter/http/http.adapter";

export default class PoliticalDivisionService {

    static path = '/common/regions';

    static getRegions() {
        return HttpRequest.get(PoliticalDivisionService.path);
    }

    static getCommunes() {
        return HttpRequest.get(PoliticalDivisionService.path + '/communes');
    }

    static getCommunesByRegion(regionId: number) {
        return HttpRequest.get(PoliticalDivisionService.path + '/' + regionId + '/communes');
    }
}