"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const entity_1 = require("../entity");
const utils_1 = require("../utils");
let User = class User {
    constructor(new_user = null) {
        Object.assign(this, new_user);
    }
    isOwner(link) {
        if (this.id.toString() === link.owner.toString())
            return true;
        return false;
    }
    valid() {
        return utils_1.schemas.user.methods.validProps(["name", "nickname", "password", "email"], this);
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({ unique: true, nullable: false }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    typeorm_1.Column({ unique: true, nullable: false }),
    __metadata("design:type", String)
], User.prototype, "nickname", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    typeorm_1.Column({ nullable: true, default: null }),
    __metadata("design:type", String)
], User.prototype, "pic_profile", void 0);
__decorate([
    typeorm_1.Column({ nullable: true, default: null, length: 500 }),
    __metadata("design:type", String)
], User.prototype, "description", void 0);
__decorate([
    typeorm_1.OneToMany(() => entity_1.Link, links => links.owner, { eager: true, cascade: true }),
    __metadata("design:type", Array)
], User.prototype, "links", void 0);
__decorate([
    typeorm_1.CreateDateColumn({ name: 'created_At' }),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.UpdateDateColumn({ name: 'update_At' }),
    __metadata("design:type", Date)
], User.prototype, "updateAt", void 0);
User = __decorate([
    typeorm_1.Entity('user'),
    __metadata("design:paramtypes", [User])
], User);
exports.User = User;
