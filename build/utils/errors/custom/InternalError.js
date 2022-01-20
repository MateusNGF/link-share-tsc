"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ErrorCustom_1 = require("./ErrorCustom");
class InternalError extends ErrorCustom_1.ErrorCustom {
    constructor(msg) {
        super(msg);
        this.status = 500;
        this.name = "InternalError";
    }
}
exports.InternalError = InternalError;
