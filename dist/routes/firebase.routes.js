"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
const firebase_controller_1 = require("../controllers/firebase.controller");
router.route('/register')
    .post(firebase_controller_1.firebaseUpdate);
router.route('/push')
    .post(firebase_controller_1.firebasePush);
router.route('/fromTopicNew')
    .post(firebase_controller_1.firebasePushAll);
router.route('/arrayPushFirebase')
    .post(firebase_controller_1.arrayPushFirebase);
router.route('/pushPhone')
    .get(firebase_controller_1.pushPhone);
exports.default = router;
