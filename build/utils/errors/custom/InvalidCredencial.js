"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ErrorCustom_1 = require("./ErrorCustom");
class InvalidCredencial extends ErrorCustom_1.ErrorCustom {
    constructor(msg) {
        super(msg);
        this.status = 406;
        this.name = "InvalidCredencial";
    }
}
exports.InvalidCredencial = InvalidCredencial;
