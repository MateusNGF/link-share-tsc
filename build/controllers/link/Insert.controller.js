"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const entity_1 = require("../../entity");
const texts_config_1 = __importDefault(require("../../utils/configs/texts.config"));
const repository_1 = require("../../repository");
const utils_1 = require("../../utils");
class CreateNewLink {
    async exec(request) {
        try {
            const idCurrentUser = request.header['user']['id'], repositoryLink = typeorm_1.getCustomRepository(repository_1.LinkRepository), repositoryUser = typeorm_1.getCustomRepository(repository_1.UserReposiroty), currentUser = await repositoryUser.findById(idCurrentUser), newLink = new entity_1.Link(request.body);
            await newLink.valid();
            if (!currentUser)
                throw new utils_1.InvalidCredencial(texts_config_1.default.ptbr.entities.user.errors.notFound);
            if (currentUser.links.find((link) => link.url.toString() === newLink.url.toString()))
                throw new utils_1.ParamExists(texts_config_1.default.ptbr.entities.link.errors.duplicated);
            await repositoryLink.save(newLink);
            return utils_1.Messager.sucess({});
        }
        catch (error) {
            return utils_1.Messager.error(error);
        }
    }
}
exports.CreateNewLink = CreateNewLink;
