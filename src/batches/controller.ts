import { JsonController, Get, Post, Param, Body, HttpCode } from 'routing-controllers'
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
  createBatch(
    @Body() batch: Batch
  ) {
    return batch.save()
  }
}
