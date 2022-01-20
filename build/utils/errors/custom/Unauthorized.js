"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ErrorCustom_1 = require("./ErrorCustom");
class Unauthorized extends ErrorCustom_1.ErrorCustom {
    constructor(msg) {
        super(msg);
        this.status = 401;
        this.name = "Unauthorized";
    }
}
exports.Unauthorized = Unauthorized;
