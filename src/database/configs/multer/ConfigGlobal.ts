import multer from "multer";
import path from 'path'
import crypto from 'crypto'
//import * as s3 from "../../../utils/aws" // import s3 functions
import { FileError } from "../../../utils/errors/custom/FileError";


export abstract class ConfigStorage {
  pathResolve: string;
  nameCollection: string;
  extPermitted: String[];
  fileLimitSize: number = 20 * 1024 * 1024;
  storageReferencia: string = process.env.StorageType || "local";
  pathDatabase: string = `${__dirname}/../../documents/`;

  build(): multer.Options {
    this.pathResolve = path.resolve(this.pathDatabase, `./${this.nameCollection}/`)
    return {
      dest: this.pathResolve,
      storage: (this.storageReferencia === "local") ? this.typeLocal() : this.typeCloud(),
      limits: {
        fileSize: this.fileLimitSize
      },
      fileFilter: (r, f, cb) => {
        const filter = ConfigStorage.filterExt(this.extPermitted, f.mimetype)
        if (filter) { cb(undefined, true) }
        else { cb(new FileError(`Mimetype ${f.mimetype} not permitted.`)) }
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
		/*Obter url do banco remover parte inicial 
      ate o patch e verificar se ja tem um arquivo do usuário no bucket*/
    //s3.findFile(pasta_remota, nome_arquivo);

		//Se tiver excluir arquivo no bucket
		//s3.deleteFile(pasta_remota, nome_remoto);

		//Subir novo arquivo
		//s3.uploadFile(fileLocal, pasta_remota, nome_remoto, ext_arquivo);

		//Salvar no banco em relação ao usuário a url completa retornada pelo uploadFile

		return this.typeLocal();
	}

  static filterExt(permittedExt: String[], mimetype: string): boolean {
    if (permittedExt.includes(mimetype)) {
      return true
    } else {
      return false
    }
  }
}