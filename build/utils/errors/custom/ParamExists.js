"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ErrorCustom_1 = require("./ErrorCustom");
class ParamExists extends ErrorCustom_1.ErrorCustom {
    constructor(msg) {
        super(msg);
        this.status = 400;
        this.name = "ParamExists";
    }
}
exports.ParamExists = ParamExists;
