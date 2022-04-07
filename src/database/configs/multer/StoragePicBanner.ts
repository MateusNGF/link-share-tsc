import { ConfigStorage } from "."
export class StoragePicBanner extends ConfigStorage {

  nameCollection: string = 'pic_banners'

  config() {
    return this.build()
  }
}