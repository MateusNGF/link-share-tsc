import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { User } from '../entity'

@Entity('link')
export class Link {
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
}