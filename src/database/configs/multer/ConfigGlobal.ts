import multer from "multer";
import path from "path";
import crypto from "crypto";
import { FileError } from "../../../utils/errors/custom/FileError";

export abstract class ConfigStorage {
	pathResolve: string;
	nameCollection: string;
	extPermitted: String[];
	fileLimitSize: number = 20 * 1024 * 1024;
	pathDatabase: string = `${__dirname}/../../documents/`;

	build(): multer.Options {
		this.pathResolve = path.resolve(this.pathDatabase, `./${this.nameCollection}/`);
		return {
			dest: this.pathResolve,
			storage: multer.diskStorage({
				destination: (req, file, cb) => cb(undefined, this.pathResolve),
				filename: (req, file, cb) => {
					crypto.randomBytes(16, (err, h) => {
						if (err) cb(err, undefined);
						const filename = encodeURIComponent(`linkshare-${h.toString("hex")}.${file.mimetype.substring(file.mimetype.lastIndexOf("/")+1)}`);
						cb(undefined, filename);
					});
				},
			}),
			limits: {
				fileSize: this.fileLimitSize,
			},
			fileFilter: (r, f, cb) => {
				const filter = ConfigStorage.filterExt(this.extPermitted, f.mimetype);
				if (filter) {
					cb(undefined, true);
				} else {
					cb(new FileError(`Mimetype ${f.mimetype} not permitted.`));
				}
			},
		};
	}
	static filterExt(permittedExt: String[], mimetype: string): boolean {
		if (permittedExt.includes(mimetype)) {
			return true;
		} else {
			return false;
		}
	}
}
