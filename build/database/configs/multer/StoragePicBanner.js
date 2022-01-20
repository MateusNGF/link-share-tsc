"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
class StoragePicBanner extends _1.ConfigStorage {
    constructor() {
        super(...arguments);
        this.nameColletion = 'pic_banners';
    }
    config() {
        return this.build();
    }
}
exports.StoragePicBanner = StoragePicBanner;
