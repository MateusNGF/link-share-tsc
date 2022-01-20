"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MissingParameters extends Error {
    constructor(msg) {
        super(msg);
        this.name = "MissingParameters";
    }
}
exports.MissingParameters = MissingParameters;
