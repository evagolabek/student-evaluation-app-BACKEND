import { JsonController, Get, Post, Param, Body, HttpCode } from 'routing-controllers'
import { getConnection } from "typeorm"
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

  // https://github.com/typeorm/typeorm/blob/master/docs/select-query-builder.md
  // see Joining relations
    @Get('/batches/:id/students')
    async getBatchStudents(
      @Param('id') batchId: number
    ) {
      const batchStudents = await getConnection()
        .createQueryBuilder()
        .select()
        .from(Batch, "batch")
        .leftJoinAndSelect("batch.students", "student")
        .where("batch.id = :id", { id: batchId})
        .getOne()

      return {batchStudents}
    }
}
