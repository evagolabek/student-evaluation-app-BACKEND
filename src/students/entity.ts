import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import { IsString } from 'class-validator'
// import { Exclude } from 'class-transformer'
// import * as bcrypt from 'bcrypt'

@Entity()
export default class Student extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @IsString()
  @Column('text')
  firstName: string

  @IsString()
  @Column('text')
  lastName: string

  @IsString()
  @Column('text')
  image: String

  @IsString()
  @Column('text')
  batchId: string


}
