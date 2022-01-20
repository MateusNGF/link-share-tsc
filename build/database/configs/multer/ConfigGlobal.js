"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const crypto_1 = __importDefault(require("crypto"));
const FileError_1 = require("../../../utils/errors/custom/FileError");
class ConfigStorage {
    constructor() {
        this.pathResolve = undefined;
        this.nameColletion = undefined;
        this.extPermiteds = undefined;
        this.fileLimitSize = 20 * 1024 * 1024;
        this.storageReferencia = process.env.STORAGE_TYPE;
        this.pathDatabase = `${__dirname}/../../documents/`;
    }
    build() {
        this.pathResolve = path_1.default.resolve(this.pathDatabase, `./${this.nameColletion}/`);
        return {
            dest: this.pathResolve,
            storage: (this.storageReferencia === "local") ? this.typeLocal() : this.typeLocal(),
            limits: {
                fileSize: this.fileLimitSize
            },
            fileFilter: (r, f, cb) => {
                const filter = ConfigStorage.filterExt(this.extPermiteds, f.mimetype);
                if (filter) {
                    cb(undefined, true);
                }
                else {
                    cb(new FileError_1.FileError(`Mimetype ${f.mimetype} not permited.`));
                }
            }
        };
    }
    typeLocal() {
        return multer_1.default.diskStorage({
            destination: (req, file, cb) => {
                cb(undefined, this.pathResolve);
            },
            filename: (req, file, cb) => {
                crypto_1.default.randomBytes(16, (e, h) => {
                    if (e)
                        cb(e, undefined);
                    const filename = encodeURIComponent(`linkshare${h.toString('hex')}-${file.originalname}`);
                    cb(undefined, filename);
                });
            }
        });
    }
    static filterExt(permitedExt, mimetype) {
        if (permitedExt.includes(mimetype)) {
            return true;
        }
        else {
            return false;
        }
    }
}
exports.ConfigStorage = ConfigStorage;
