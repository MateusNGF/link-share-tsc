import Joi from 'joi'
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, Repository, UpdateDateColumn } from 'typeorm'
import { Link } from '../entity'
import { schemas } from '../utils'

@Entity('user')
export class User {

  constructor(new_user: User = null) {
    Object.assign(this, new_user)
  }

  @PrimaryGeneratedColumn()
  id?: string

  @Column({ nullable: false })
  name: string

  @Column({ unique: true, nullable: false })
  email: string

  @Column({ unique: true, nullable: false })
  nickname: string

  @Column({ nullable: false })
  password: string

  @Column({ nullable: true, default: null })
  pic_profile?: string

  @Column({ nullable: true, default: null, length: 500 })
  description?: string

  @OneToMany(() => Link, links => links.owner, { eager: true, cascade: true })
  links?: Link[]

  @CreateDateColumn({ name: 'created_At' })
  createdAt?: Date

  @UpdateDateColumn({ name: 'update_At' })
  updateAt?: Date

  isOwner(link: Link): boolean {
    if (this.id.toString() === link.owner.toString()) return true
    return false
  }


  async validRegister() {
    return await Joi.object(schemas.user).validateAsync({
      name: this.name,
      nickname: this.nickname,
      password: this.password,
      email: this.email
    })
  }
  async validAccess(email: string, password: string) {
    return await Joi
      .object({ email: schemas.user.email, password: schemas.user.password })
      .validateAsync({ emai: this.email || email, password: this.password || password })
  }

}
