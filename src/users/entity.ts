import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import { IsString, IsEmail } from 'class-validator'
import { Exclude } from 'class-transformer'
import * as bcrypt from 'bcrypt'
import Evaluation from '../evaluations/entity'

@Entity()
export default class User extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @IsEmail()
  @Column('text')
  email: string

  @IsString()
  @Column('text')
  @Exclude({toPlainOnly:true})
  password: string

  async setPassword(rawPassword: string) {
  const hash = await bcrypt.hash(rawPassword, 10)
  this.password = hash
  }

  checkPassword(rawPassword: string): Promise<boolean> {
  return bcrypt.compare(rawPassword, this.password)
  }

  @OneToMany(_=> Evaluation, evaluation => evaluation.user)
  evaluations: Evaluation[]

}
