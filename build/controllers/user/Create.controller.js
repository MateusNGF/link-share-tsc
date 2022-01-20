"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const entity_1 = require("../../entity");
const repository_1 = require("../../repository");
const utils_1 = require("../../utils");
class Create {
    async exec(request) {
        try {
            const repository = typeorm_1.getCustomRepository(repository_1.UserReposiroty);
            const userCurrent = new entity_1.User(request.body);
            await userCurrent.valid();
            if (request.body.links && request.body.links.length > 0) {
                var promises = [];
                userCurrent.links = [];
                request.body.links.forEach(async (link) => {
                    const linkCurrent = new entity_1.Link(link);
                    promises.push(linkCurrent.valid());
                    userCurrent.links.push(linkCurrent);
                });
                await Promise.all(promises).catch((e) => { throw new utils_1.InvalidParam(`${e.message} - (${e._original})`); });
            }
            await repository.validCredencials(userCurrent.nickname, userCurrent.email);
            const savedCurrentUser = await repository.save(userCurrent);
            return utils_1.Messager.sucess(utils_1.buildBody(savedCurrentUser));
        }
        catch (error) {
            return utils_1.Messager.error(error);
        }
    }
}
exports.Create = Create;
