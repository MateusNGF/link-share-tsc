"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
class Email {
    static async isEmail(email) {
        return await joi_1.default.string().email().validateAsync(email);
    }
}
exports.Email = Email;
