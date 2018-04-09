import { JsonController, Get, Post, Put, Delete, Param, Body, NotFoundError, BadRequestError, HttpCode } from 'routing-controllers'
import Student from './entity'
import Batch from '../batches/entity'
import { getConnection } from "typeorm"


@JsonController()
export default class StudentController {

  @Get('/students/:id')
  async getStudent(
    @Param('id') id: number
  ) {
    const student = await Student.findOneById(id)
    if (!student) throw new NotFoundError('Cannot find student')

    return student
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
      lastColour: student.lastColour,
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


    @Get('/batches/:id/randomStudent')
    async getRandomStudent(
      @Param('id') batchId: number
    ) {
      const allStudents = await Student.find()
      const students = allStudents.filter(student => student.batchId === batchId)

      const randomNumber = Math.random()
      console.log(randomNumber)
      if (randomNumber < 0.53) {
        //red or no evaluation ( = not yellow and not green)
        const redStudents = students.filter(student => (student.lastColour !== 'yellow' && student.lastColour !== 'green'))
        const randomStudent = redStudents[Math.floor( Math.random()*redStudents.length )] //  to find the student index
        return randomStudent
      }
      else if (randomNumber >= 0.53 && randomNumber < 0.81) {
        //yellow
        const yellowStudents = students.filter(student => student.lastColour === 'yellow')
        const randomStudent = yellowStudents[Math.floor( Math.random()*yellowStudents.length )]
        return randomStudent
      }
      else {
        //green
        const greenStudents = students.filter(student => student.lastColour === 'green')
        const randomStudent = greenStudents[Math.floor( Math.random()*greenStudents.length )]
        return randomStudent
      }
    }
}
