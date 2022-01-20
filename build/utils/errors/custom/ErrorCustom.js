"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ErrorCustom extends Error {
    constructor() {
        super(...arguments);
        this.custom = true;
    }
}
exports.ErrorCustom = ErrorCustom;
