"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.restarDia = exports.sumarDia = exports.getFecha = void 0;
function getFecha(e) {
    const d = e ? e : new Date();
    return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
}
exports.getFecha = getFecha;
function sumarDia(f, d) {
    f.setDate(f.getDate() + d);
    return f;
}
exports.sumarDia = sumarDia;
function restarDia(f, d) {
    f.setDate(f.getDate() - d);
    return f;
}
exports.restarDia = restarDia;
