import { JsonController, Get, Put, Post, Param, Body, NotFoundError, HttpCode } from 'routing-controllers'
import Batch from './entity'


@JsonController()
export default class BatchController {
  @Get('/batches/:id')
  getBatch(
    @Param('id') id: number
  ) {
    return Batch.findOneById(id)
    }

  @Get('/batches')
  async allBatches() {
    const batches = await Batch.find()
    return { batches }
  }

  @Post('/batches')
  @HttpCode(201)
  async createBatch(
    @Body() batch: Batch
  ) {
    const {password, ...rest} = user
    const entity = Batch.create(rest)
    await entity.setPassword(password)
    return entity.save()
  }
}
