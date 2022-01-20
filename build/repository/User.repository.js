"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const entity_1 = require("../entity");
const texts_config_1 = __importDefault(require("../utils/configs/texts.config"));
const utils_1 = require("../utils");
let UserReposiroty = class UserReposiroty extends typeorm_1.Repository {
    async findByEmail(email) {
        return await this.findOne({ where: { email } });
    }
    async findByNick(nickname) {
        return await this.findOne({ where: { nickname } });
    }
    async findById(id) {
        const currentUserFound = await this.findOne({ id });
        if (!currentUserFound)
            throw new utils_1.DataNotFound(texts_config_1.default.ptbr.entities.user.errors.notFound);
        return currentUserFound;
    }
    async validAccess(email, password) {
        const returnDB = await this.findByEmail(email);
        if (!returnDB)
            throw new utils_1.InvalidCredencial(texts_config_1.default.ptbr.entities.user.errors.notFound);
        if (returnDB.password !== password)
            throw new utils_1.Unauthorized(texts_config_1.default.ptbr.entities.user.errors.incorret('Senha'));
        return returnDB;
    }
    async validCredencials(nickname, email) {
        if (await this.findByEmail(email))
            throw new utils_1.ParamExists(texts_config_1.default.ptbr.entities.user.errors.duplicated('E-mail'));
        if (await this.findByNick(nickname))
            throw new utils_1.ParamExists(texts_config_1.default.ptbr.entities.user.errors.duplicated('Nickname'));
    }
};
UserReposiroty = __decorate([
    typeorm_1.EntityRepository(entity_1.User)
], UserReposiroty);
exports.UserReposiroty = UserReposiroty;
