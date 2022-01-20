"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const entity_1 = require("../../entity");
const repository_1 = require("../../repository");
const utils_1 = require("../../utils");
class Access {
    async exec(request) {
        try {
            const repository = typeorm_1.getCustomRepository(repository_1.UserReposiroty);
            var access = new entity_1.User();
            await utils_1.schemas.user.methods.validProps(["email", "password"], request.body);
            access = await repository.validAccess(request.body.email, request.body.password);
            return utils_1.Messager.sucess(utils_1.buildBody(access));
        }
        catch (error) {
            return utils_1.Messager.error(error);
        }
    }
}
exports.Access = Access;
