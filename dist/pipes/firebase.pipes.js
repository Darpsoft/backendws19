"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirebasePushPhone = exports.FirebaseArrayPush = exports.FirebasePushTheme = exports.FirebaseUnsuscribe = exports.FirebaseSuscribe = exports.NameThene = void 0;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
var serviceAccount = require("../firebase/mydollarrates-firebase.json");
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.cert(serviceAccount),
    databaseURL: "https://mydollarrates.firebaseio.com"
});
class NameThene {
    getNameThemeEuro(e) {
        let n = '';
        switch (e) {
            case 1:
                n = 'EDT';
                break;
            case 2:
                n = 'ELB';
                break;
            case 3:
                n = 'EYD';
                break;
            case 4:
                n = 'EAT';
                break;
            case 5:
                n = 'EBC';
                break;
            case 6:
                n = 'EMC';
                break;
            case 7:
                n = 'EBCV';
                break;
            case 8:
                n = 'EPRO';
                break;
        }
        return n;
    }
    getNameThemeDolar(e) {
        let n = '';
        switch (e) {
            case 1:
                n = 'DDT';
                break;
            case 2:
                n = 'DLB';
                break;
            case 3:
                n = 'DYD';
                break;
            case 4:
                n = 'DAT';
                break;
            case 5:
                n = 'DBC';
                break;
            case 6:
                n = 'DMC';
                break;
            case 7:
                n = 'DMK';
                break;
            case 8:
                n = 'DBCV';
                break;
            case 9:
                n = 'DPRO';
                break;
        }
        return n;
    }
}
exports.NameThene = NameThene;
class FirebaseSuscribe extends NameThene {
    constructor(t, e, uid) {
        super();
        this.t = t;
        this.e = e;
        this.uid = uid;
        this.nameTheme = '';
        this.nameTheme = this.t === 1 ? this.getNameThemeDolar(this.e) : this.getNameThemeEuro(this.e);
    }
    suscribeFirebase(nameTheme) {
        return __awaiter(this, void 0, void 0, function* () {
            const registrationTokens = [this.uid];
            return firebase_admin_1.default.messaging().subscribeToTopic(registrationTokens, nameTheme)
                .then(function (response) {
                // console.log('Successfully subscribed to topic:', response);
                return true;
            })
                .catch(function (error) {
                console.log('Error subscribing to topic:', error);
                return false;
            });
        });
    }
    suscribeAll() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.suscribeFirebase(this.nameTheme);
        });
    }
}
exports.FirebaseSuscribe = FirebaseSuscribe;
class FirebaseUnsuscribe extends NameThene {
    constructor(t, e, uid) {
        super();
        this.t = t;
        this.e = e;
        this.uid = uid;
        this.nameTheme = '';
        this.nameTheme = this.t === 1 ? this.getNameThemeDolar(this.e) : this.getNameThemeEuro(this.e);
    }
    unsuscribeFirebase(nameTheme) {
        return __awaiter(this, void 0, void 0, function* () {
            const registrationTokens = [this.uid];
            return firebase_admin_1.default.messaging().unsubscribeFromTopic(registrationTokens, nameTheme)
                .then(function (response) {
                // console.log('Successfully unsubscribed to topic:', response);
                return true;
            })
                .catch(function (error) {
                console.log('Error unsubscribing to topic:', error);
                return false;
            });
        });
    }
    unsuscribeAll() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.unsuscribeFirebase(this.nameTheme);
        });
    }
}
exports.FirebaseUnsuscribe = FirebaseUnsuscribe;
class FirebasePushTheme extends NameThene {
    constructor(title, text, t, e, h) {
        super();
        this.title = title;
        this.text = text;
        this.t = t;
        this.e = e;
        this.h = h;
        this.nameTheme = '';
        this.nameTheme = this.t === 1 ? this.getNameThemeDolar(this.e) : this.getNameThemeEuro(this.e);
    }
    sendPushTheme() {
        return __awaiter(this, void 0, void 0, function* () {
            const topic = this.nameTheme, message = {
                notification: {
                    title: this.title,
                    body: this.text
                },
                topic: topic
            };
            return firebase_admin_1.default.messaging().send(message)
                .then((response) => {
                // console.log('Successfully sent message:', response);
                return true;
            })
                .catch((error) => {
                console.log('Error sending message:', error);
                return false;
            });
        });
    }
}
exports.FirebasePushTheme = FirebasePushTheme;
class FirebaseArrayPush {
    constructor(arrayPush, titulo) {
        this.arrayPush = arrayPush;
        this.titulo = titulo;
    }
    sendPushNotification() {
        return __awaiter(this, void 0, void 0, function* () {
            this.arrayPush.forEach(e => {
                const message = {
                    notification: {
                        title: this.titulo,
                        body: e.mensajeMoneda
                    },
                    topic: e.nombreTopic
                };
                firebase_admin_1.default.messaging().send(message)
                    .then((response) => {
                    console.log('[' + e.nombreTopic + '] Successfully sent message:', response);
                    return true;
                })
                    .catch((error) => {
                    console.log('Error sending message:', error);
                    return false;
                });
            });
        });
    }
}
exports.FirebaseArrayPush = FirebaseArrayPush;
class FirebasePushPhone {
    constructor() { }
    sendPushNotification() {
        return __awaiter(this, void 0, void 0, function* () {
            /*
            const message = {
                notification: {
                    title: 'MyDollar Rates',
                    body: 'El precio del dolar está disminuyendo, tomen sus previsiones.'
                },
                topic: 'JOJOTO',
                data: {
                    type: '1',
                    url: 'https://www.google.com/'
                }
            }
            admin.messaging().send(message)
            .then((response: any) => {
                console.log('Successfully sent message:', response)
                return true
            })
            .catch((error: any) => {
                console.log('Error sending message:', error)
                return false
            })
            */
            firebase_admin_1.default.messaging().sendToDevice(['cOnK1TvbGlE:APA91bE9Ln7iDibsCXE08y4mxsrOrVi99907U8SjEqXsJVBvSYHZUXaSnaxBY2RIz-e-i4kvta2Xc1ERBhNormjjPtTaaAsJAbU-yeqdPC8wXuXCYkhiN0MT45ZyOu_DsbQvu3LGXIlf'], {
                data: {
                    type: '1',
                    url: 'https://www.google.com/'
                },
                notification: {
                    title: 'MyDollar Rates',
                    body: 'El precio del dolar está disminuyendo, tomen sus previsiones.'
                }
            }, {
                // Required for background/quit data-only messages on Android
                priority: 'high',
            }).then((response) => {
                console.log('Successfully sent message:', response);
                return true;
            })
                .catch((error) => {
                console.log('Error sending message:', error);
                return false;
            });
        });
    }
}
exports.FirebasePushPhone = FirebasePushPhone;
