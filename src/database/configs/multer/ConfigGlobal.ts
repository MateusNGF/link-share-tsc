import multer from "multer";
import multerS3 from 'multer-s3'
import path from "path";
import crypto from "crypto-js";
import { FileError } from "../../../utils/errors/custom/FileError";
import { BucketS3, File } from "../../../utils";

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
			fileFilter: (r, file, cb) => {
				if(File.filterExt(this.extPermitted, file.mimetype)) cb(undefined, true)
				else cb(new FileError(`Mimetype ${file.mimetype} not permitted.`))
			},
		};

		let options : any = {
			new_name : File.generateHashName(),
			colletion : this.nameCollection
		}

		switch (this.storageLocation) {
			case "local":
				settings.storage =this.uploadLocal(options)
				break;
			case "cloud":
				settings.storage = this.uploadCloud(options)
				break;
			case "cache":
				settings.storage = multer.memoryStorage()
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
				callback(undefined, `${options.new_name}.${File.breakMimetype(file.mimetype).subType}`)
			},
		})
	}

	private uploadCloud( options ?: any){
		return multerS3({
			s3: BucketS3.S3,
			bucket: BucketS3.bucket,
			contentType : multerS3.AUTO_CONTENT_TYPE,
			serverSideEncryption: 'AES256',
			acl: "public-read",
			key: function (req, file, callback) {
				callback(undefined, `${options.colletion}/${options.new_name}.${File.breakMimetype(file.mimetype).subType}`)
			},
			metadata: function (req, file, callback) {
				callback(null, { originalname: file.originalname}) 
			}
		})
	}
}
