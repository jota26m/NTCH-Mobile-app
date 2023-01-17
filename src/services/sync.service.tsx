import HttpRequest from "../adapter/http/http.adapter";
import DataKeeper from "../keepers/data.keeper";
import ProjectsKeeper from "../keepers/projects.keeper";
import SessionKeeper from "../keepers/session.keeper";
import ClientService from "./client.service";
import ParamsService from "./params.service";
import PoliticalDivisionService from "./political-division.service";
import ProfileService from "./profile.service";

export default class SyncService {

    static getWorkingBaseData() {
        PoliticalDivisionService.getRegions().then(
            response => {
                DataKeeper.addData('working', 'regions', response.data.data);
            }
        );

        PoliticalDivisionService.getCommunes().then(
            response => {
                DataKeeper.addData('working', 'communes', response.data.data);
            }
        );

        ParamsService.getActivityTypes().then(
            response => {
                DataKeeper.addData('working', 'activity-types', response.data.data);
            }
        );

        ParamsService.getActivitySubtypes().then(
            response => {
                DataKeeper.addData('working', 'activity-subtypes', response.data.data);
            }
        );

        ParamsService.getZoneTypes().then(
            response => {
                DataKeeper.addData('working', 'zone-types', response.data.data);
            }
        );

        ParamsService.getLandUses().then(
            response => {
                DataKeeper.addData('working', 'land-uses', response.data.data);
            }
        );

    }

    static getAccountData = () => {
        ProfileService.getClients().then(response => {
            DataKeeper.addData('working', 'clients', response.data.data);
            response.data.data.forEach((client: any) => {
                ClientService.getProjects(client.id).then(
                    response => {
                        console.log(response.data.data);
                    }
                );
                ClientService.getCalibrators(client.id).then(
                    response => {
                        DataKeeper.addData('working', 'calibrators_' + client.id, response.data.data);
                    }
                );
                ClientService.getSonometers(client.id).then(
                    response => {
                        DataKeeper.addData('working', 'sonometers_' + client.id, response.data.data);
                    }
                );
            });
        });
        
    }

    static getHeaders = (client: number, projects: any) => {
        let data = {
            client,
            projects
        };
        return HttpRequest.post('/sync/headers', data);
    }

    static syncWithServer = (client: number, projects: any, data: any, images: any, audios: any) => {
        let syncData = {
            client,
            projects,
            data,
            images,
            audios
        };
        return HttpRequest.post('/sync', syncData);
    }
}