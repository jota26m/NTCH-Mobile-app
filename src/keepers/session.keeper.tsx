import Storage from "../services/storage.service";
import SyncService from "../services/sync.service";

export default class SessionKeeper {
    static tokenKey = 'tkn_8219';
    static userKey = 'usr_8213';
    static termsKey = 'trms_8713';
    static languageKey = 'lng_4793';
    static user: any = undefined;
    static token: any = undefined;
    static subscribers: Array<Function> = [];

    static getToken() {
        return this.token;
    }

    static isLoggined() {
        return this.token != undefined;
    }

    static setToken(token: any) {
        if (token == null || token == undefined) return;
        this.token = token;
        Storage.storeData(SessionKeeper.tokenKey, token);
    }

    static getUser() {
        return this.user;
    }

    static setUser(user: any) {
        if (user == null || user == undefined) return;
        this.user = user;
        Storage.storeData(SessionKeeper.userKey, user);
        this.subscribers.forEach(subscriber => {
            console.log('noti', this.user)
            subscriber(user);
        });
    }

    static clearAll() {
        this.token = undefined;
        this.user = undefined;
        Storage.removeItem(SessionKeeper.userKey).then(response => {
            this.subscribers.forEach(subscriber => {
                subscriber(null);
            });
        });
        Storage.removeItem(SessionKeeper.tokenKey).then(() => {});
    }

    static subscribe(fn: Function) {
        SessionKeeper.subscribers.push(fn);
    }

    static loadSession() {
        Storage.getItem(SessionKeeper.userKey)?.then(user => {
            console.log('loading', user);
            if (user) {
                SessionKeeper.setUser(JSON.parse(user));
                Storage.getItem(SessionKeeper.tokenKey)?.then((token: any) => {
                    SessionKeeper.setToken(JSON.parse(token));
                    SyncService.getAccountData();
                });
            } else {
                this.subscribers.forEach(subscriber => {
                    subscriber(null);
                });
            }
            return user != undefined;
        });
    }
    
}