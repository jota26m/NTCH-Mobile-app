import Storage from "../services/storage.service";

export default class DataKeeper {
    static key = 'regis_321312';
    static subscribers: Array<{type: String, fn: Function}> = [];
    static data: any = {
        clients: [],
        images: {},
        audios: {}
    };

    static getData() {
        return DataKeeper.data;
    }

    static addData(type: string, key: string, data: any) {
        if (DataKeeper.data[type] == undefined) {
            DataKeeper.data[type] = {};
        }
        DataKeeper.data[type][key] = data;
        DataKeeper.persist();
        return DataKeeper.data[type][key];
    }

    static removeData(type: string, key: string) {
        if (DataKeeper.data[type] == undefined) {
            DataKeeper.data[type] = {};
        }
        delete DataKeeper.data[type][key];
        DataKeeper.persist();
    }

    static getDataByType(type: string) {
        if (DataKeeper.data[type] == undefined) {
            DataKeeper.data[type] = {};
        }
        return DataKeeper.data[type];
    }

    static persist() {
        Storage.storeData(DataKeeper.key, DataKeeper.data);
    }


    static clearAll() {
        DataKeeper.data = [];
        Storage.removeItem(DataKeeper.key).then(response => {
            this.subscribers.forEach(subscriber => {
                subscriber.fn(null);
            });
        });
    }

    static subscribe(type: string, fn: Function) {
        DataKeeper.subscribers.push({type, fn});
    }

    static loadData() {
        Storage.getItem(DataKeeper.key)?.then(data => {
            if (data != undefined) {
                DataKeeper.data = JSON.parse(data);
            } else {
                DataKeeper.data = {projects: {}, images: {}, audios: {}};
            }
            DataKeeper.subscribers.forEach(subscriber => {
                subscriber.fn(DataKeeper.data);
            });
        });
    }
    
}