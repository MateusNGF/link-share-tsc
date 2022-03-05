import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { User } from '../entity'
import { BadRequest, schemas } from '../utils'
import ping from 'ping'

@Entity('link')
export class Link {
  constructor(link: Link) {
    Object.assign(this, link)
  }
  @PrimaryGeneratedColumn()
  id_link?: string

  @Column({ nullable: false })
  type: string

  @Column({ nullable: false })
  url: string

  @ManyToOne(() => User, owner => owner.links)
  owner?: User

  @CreateDateColumn({ name: 'created_At' })
  createdAt?: Date

  @UpdateDateColumn({ name: 'update_At' })
  updateAt?: Date

  async valid() {
    await schemas.link.methods.validProps(["type", "url"], this)
    // await ping.promise.probe(this.url, { timeout: 10, extra: ['-i', '2']})
  }
}