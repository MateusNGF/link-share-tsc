import { getCustomRepository } from "typeorm";
import { User } from "../../entity";
import { UserRepository } from "../../repository";
import { DataNotFound, BadRequest, Messenger, RequestCustom, ResponseCustom, BucketS3, File } from "../../utils";
import { IController } from "../protocols";
import message from "../../utils/configs/texts.config";
import { StoragePicProfile } from "../../database/configs";
import moment from "moment";

const storageLocation = process.env.StorageType as string;
const collectionProfiles = process.env.collectionPicProfiles as string;

export class PicProfiles implements IController {
	async exec(request: RequestCustom): Promise<ResponseCustom> {
		try {

			const userID = request.header["user"]["id"]
			const timeForChangePic : timeParams = {
				time : 2,
				type : "hour"
			}

			if (!!request && !request.file) throw new BadRequest("Arquivo recebido.")
			const picture : Express.Multer.File = request.file

			const repository = getCustomRepository(UserRepository);
			let user: User = await repository.findById(userID);

			if (!user) throw new DataNotFound("Usuario não encontrado.");

			if (!!user.lastUpdatePicProfile){
				const changePicIn = moment(user.lastUpdatePicProfile).add(timeForChangePic.time, timeForChangePic.type)
				const remainingTimeInMinutes = changePicIn.diff(moment(), 'minute')
				if (moment().isBefore(changePicIn)){
					throw new BadRequest(`Você atualizou recentemente sua foto.`, {
						remainingTimeInMinutes, timeForChangePic
					})
				}
			}

			if (storageLocation === "cache"){
				let key = File.generateHashName() + "." + File.breakMimetype(picture.mimetype).subType
				let pictureKey = `${collectionProfiles}/${userID}/${key}`
				let pictureUploaded = await BucketS3.uploadFile(pictureKey, picture.buffer, picture.mimetype)
				if (!!pictureUploaded){
					user.pic_profile = pictureUploaded.Location
				}else{
					throw new BadRequest("Não foi possivel salvar sua foto.")
				}
			}else{
				if (!!request.file.Location){
					user.pic_profile = request.file.Location
				}else{ throw new Error("Cara ... deu pau!") }
			}

			user.lastUpdatePicProfile = moment().toISOString()
			user.save().catch(erro => {			
				throw new BadRequest(message.ptbr.entities.user.errors.updateFailed);
			})

			return Messenger.success({ pic_profile_url : user.pic_profile});
		} catch (error) {
			return Messenger.error(error);
		}
	}
}



export type timeParams = {time : number, type : moment.unitOfTime.DurationConstructor}
