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
exports.sendFromTopic = void 0;
// Base de datos
const database_1 = require("../database");
// Controller
const firebase_controller_1 = require("../controllers/firebase.controller");
// Funciones
const functions_1 = require("../functions");
function sendDolar(t, h, title, oldFecha) {
    return __awaiter(this, void 0, void 0, function* () {
        const conn = yield database_1.connect();
        let fetch = yield conn.query('SELECT id_dol, nom_dol, pre_dol FROM dolarparalelo WHERE est_dol = 1');
        let arrDol = fetch[0];
        arrDol.map((e) => __awaiter(this, void 0, void 0, function* () {
            const fetchDol = yield conn.query("SELECT (SELECT pre_mon FROM dolarparalelo_monitor WHERE fec_mon = ? AND hor_mon = dm.hor_mon AND div_mon = dm.div_mon) AS pre_mon FROM dolarparalelo_monitor AS dm WHERE div_mon = ? ORDER BY id_mon DESC LIMIT 1", [oldFecha, e.id_dol]);
            const objDol = fetchDol[0];
            const porDol = functions_1.getPorcentaje(parseFloat(objDol[0].pre_mon), e.pre_dol);
            const objFirebase = { title, text: "El precio de [" + e.nom_dol + "] " + porDol.msg + " " + porDol.por + "con respecto al día de ayer.", t, e: e.id_dol, h };
            yield firebase_controller_1.firebasePushFunction(objFirebase);
        }));
        fetch = yield conn.query('SELECT usb_mon AS newBcv, usp_mon AS newPro, (SELECT usb_mon FROM dolar_euro_monitor WHERE hor_mon = d.hor_mon AND fec_mon = ? ORDER BY id_mon DESC LIMIT 1 ) AS oldBcv, (SELECT usp_mon FROM dolar_euro_monitor WHERE hor_mon = d.hor_mon AND fec_mon = ? ORDER BY id_mon DESC LIMIT 1 ) AS oldPro FROM dolar_euro_monitor AS d ORDER BY id_mon DESC LIMIT 1', [oldFecha, oldFecha]);
        arrDol = fetch[0];
        const porDolBcv = functions_1.getPorcentaje(parseFloat(arrDol[0].oldBcv), parseFloat(arrDol[0].newBcv));
        const objFirebaseBcv = { title, text: "El precio de [Dolar Bcv] " + porDolBcv.msg + " " + porDolBcv.por + "con respecto al día de ayer.", t, e: 8, h };
        yield firebase_controller_1.firebasePushFunction(objFirebaseBcv);
        const porDolPro = functions_1.getPorcentaje(parseFloat(arrDol[0].oldPro), parseFloat(arrDol[0].newPro));
        const objFirebasePro = { title, text: "El precio de [Dolar Promedio] " + porDolPro.msg + " " + porDolPro.por + "con respecto al día de ayer.", t, e: 9, h };
        yield firebase_controller_1.firebasePushFunction(objFirebasePro);
        return;
    });
}
function sendEuro(t, h, title, oldFecha) {
    return __awaiter(this, void 0, void 0, function* () {
        const conn = yield database_1.connect();
        let fetch = yield conn.query('SELECT id_eur, nom_eur, pre_eur FROM europaralelo WHERE est_eur = 1');
        let arrEur = fetch[0];
        arrEur.map((e) => __awaiter(this, void 0, void 0, function* () {
            const fetchEur = yield conn.query("SELECT (SELECT pre_mon FROM europaralelo_monitor WHERE fec_mon = ? AND hor_mon = dm.hor_mon AND div_mon = dm.div_mon) AS pre_mon FROM europaralelo_monitor AS dm WHERE div_mon = ? ORDER BY id_mon DESC LIMIT 1", [oldFecha, e.id_eur]);
            const objEur = fetchEur[0];
            const porEur = functions_1.getPorcentaje(parseFloat(objEur[0].pre_mon), e.pre_eur);
            const objFirebase = { title, text: "El precio de [" + e.nom_eur + "] " + porEur.msg + " " + porEur.por + "con respecto al día de ayer.", t, e: e.id_eur, h };
            yield firebase_controller_1.firebasePushFunction(objFirebase);
        }));
        fetch = yield conn.query('SELECT eub_mon AS newBcv, eup_mon AS newPro, (SELECT eub_mon FROM dolar_euro_monitor WHERE hor_mon = d.hor_mon AND fec_mon = ? ORDER BY id_mon DESC LIMIT 1 ) AS oldBcv, (SELECT eup_mon FROM dolar_euro_monitor WHERE hor_mon = d.hor_mon AND fec_mon = ? ORDER BY id_mon DESC LIMIT 1 ) AS oldPro FROM dolar_euro_monitor AS d ORDER BY id_mon DESC LIMIT 1', [oldFecha, oldFecha]);
        arrEur = fetch[0];
        const porEurBcv = functions_1.getPorcentaje(parseFloat(arrEur[0].oldBcv), parseFloat(arrEur[0].newBcv));
        const objFirebaseBcv = { title, text: "El precio de [Euro Bcv] " + porEurBcv.msg + " " + porEurBcv.por + "con respecto al día de ayer.", t, e: 7, h };
        yield firebase_controller_1.firebasePushFunction(objFirebaseBcv);
        const porEurPro = functions_1.getPorcentaje(parseFloat(arrEur[0].oldPro), parseFloat(arrEur[0].newPro));
        const objFirebasePro = { title, text: "El precio de [Euro Promedio] " + porEurPro.msg + " " + porEurPro.por + "con respecto al día de ayer.", t, e: 8, h };
        yield firebase_controller_1.firebasePushFunction(objFirebasePro);
        return;
    });
}
function sendFromTopic(hour, title) {
    return __awaiter(this, void 0, void 0, function* () {
        const fecha = functions_1.restarDia(new Date(), 1);
        const oldFecha = functions_1.getFecha(fecha);
        yield sendDolar(1, hour, title, oldFecha);
        yield sendEuro(2, hour, title, oldFecha);
        console.log('Started all send FirebasePush ' + new Date().toString());
        return;
    });
}
exports.sendFromTopic = sendFromTopic;
