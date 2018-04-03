import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import { IsString } from 'class-validator'
import User from '../users/entity'
import Student from '../students/entity'

@Entity()
export default class Evaluation extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @IsString()
  @Column('text')
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
