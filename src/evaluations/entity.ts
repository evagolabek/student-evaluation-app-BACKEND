import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import { IsString } from 'class-validator'
// import { Exclude } from 'class-transformer'
// import * as bcrypt from 'bcrypt'

@Entity()
export default class Evaluation extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @IsString()
  @Column('text')
  studentId: string

  @IsString()
  @Column('int')
  userId: number

  @IsString()
  @Column()
  date: Date

  @IsString()
  @Column('text')
  colour: 'green' | 'yellow' | 'red'


}
