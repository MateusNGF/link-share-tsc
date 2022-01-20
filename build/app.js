"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const routes_1 = require("./routes");
const app = express_1.default();
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
    next();
});
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/files/:colletion/:filename", (req, res) => {
    res.sendFile(path_1.default.resolve(__dirname, "database", "documents", req.params.colletion, req.params.filename), (e) => {
        if (e)
            res.status(404).json({ status: false, message: "Colletion or name document not found." });
    });
});
app.use('/user', routes_1.userRouter);
app.use('/link', routes_1.linkRouter);
exports.default = app;
