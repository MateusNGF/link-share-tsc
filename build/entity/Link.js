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
let Link = class Link {
    constructor(link) {
        Object.assign(this, link);
    }
    valid() {
        return utils_1.schemas.link.methods.validProps(["type", "url"], this);
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", String)
], Link.prototype, "id_link", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", String)
], Link.prototype, "type", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", String)
], Link.prototype, "url", void 0);
__decorate([
    typeorm_1.ManyToOne(() => entity_1.User, owner => owner.links),
    __metadata("design:type", entity_1.User)
], Link.prototype, "owner", void 0);
__decorate([
    typeorm_1.CreateDateColumn({ name: 'created_At' }),
    __metadata("design:type", Date)
], Link.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.UpdateDateColumn({ name: 'update_At' }),
    __metadata("design:type", Date)
], Link.prototype, "updateAt", void 0);
Link = __decorate([
    typeorm_1.Entity('link'),
    __metadata("design:paramtypes", [Link])
], Link);
exports.Link = Link;
