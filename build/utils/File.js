"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
class File {
    static remove(path) {
        if (fs_1.default.statSync(path)) {
            fs_1.default.unlinkSync(path);
            return true;
        }
        else {
            return false;
        }
    }
}
exports.File = File;
