"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const repository_1 = require("../../repository");
const utils_1 = require("../../utils");
class Refresh {
    async exec(request) {
        try {
            const idCurrentUser = request.header['user']['id'];
            const repository = typeorm_1.getCustomRepository(repository_1.UserReposiroty);
            const currentUserUpdated = await repository.findById(idCurrentUser);
            return utils_1.Messager.sucess(utils_1.buildBody(currentUserUpdated));
        }
        catch (error) {
            return utils_1.Messager.error(error);
        }
    }
}
exports.Refresh = Refresh;
