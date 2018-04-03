import { JsonController, Get, Put, Post, Param, Body, NotFoundError, HttpCode } from 'routing-controllers'
import Evaluation from './entity'


@JsonController()
export default class EvaluationController {
  @Get('/evaluations/:id')
  getEvaluation(
    @Param('id') id: number
  ) {
    return Evaluation.findOneById(id)
    }

  @Get('/evaluations')
  async allEvaluations() {
    const evaluations = await Evaluation.find()
    return { evaluations }
  }

  @Put('/evaluations/:id')
  async updateEvaluation(
    @Param('id') id: number,
    @Body() update: Partial<Evaluation>
  ) {
    const evaluation = await Evaluation.findOneById(id)
    if (!evaluation) throw new NotFoundError('Cannot find evaluation')

    return Evaluation.merge(evaluation, update).save()
  }

}
