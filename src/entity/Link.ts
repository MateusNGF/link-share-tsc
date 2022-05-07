import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { User } from '../entity'
import {BadRequest} from '../utils'

@Entity('link')
export class Link {
  constructor(link: Link) {
    Object.assign(this, link)
  }
  @PrimaryGeneratedColumn()
  id_link?: string

  @Column({ nullable: false })
  type: string

  @Column({ nullable : true})
  tag: string
  
  @Column({ nullable: false })
  context: string

  @ManyToOne(() => User, owner => owner.links)
  owner?: User

  @CreateDateColumn({ name: 'created_At' })
  createdAt?: Date

  @UpdateDateColumn({ name: 'update_At' })
  updateAt?: Date

  async valid?() {
    if (!this.tag) throw new BadRequest("tag is required.")
    if (!this.context) throw new BadRequest("context is required.")
    if (!this.type) throw new BadRequest("type is required.")
    // await schemas.link.methods.validProps(["type", "url"], this)
  }
}