import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import { IsString } from 'class-validator'
import Evaluation from '../evaluations/entity'
import Batch from '../batches/entity'

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
  image?: String

  @OneToMany(_=> Evaluation, evaluation => evaluation.student)
  evaluations: Evaluation[]

  @ManyToOne(_=> Batch, batch => batch.students)
  batch: Batch;

}
