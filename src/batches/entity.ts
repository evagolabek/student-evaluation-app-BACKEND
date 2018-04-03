import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import { IsString } from 'class-validator'
import Student from '../students/entity'

@Entity()
export default class Batch extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @IsString()
  @Column('text')
  number: number

  @IsString()
  @Column('text')
  startDate: Date

  @IsString()
  @Column('text')
  endDate: Date

  @OneToMany(_=> Student, student => student.batch)
  students: Student[]

}

//http://typeorm.io/#/many-to-one-one-to-many-relations
