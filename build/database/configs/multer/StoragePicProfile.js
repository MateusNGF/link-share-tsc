"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
class StoragePicProfile extends _1.ConfigStorage {
    constructor() {
        super(...arguments);
        this.nameColletion = 'pic_profiles';
        this.fileLimitSize = 20 * 1024 * 1024; // MB
        this.extPermiteds = ["image/jpeg", "image/pjpeg", "image/png", "image/gif"];
    }
    config() {
        return this.build();
    }
}
exports.StoragePicProfile = StoragePicProfile;
