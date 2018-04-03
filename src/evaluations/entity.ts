import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import { IsString, IsInt, IsDate } from 'class-validator'
import User from '../users/entity'
import Student from '../students/entity'
// import { Exclude } from 'class-transformer'
// import * as bcrypt from 'bcrypt'

@Entity()
export default class Evaluation extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @IsDate()
  @Column()
  date: Date

  @IsString()
  @Column('text')
  colour: 'green' | 'yellow' | 'red'

  @IsString()
  @Column('text')
  remarks: string

  @ManyToOne(_=> User, user => user.evaluations)
  user: User;

  @ManyToOne(_=> Student, student => student.evaluations)
  student: Student;

}
