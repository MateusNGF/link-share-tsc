"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const texts_config_1 = __importDefault(require("../../utils/configs/texts.config"));
const repository_1 = require("../../repository");
const utils_1 = require("../../utils");
class DeleteLinkById {
    async exec(request) {
        try {
            const idCurrentUser = request.header['user']['id'], idLinkForDelete = request.params['idLink'], repositoryUser = typeorm_1.getCustomRepository(repository_1.UserReposiroty), repositoryLink = typeorm_1.getCustomRepository(repository_1.LinkRepository);
            const currentUser = await repositoryUser.findById(idCurrentUser);
            const currentLinkUser = currentUser.links.find((link) => link.id_link.toString() === idLinkForDelete.toString());
            if (!currentLinkUser)
                throw new utils_1.Unauthorized(texts_config_1.default.ptbr.entities.link.errors.notFound);
            await repositoryLink.remove(currentLinkUser);
            return utils_1.Messager.sucess({});
        }
        catch (error) {
            return utils_1.Messager.error(error);
        }
    }
}
exports.DeleteLinkById = DeleteLinkById;
