import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import { IsString } from 'class-validator'


@Entity()
export default class Batch extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @IsString()
  @Column('int')
  number: number

  @IsString()
  @Column('text')
  startDate: Date

  @IsString()
  @Column('text')
  endDate: Date


}
