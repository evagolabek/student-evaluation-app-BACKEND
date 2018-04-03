import { JsonController, Get, Post, Put, Delete, Param, Body, NotFoundError, BadRequestError, HttpCode } from 'routing-controllers'
import Student from './entity'
import Batch from '../batches/entity'


@JsonController()
export default class StudentController {
  @Get('/students/:id')
  getStudent(
    @Param('id') id: number
  ) {
    return Student.findOneById(id)
    }

  @Get('/students')
  async allStudents() {
    const students = await Student.find()
    return { students }
  }

  @Put('/students/:id')
  async updateStudent(
    @Param('id') id: number,
    @Body() update: Partial<Student>
  ) {
    const student = await Student.findOneById(id)
    if (!student) throw new NotFoundError('Cannot find student')

    return Student.merge(student, update).save()
  }

  @Post('/batches/:id/students')
  @HttpCode(201)
  async createStudent(
    @Param('id') batchId: number,
    @Body() student: Student
  ) {
    const batch = await Batch.findOneById(batchId)
    if (!batch) throw new BadRequestError(`Batch does not exist`)

    const entity = await Student.create({
      firstName: student.firstName,
      lastName: student.lastName,
      image: student.image,
      batch: batch
    }).save()

    return entity
  }

  @Delete('/students/:id')
  @HttpCode(200)
  async deleteStudent(
    @Param('id') id: number
  ) {
    const student = await Student.findOneById(id)
    if (!student) throw new NotFoundError('Cannot find student')

    await student.remove()

    return 'Student succesfully deleted'
    }

}
