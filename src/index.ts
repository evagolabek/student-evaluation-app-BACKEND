import 'reflect-metadata'
import {createKoaServer} from "routing-controllers"
import LoginController from './logins/controller'
import UserController from './users/controller'
import BatchController from './batches/controller'
import EvaluationController from './evaluations/controller'
import StudentController from './students/controller'
import setupDb from './db'


const port = process.env.PORT || 4000

const app = createKoaServer({
   cors: true,
   controllers: [
     LoginController,
     UserController,
     BatchController,
     EvaluationController,
     StudentController,
   ]
})

setupDb()
  .then(_ =>
    // app.listen(4000, () => console.log('Listening on port 4000'))
    app.listen(port, () => console.log(`Listening on port ${port}`))
  )
  .catch(err => console.error(err))
