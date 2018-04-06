import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import { IsString } from 'class-validator'
import Student from '../students/entity'
import User from '../users/entity'

@Entity()
export default class Evaluation extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @IsString()
  @Column('text')
  date: Date

  @IsString()
  @Column('text')
  colour: string

  @IsString()
  @Column('text')
  remarks: string

  @ManyToOne(_=> Student, student => student.evaluations)
  student: Student

  @ManyToOne(_=> User, user => user.evaluations)
  user: User

}
