import Joi from "joi";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Link } from "../entity";
import { InvalidParam, schemas } from "../utils";

@Entity("user")
export class User {
    constructor(new_user: User = null) {
        try {
            Object.assign(this, new_user);
        } catch (e) {
            throw new InvalidParam(e.message);
        }
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

    @Column({ nullable: true, default: null, length: 500 })
    description?: string;

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
}
