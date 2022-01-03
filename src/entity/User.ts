import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { Link } from '../entity'

@Entity('user')
export class User {

  @PrimaryGeneratedColumn()
  id?: string

  @Column({ nullable: false })
  name: string

  @Column({ unique: true })
  email: string

  @Column({ unique: true })
  nickname: string

  @Column()
  password: string

  @OneToMany(() => Link, links => links.owner, { eager: true, cascade: true })
  links: Link[]

  @CreateDateColumn({ name: 'created_At' })
  createdAt?: Date

  @UpdateDateColumn({ name: 'update_At' })
  updateAt?: Date
}