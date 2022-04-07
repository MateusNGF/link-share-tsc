import { getCustomRepository } from "typeorm";
import { User } from "../../entity";
import { UserRepository } from "../../repository";
import { buildBody, DataNotFound, BadRequest, Messenger, typeCustomRequest, typeCustomResponse } from "../../utils";
import { IController } from "../protocols";
import message from "../../utils/configs/texts.config";
import fs from "fs";
import * as s3 from "../../utils/aws";

const storageLocation = process.env.StorageType as string;
const collectionProfiles = process.env.collectionPicProfiles as string;

export class PicProfiles implements IController {
	async exec(request: typeCustomRequest): Promise<typeCustomResponse> {
		try {
			const repository = getCustomRepository(UserRepository);
			let userCurrent: User = await repository.findById(request.header["user"]["id"]);
			if (!userCurrent) throw new DataNotFound(message.ptbr.entities.user.errors.notFound);

			let fileUrl = null;

			if (storageLocation == "local") {
				if (userCurrent.pic_profile != null)
					fs.unlink(userCurrent.pic_profile, function (err) {
						if (err) console.warn("Fail to delete the local file! error:", err);
					});
				
				fileUrl = request.file.path;
			} else if (storageLocation == "cloud") {
				if (userCurrent.pic_profile != null) {
					const indexOfFileName = userCurrent.pic_profile.lastIndexOf(collectionProfiles);
					const fileName = userCurrent.pic_profile.substring(indexOfFileName + collectionProfiles.length);
					await s3.deleteFile(collectionProfiles + fileName);
					
					fileUrl = await s3.uploadFile(request.file.path, collectionProfiles, request.file.filename, request.file.mimetype);
					fs.unlink(request.file.path, function (err) {
						if (err) console.warn("Fail to delete the local file! error:", err);
					});
				}
			} else throw new Error("Invalid Storage Type");

			const userUpdate: User = new User(request.body);
			userUpdate.pic_profile = fileUrl;
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
