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
Object.defineProperty(exports, "__esModule", { value: true });
exports.pushPhone = exports.arrayPushFirebase = exports.firebasePushAll = exports.firebasePushFunction = exports.firebasePush = exports.firebaseUpdate = void 0;
const database_1 = require("../database");
const firebase_pipes_1 = require("../pipes/firebase.pipes");
// Functions
const functions_1 = require("../functions");
// CRON FUNCTIÓN
const index_1 = require("../cron/index");
function firebaseUpdate(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const getRequest = req.body;
        const eFirebase = getRequest.data;
        const conn = yield database_1.connect();
        const firebase = yield conn.query('SELECT id_fir, uid_fir, typ_fir, ele_fir FROM firebase WHERE dev_fir = ?', [eFirebase.dev_fir]);
        if (firebase[0].length >= 1) {
            const nFirebase = firebase[0];
            /*
            const FrUnsuscribe = new FirebaseUnsuscribe(nFirebase[0].typ_fir, nFirebase[0].ele_fir, nFirebase[0].uid_fir);
            await FrUnsuscribe.unsuscribeAll();
    
            const FrSuscribe = new FirebaseSuscribe(eFirebase.typ_fir, eFirebase.ele_fir, eFirebase.uid_fir);
            await FrSuscribe.suscribeAll();
            */
            yield conn.query('UPDATE firebase SET ? WHERE id_fir = ?', [eFirebase, nFirebase[0].id_fir]);
        }
        else {
            /*
            const FrSuscribe = new FirebaseSuscribe(eFirebase.typ_fir, eFirebase.ele_fir, eFirebase.uid_fir);
            await FrSuscribe.suscribeAll();
            */
            yield conn.query('INSERT INTO firebase SET ?', [eFirebase]);
        }
        return res.json({ 'code': 0 });
    });
}
exports.firebaseUpdate = firebaseUpdate;
function firebasePush(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        yield firebasePushFunction(req.body);
        return res.json({ 'code': 0 });
    });
}
exports.firebasePush = firebasePush;
function firebasePushFunction(eFirebase) {
    return __awaiter(this, void 0, void 0, function* () {
        const conn = yield database_1.connect();
        const firebase = yield conn.query('SELECT id_pus FROM firebase_push WHERE fec_pus = ? AND hor_pus = ? AND typ_pus = ? AND ele_pus = ?', [functions_1.getFecha(), eFirebase.h, eFirebase.t, eFirebase.e]);
        if (firebase[0].length === 0) {
            const FrPushTheme = new firebase_pipes_1.FirebasePushTheme(eFirebase.title, eFirebase.text, eFirebase.t, eFirebase.e, eFirebase.h);
            yield FrPushTheme.sendPushTheme();
            yield conn.query('INSERT INTO firebase_push(typ_pus, ele_pus, hor_pus) VALUES(?, ?, ?)', [eFirebase.t, eFirebase.e, eFirebase.h]);
            console.log('SE REGISTRÓ CON ÉXITO ' + eFirebase.t, eFirebase.e, eFirebase.h);
        }
        else {
            console.log('YA SE HIZO UN PUSH EN ESTE HORARIO' + eFirebase.t, eFirebase.e, eFirebase.h);
        }
        return true;
    });
}
exports.firebasePushFunction = firebasePushFunction;
function firebasePushAll(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const getRequest = req.body;
        if (getRequest.Authorization === '4Z1Q5X9V8-447QW7VH-MYDOLLAR-RATES') {
            yield index_1.sendFromTopic(getRequest.hour, getRequest.title);
            return res.json({ 'code': 0 });
        }
        return res.json({ 'code': 403 });
    });
}
exports.firebasePushAll = firebasePushAll;
function arrayPushFirebase(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const getRequest = req.body;
        if (getRequest.Authorization === '4Z1Q5X9V8-447QW7VH-MYDOLLAR-RATES') {
            const firebaseAdmin = new firebase_pipes_1.FirebaseArrayPush(getRequest.body, getRequest.title);
            yield firebaseAdmin.sendPushNotification();
            return res.json({ 'code': 0 });
        }
        return res.json({ 'code': 403 });
    });
}
exports.arrayPushFirebase = arrayPushFirebase;
function pushPhone(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(req.body);
        const pushPhone = new firebase_pipes_1.FirebasePushPhone();
        pushPhone.sendPushNotification();
        return res.json({ 'code': 200 });
    });
}
exports.pushPhone = pushPhone;
