import DataKeeper from "../keepers/data.keeper";

export default class LocalDataService {

    static hashData: any = {};

    static getRegions() {
        if(DataKeeper.getDataByType('working') != undefined) {
            return DataKeeper.getDataByType('working').regions;
        }
        return [];
    }

    static getCommunes() {
        if(DataKeeper.getDataByType('working') != undefined) {
            return DataKeeper.getDataByType('working').communes;
        }
        return [];
    }

    static getCommunesByRegion(regionId: number) {
        if (LocalDataService.hashData['communes'] != undefined) {
            return LocalDataService.hashData['communes'][regionId];
        }
        if(DataKeeper.getDataByType('working') != undefined) {
            LocalDataService.hashData['communes'] = {};
            DataKeeper.getDataByType('working').communes.map((commune: any) => {
                if (LocalDataService.hashData['communes'][commune.region.id] == undefined) {
                    LocalDataService.hashData['communes'][commune.region.id] = Array();
                }
                LocalDataService.hashData['communes'][commune.region.id].push(commune);
            });
            return LocalDataService.hashData['communes'][regionId];
        }
        return [];
    }

    static getZoneTypes() {
        if(DataKeeper.getDataByType('working') != undefined) {
            return DataKeeper.getDataByType('working')['zone-types'];
        }
        return [];
    }

    static getLandUses(zoneTypeId: number) {

        if (LocalDataService.hashData['land-uses'] != undefined) {
            return LocalDataService.hashData['land-uses'][zoneTypeId];
        }
        if(DataKeeper.getDataByType('working') != undefined) {
            LocalDataService.hashData['land-uses'] = {};
            DataKeeper.getDataByType('working')['land-uses'].map((landUse: any) => {
                if (LocalDataService.hashData['land-uses'][landUse.zoneType.id] == undefined) {
                    LocalDataService.hashData['land-uses'][landUse.zoneType.id] = Array();
                }
                LocalDataService.hashData['land-uses'][landUse.zoneType.id].push(landUse);
            });
            return LocalDataService.hashData['land-uses'][zoneTypeId];
        }
        return [];
    }

    static getClients() {
        if(DataKeeper.getDataByType('working') != undefined) {
            return DataKeeper.getDataByType('working')['clients'];
        }
        return [];

    }

    static getSonometersByClient(clientId: number) {
        if(DataKeeper.getDataByType('working') != undefined &&  DataKeeper.getDataByType('working')['sonometers_' + clientId] != undefined) {
            return DataKeeper.getDataByType('working')['sonometers_' + clientId];
        }
        return [];
    }

    static getCalibratorsByClient(clientId: number) {
        if(DataKeeper.getDataByType('working') != undefined &&  DataKeeper.getDataByType('working')['calibrators_' + clientId] != undefined) {
            return DataKeeper.getDataByType('working')['calibrators_' + clientId];
        }
        return [];
    } 
}