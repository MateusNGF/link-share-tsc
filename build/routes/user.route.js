"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const express_1 = require("express");
const utils_1 = require("../utils");
const adapter_1 = require("../utils/adapter");
const user_1 = require("../controllers/user");
const multer_2 = require("../database/configs/multer");
exports.userRouter = express_1.Router();
exports.userRouter.post('/register', adapter_1.ExpressAdapterRouter.adapt(new user_1.Create()));
exports.userRouter.post('/access', adapter_1.ExpressAdapterRouter.adapt(new user_1.Access()));
exports.userRouter.get('/refresh', utils_1.verify, adapter_1.ExpressAdapterRouter.adapt(new user_1.Refresh()));
exports.userRouter.post('/pic', multer_1.default(new multer_2.StoragePicProfile().config()).single("pic_profile"), (req, res) => {
    console.log(req.file);
});
