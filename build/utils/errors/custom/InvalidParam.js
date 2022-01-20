"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ErrorCustom_1 = require("./ErrorCustom");
class InvalidParam extends ErrorCustom_1.ErrorCustom {
    constructor(msg) {
        super(msg);
        this.status = 400;
        this.name = "InvalidParam";
    }
}
exports.InvalidParam = InvalidParam;
