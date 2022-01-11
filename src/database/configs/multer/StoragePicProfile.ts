import { ConfigStorage } from "."

export class StoragePicProfile extends ConfigStorage {

  nameColletion: string = "pic_profiles";
  extPermiteds: String[] = ["image/jpeg", "image/pjpeg", "image/png", "image/gif"];

  config() {
    return this.build()
  }
}