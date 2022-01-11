import { ConfigStorage } from "."

export class StoragePicBanner extends ConfigStorage {

  nameColletion: string = process.env.ColletionPicBanners

  config() {
    return this.build()
  }
}