import { JsonController, Get, Put, Post, Param, Body, NotFoundError, HttpCode } from 'routing-controllers'
import Student from './entity'


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

  @Post('/students')
  @HttpCode(201)
  async createStudent(
    @Body() student: Student
  ) {
    const {password, ...rest} = user
    const entity = Student.create(rest)
    await entity.setPassword(password)
    return entity.save()
  }
  
}
