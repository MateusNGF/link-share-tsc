"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const errors_1 = require("./errors");
const custom_1 = require("./errors/custom");
exports.verify = (req, res, next) => {
    try {
        let token = req.headers['x-access-token'];
        if (!token)
            throw new custom_1.Unauthorized("Access Denied.");
        req.header['user'] = exports.decoded(token.toString());
        next();
    }
    catch (error) {
        res.status(401).json({
            status: false,
            body: {
                message: error.message
            }
        });
    }
};
exports.decoded = (token) => {
    let decodedUser;
    jsonwebtoken_1.default.verify(token, process.env.jwtPassoword, (faild, decoded) => {
        if (faild)
            throw new custom_1.Unauthorized("Access key invalid");
        decodedUser = decoded;
    });
    return decodedUser;
};
exports.create = (params, time = process.env.jwtExpiredDefaultTime, secret = process.env.jwtPassoword) => {
    if (!params)
        throw new errors_1.MissingParameters("Params for create JsonWebToken missings");
    return jsonwebtoken_1.default.sign(params, secret, {
        expiresIn: time
    });
};
exports.buildBody = (user) => {
    user['token'] = exports.create({ id: user.id });
    delete user['password'];
    delete user['id'];
    return user;
};
