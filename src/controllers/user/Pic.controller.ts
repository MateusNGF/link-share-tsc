import { getCustomRepository } from "typeorm";
import { User } from "../../entity";
import { UserRepository } from "../../repository";
import { DataNotFound, BadRequest, Messenger, typeCustomRequest, typeCustomResponse, BucketS3 } from "../../utils";
import { IController } from "../protocols";
import message from "../../utils/configs/texts.config";
import { StoragePicProfile } from "../../database/configs";
import moment from "moment";

const storageLocation = process.env.StorageType as string;
const collectionProfiles = process.env.collectionPicProfiles as string;

export class PicProfiles implements IController {
	async exec(request: typeCustomRequest): Promise<typeCustomResponse> {
		try {

			const userID = request.header["user"]["id"]

			if (!!request && !request.file) throw new BadRequest("Arquivo recebido.")
			const picture = request.file

			const repository = getCustomRepository(UserRepository);
			let user: User = await repository.findById(userID);

			if (!user) throw new DataNotFound("Usuario não encontrado.");

			// const timeChangePic = moment(user.pic_profile).add(2, 'hour')
			// if (moment().isBefore(timeChangePic)){
			// 	throw new BadRequest("Você só pode atualizar novamente depois das "+ moment(timeChangePic).format("hh:mm"))
			// }

			if (storageLocation === "cache"){
				let key = StoragePicProfile.generateHashName() + "." + StoragePicProfile.getMimetype(picture)
				picture.key = `${collectionProfiles}/${userID}/${key}`
				user.pic_profile = (await BucketS3.uploadFile(picture.key, request.file)).Location
			}else{
				if (!!request.file.Location){
					user.pic_profile = request.file.Location
				}else{ throw new Error("Cara ... deu pau!") }
			}

			user.lastUpdatePicProfile = new Date().toISOString()
			
			user.save().catch(erro => {			
				throw new BadRequest(message.ptbr.entities.user.errors.updateFailed);
			})

			return Messenger.success({ pic_profile_url : user.pic_profile});
		} catch (error) {
			return Messenger.error(error);
		}
	}
}
