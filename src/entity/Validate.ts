import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "../entity";

@Entity("validates")
export class Validate {
    constructor(validate: Validate) {
        Object.assign(this, validate);
    }
    @PrimaryGeneratedColumn()
    id_validate?: string;

    @Column({ nullable: false, default: "email" })
    type: string;

    @Column({ nullable: false })
    uuid: string;

    @ManyToOne(() => User, (owner) => owner.links)
    owner?: User;

    @CreateDateColumn({ name: "created_At" })
    createdAt?: Date;

    @UpdateDateColumn({ name: "update_At" })
    updateAt?: Date;
}
