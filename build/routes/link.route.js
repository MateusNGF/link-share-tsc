"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const link_1 = require("../controllers/link");
const adapter_1 = require("../utils/adapter");
const JsonWebToken_1 = require("../utils/JsonWebToken");
exports.linkRouter = express_1.Router();
exports.linkRouter.post('/create', JsonWebToken_1.verify, adapter_1.ExpressAdapterRouter.adapt(new link_1.CreateNewLink()));
exports.linkRouter.delete('/:idLink/*', JsonWebToken_1.verify, adapter_1.ExpressAdapterRouter.adapt(new link_1.DeleteLinkById()));
