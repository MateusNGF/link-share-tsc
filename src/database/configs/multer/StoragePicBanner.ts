import { ConfigStorage } from "."
export class StoragePicBanner extends ConfigStorage {

  nameColletion: string = 'pic_banners'

  config() {
    return this.build()
  }
}