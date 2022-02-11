import multer from "multer";
import path from 'path'
import crypto from 'crypto'
import { FileError } from "../../../utils/errors/custom/FileError";


export abstract class ConfigStorage {
  pathResolve: string;
  nameColletion: string;
  extPermiteds: String[];
  fileLimitSize: number = 20 * 1024 * 1024
  storageReferencia: string = process.env.STORAGE_TYPE ?? "Local"
  pathDatabase: string = `${__dirname}/../../documents/`

  build(): multer.Options {
    this.pathResolve = path.resolve(this.pathDatabase, `./${this.nameColletion}/`)
    return {
      dest: this.pathResolve,
      storage: (this.storageReferencia === "local") ? this.typeLocal() : this.typeCloud(),
      limits: {
        fileSize: this.fileLimitSize
      },
      fileFilter: (r, f, cb) => {
        const filter = ConfigStorage.filterExt(this.extPermiteds, f.mimetype)
        if (filter) { cb(undefined, true) }
        else { cb(new FileError(`Mimetype ${f.mimetype} not permited.`)) }
      }
    }
  }

  private typeLocal(): multer.StorageEngine {
    return multer.diskStorage({
      destination: (req, file, cb) => {
        cb(undefined, this.pathResolve)
      },
      filename: (req, file, cb) => {
        crypto.randomBytes(16, (e, h) => {
          if (e) cb(e, undefined);
          const filename = encodeURIComponent(`linkshare${h.toString('hex')}-${file.originalname}`)
          cb(undefined, filename)
        })
      }
    })
  }

  private typeCloud(): multer.StorageEngine {
    return this.typeLocal()
  }

  static filterExt(permitedExt: String[], mimetype: string): boolean {
    if (permitedExt.includes(mimetype)) {
      return true
    } else {
      return false
    }
  }
}