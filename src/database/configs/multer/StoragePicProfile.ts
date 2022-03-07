import { ConfigStorage } from "."

export class StoragePicProfile extends ConfigStorage {
  nameCollection: string = 'pic_profiles';
  fileLimitSize: number = 20 * 1024 * 1024 // MB
  extPermitted: String[] = ["image/jpeg", "image/pjpeg", "image/png", "image/gif"];

  config() {
    return this.build()
  }
}