"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
class Messager {
    static sucess(body) {
        return { statusCode: 200, body: { status: true, body } };
    }
    static error(error) {
        if (error.name === "ValidationError")
            error = new _1.InvalidParam(error.message);
        if (!error.custom) {
            this.sendInConsole(error);
            return { statusCode: 500, body: { status: false, message: "Internal Error. Try later... :(" } };
        }
        return { statusCode: error.status, body: { status: false, message: error.message } };
    }
    static sendInConsole(error) {
        const date = new Date();
        console.log(`${date.getDate()}/${date.getMonth()}/${date.getFullYear()} as ${date.getHours()}:${date.getMinutes()}`, `===> ${error.name} : ${error.message}`);
    }
}
exports.Messager = Messager;
