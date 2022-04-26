
import crypto from "crypto-js";
import fs from 'fs'
export class File {

    constructor() { }


    static readDir(path){
        if (!path) throw Error("Path not reported")
        
        const document = fs.statSync(path)
        if(document){
            if (document.isDirectory()){
                return fs.readdirSync(path)
            }
        }
    }


    static generateHashName(name?: string) {
        return crypto.SHA256(name || new Date().toISOString()).toString()
    }

    /**
     * Breaks the mimetype into type and subtype to facilitate the extraction of the types
     * @param mimetype type/subType
     * @returns type (text, image, audio, vidio ...) e subType (plain, jpeg, mp4 ....)
     */
    static breakMimetype(mimetype: string) {
        if (!mimetype) return;

        let setFirstMimeType = String(mimetype.split(",")[0]).trim()
        let parts = setFirstMimeType.split("/")
        return {
            type: parts[0].trim() || "",
            subType: parts[1].trim() || ""
        }
    }

    static getFileExtensionByName(filename: string) {
        if (!filename) return;
        let parts = filename.split(".")
        return parts[parts.length - 1].trim()
    }

    static filterExt(permittedExt: String[], mimetype: string): boolean {
		return permittedExt.includes(mimetype)
	}
}
