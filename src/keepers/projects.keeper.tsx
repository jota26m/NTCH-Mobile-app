import Storage from "../services/storage.service";
import DataKeeper from "./data.keeper";

export default class ProjectsKeeper {

    static clientId: any;

    static setWorkingClient(client: any) {
        ProjectsKeeper.clientId = client != undefined ? client.id : 0;
    }

    static getAllProjects() {
        let projects = DataKeeper.data['projects_' + ProjectsKeeper.clientId];
        return projects != undefined ? projects : {};
    }

    static addProject(project: any) {
        let key = new Date().getTime();
        project.id = key;
        project.general.id = key;
        if (DataKeeper.data['projects_' + ProjectsKeeper.clientId] == undefined) {
            DataKeeper.data['projects_' + ProjectsKeeper.clientId] = {};
        }
        DataKeeper.data['projects_' + ProjectsKeeper.clientId][key] = {
            general: project.general,
            receivers: [],
            sources: [],
            measurements: [] 
        };
        DataKeeper.persist();
        return DataKeeper.data['projects_' + ProjectsKeeper.clientId][key];
    }

    static saveProject(project: any, edited: boolean = true) {
        project.general.edited = edited;
        DataKeeper.data['projects_' + ProjectsKeeper.clientId][project.general.id] = project;
        DataKeeper.persist();
        return DataKeeper.data['projects_' + ProjectsKeeper.clientId][project.general.id];
    }

    static getProjects() {
        if (DataKeeper.data['projects_' + ProjectsKeeper.clientId] == undefined) {
            DataKeeper.data['projects_' + ProjectsKeeper.clientId] = {};
        }
        return DataKeeper.data['projects_' + ProjectsKeeper.clientId];
    }

    static getProject(id: string) {
        if (DataKeeper.data['projects_' + ProjectsKeeper.clientId] == undefined) {
            DataKeeper.data['projects_' + ProjectsKeeper.clientId] = {};
        }
        return DataKeeper.data['projects_' + ProjectsKeeper.clientId][id];
    }

    static subscribeToProjects(fn: Function) {
        DataKeeper.subscribers.push({type: 'projects', fn});
    }


    
}