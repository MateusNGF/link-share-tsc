import { getCustomRepository } from "typeorm";
import { User } from "../../entity";
import { UserRepository } from "../../repository";
import { DataNotFound, BadRequest, Messenger, typeCustomRequest, typeCustomResponse } from "../../utils";
import { IController } from "../protocols";
import message from "../../utils/configs/texts.config";

const storageLocation = process.env.StorageType as string;
const collectionProfiles = process.env.collectionPicProfiles as string;

export class PicProfiles implements IController {
	async exec(request: typeCustomRequest): Promise<typeCustomResponse> {
		try {
			const repository = getCustomRepository(UserRepository);
			let userCurrent: User = await repository.findById(request.header["user"]["id"]);

			if (!userCurrent) 
				throw new DataNotFound(message.ptbr.entities.user.errors.notFound);

			if (!request.file || !!request.file && !request.file.location){
				throw new BadRequest("Error in upload your pic profile")
			}
	
			userCurrent.pic_profile = request.file.location

			userCurrent.save().catch(erro => {			
				throw new BadRequest(message.ptbr.entities.user.errors.updateFailed);
			})

			return Messenger.success({ pic_profile_url : userCurrent.pic_profile});
		} catch (error) {
			return Messenger.error(error);
		}
	}
}
