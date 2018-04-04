import { JsonController, Get, Post, Param, Body, HttpCode, NotFoundError, BadRequestError } from 'routing-controllers'
import Evaluation from './entity'
import Student from '../students/entity'
import User from '../users/entity'


@JsonController()
export default class EvaluationController {

  @Get('/evaluations/:id')
  getBatch(
    @Param('id') id: number
  ) {
    return Evaluation.findOneById(id)
    }

  @Get('/evaluations')
  async allEvaluations() {
    const evaluations = await Evaluation.find()
    return { evaluations }
  }

  @Post('/students/:id1/users/:id2/evaluations')
  @HttpCode(201)
  async createEvaluation(
    @Param('id1') studentId: number,
    @Param('id2') userId: number,
    @Body() evaluation: Evaluation
  ) {
    const student = await Student.findOneById(studentId)
    if (!student) throw new NotFoundError('Cannot find student')

    const user = await User.findOneById(userId)
    if (!user) throw new NotFoundError('Cannot find user')

    if (evaluation.colour !== 'red' && evaluation.colour !== 'yellow'
    && evaluation.colour !== 'green') throw new BadRequestError
    ('Colour must be either red, green or yelllow')

    const entity = await Evaluation.create({
      date: evaluation.date,
      colour: evaluation.colour,
      remarks: evaluation.remarks,
      student: student,
      user: user
    }).save()

    return entity
  }
}
