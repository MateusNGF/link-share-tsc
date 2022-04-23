import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "../entity";

@Entity("validates")
export class Validate extends BaseEntity {
    constructor(validate: Validate) {
        super();Object.assign(this, validate);
    }
    @PrimaryGeneratedColumn()
    id_validate?: string;

    @Column({ nullable: false, default: "email" })
    type: string;

    @Column({ nullable: false })
    uuid: string;

    @ManyToOne(() => User, (owner) => owner.id)
    owner?: User;

    @CreateDateColumn({ name: "created_At" })
    createdAt?: Date;

    @UpdateDateColumn({ name: "update_At" })
    updateAt?: Date;
}
