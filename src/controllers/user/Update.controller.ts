import { getCustomRepository } from "typeorm";
import { User, Validate } from "../../entity";
import { RepositoryUserTypeORM, RepositoryValidadeTypeORM } from "../../repository";
import { BadRequest, buildBody, DataNotFound, InvalidParam, Messenger, RequestCustom, ResponseCustom } from "../../utils";
import { IController } from "../protocols";
import message from "../../utils/configs/texts.config";
import { SendEmailValidateCode } from "../../utils/sendEmail/services";
import { v4 as uuid } from "uuid";

export class Update implements IController {
	async exec(request: RequestCustom): Promise<ResponseCustom> {
		try {
			const repository = getCustomRepository(RepositoryUserTypeORM);
			let userCurrent: User = await repository.findById(request.header["user"]["id"]);
			if (!userCurrent) throw new DataNotFound(message.ptbr.entities.user.errors.notFound);

			for (const key in request.body) {
				if (!Object.prototype.hasOwnProperty.call(userCurrent, key)) {
					throw new InvalidParam(`A propriedade ${key} não existe.`);
				}
			}
			const userUpdate: User = new User(request.body);
			await userUpdate.valid(["name"]);
         
			//So verificamos o nickname se ja existe um igual no banco caso o user esteja alterando o seu nickName
			if (userCurrent.nickname != userUpdate.nickname)
				await repository.validateDuplicatedNickName(userUpdate.nickname);

			//So verificamos o email caso o usuário esteja alterando o seu email
			if (userCurrent.email != userUpdate.email) {
				await repository.validateDuplicatedEmail(userUpdate.email);
				userCurrent.verified = false;
				const validateRepository = getCustomRepository(RepositoryValidadeTypeORM);
				const savedValidate: Validate = await validateRepository.save({ uuid: uuid(), owner: userUpdate });
				await SendEmailValidateCode(savedValidate.owner.email, savedValidate.uuid, userUpdate.name);
			}

			if ((await repository.update(userCurrent.id, userUpdate)).affected > 0) {
				userCurrent = await repository.findById(request.header["user"]["id"]);
			} else {
				throw new BadRequest(message.ptbr.entities.user.errors.updateFailed);
			}
			return Messenger.success(buildBody(userCurrent));
		} catch (error) {
			return Messenger.error(error);
		}
	}
}
