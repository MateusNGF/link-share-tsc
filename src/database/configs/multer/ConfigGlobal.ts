import multer from "multer";
import multerS3 from 'multer-s3'
import path from "path";
import crypto from "crypto-js";
import { FileError } from "../../../utils/errors/custom/FileError";
import { BucketS3 } from "../../../utils";

export abstract class ConfigStorage {

	public readonly storageLocation: string = process.env.StorageType as string;

	public pathResolve: string;
	public nameCollection: string = "pic_other";
	public extPermitted: String[];
	public fileLimitSize: number = 20 * 1024 * 1024;
	public pathDatabase: string = `${__dirname}/../../documents/`;


	public build(): multer.Options {
		let settings : multer.Options  = {
			limits: {fileSize: this.fileLimitSize},
			fileFilter: (r, f, cb) => {
				if(ConfigStorage.filterExt(this.extPermitted, f.mimetype)) cb(undefined, true)
				else cb(new FileError(`Mimetype ${f.mimetype} not permitted.`))
			},
		};

		let options : any = {
			new_name : ConfigStorage.generateHashName(),
			colletion : this.nameCollection
		}

		switch (this.storageLocation) {
			case "local":
				settings.storage =this.uploadLocal(options)
				break;
			case "cloud":
				settings.storage = this.uploadCloud(options)
				break;
			default:
				throw new Error("Type storage location invalid. -> "+ this.storageLocation)
		}

		return settings
	}

	private uploadLocal( options ?: any ){
		this.pathResolve = path.resolve(this.pathDatabase, `./${this.nameCollection}/`);
		return multer.diskStorage({
			destination: (req, file, cb) => {
				cb(undefined, this.pathResolve)
			},
			filename: (req, file, callback) => {
				callback(undefined, `${options.new_name}.${ConfigStorage.getMimetype(file)}`)
			},
		})
	}

	private uploadCloud( options ?: any){
		return multerS3({
			s3: BucketS3.S3,
			bucket: BucketS3.bucket,
			contentType : multerS3.AUTO_CONTENT_TYPE,
			serverSideEncryption: 'AES256',
			key: function (req, file, callback) {
				callback(undefined, `${options.colletion}/${options.new_name}.${ConfigStorage.getMimetype(file)}`)
			},
			metadata: function (req, file, callback) {
				callback(null, { originalname: file.originalname}) 
			}
		})
	}

	static generateHashName(){
		return crypto.SHA256(new Date().toISOString()).toString()
	}

	static getMimetype(file : any){
		return file.mimetype.substring(file.mimetype.lastIndexOf("/")+1)
	}

	static filterExt(permittedExt: String[], mimetype: string): boolean {
		return permittedExt.includes(mimetype)
	}
}
