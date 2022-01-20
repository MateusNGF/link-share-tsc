"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = __importDefault(require("./app"));
require("reflect-metadata");
const typeorm_1 = require("typeorm");
try {
    typeorm_1.createConnection();
    const port = process.env.PORT || 3000;
    dotenv_1.default.config();
    app_1.default.listen(port, () => {
        console.log("===>  ✅  Running server (" + port + ")  ✅  <===");
    });
}
catch (e) {
    console.log("Error in connected database");
}
