import 'reflect-metadata'
import {createKoaServer} from "routing-controllers"
import LoginController from './logins/controller'
import UserController from './users/controller'
import BatchController from './batches/controller'
import EvaluationController from './evaluations/controller'
import StudentController from './students/controller'


const port = process.env.PORT || 4000

const app = createKoaServer({
   controllers: [
     LoginController,
     UserController,
     BatchController,
     EvaluationController,
     StudentController,
   ]
})

app.listen(port, () => console.log(`Listening on port ${port}`))
