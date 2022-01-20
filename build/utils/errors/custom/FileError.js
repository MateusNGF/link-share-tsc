"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ErrorCustom_1 = require("./ErrorCustom");
class FileError extends ErrorCustom_1.ErrorCustom {
    constructor(msg) {
        super(msg);
        this.status = 418;
        this.name = "FileError";
    }
}
exports.FileError = FileError;
