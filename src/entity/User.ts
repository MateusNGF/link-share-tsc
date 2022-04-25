import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Link } from "../entity";
import { InvalidFormat, InvalidParam, schemas } from "../utils";
import message from "../utils/configs/texts.config";
@Entity("user")
export class User extends BaseEntity {
    constructor(new_user: User = null) {
        super();Object.assign(this, new_user);
    }

    @PrimaryGeneratedColumn()
    id?: string;

    @Column({ nullable: false })
    name: string;

    @Column({ unique: true, nullable: false })
    email: string;

    @Column({ unique: true, nullable: false })
    nickname: string;

    @Column({ nullable: false })
    password: string;

    @Column({ nullable: false, default: false })
    verified: boolean;

    @Column({ nullable: true, default: null })
    pic_profile?: string;

    @Column({ nullable: true, default: null})
    description?: string;
    
    @Column({name: "last_update_pic_profile", nullable : true, default : null})
    lastUpdatePicProfile?: string;
    
    @OneToMany(() => Link, (links) => links.owner, { eager: true, cascade: true })
    links?: Link[];

    @CreateDateColumn({ name: "created_At" })
    createdAt?: Date;

    @UpdateDateColumn({ name: "update_At" })
    updateAt?: Date;


    isOwner(link: Link): boolean {
        if (this.id.toString() === link.owner.toString()) return true;
        return false;
    }

    async valid(thisProps: string[] = null) {
        return schemas.user.methods.validProps(thisProps || ["name", "nickname", "password", "email"], this);
    }

    nicknameFormatIsValid(nickname:string) {
        if(new RegExp(/^[^\\s-]$/).test(nickname))  throw new InvalidFormat(message.ptbr.entities.user.validation.nickname.invalidFormat)
    }
}
