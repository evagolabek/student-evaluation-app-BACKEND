import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import { IsInt, IsDate } from 'class-validator'
import Student from '../students/entity'


@Entity()
export default class Batch extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @IsInt()
  @Column('int')
  number: number

  @IsDate()
  @Column()
  startDate: Date

  @IsDate()
  @Column()
  endDate: Date

  @OneToMany(_=> Student, student => student.batch)
  students: Student[]

}
