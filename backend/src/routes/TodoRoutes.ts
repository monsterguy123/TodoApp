import {Router} from 'express'
import { CreateTask, DeleteATask, GetASingleTask, GetAllTask, UpdateATask } from '../controller/TodoController';
const TodoRouter = Router();

TodoRouter.post('/createTask',CreateTask)
TodoRouter.get('/getallTask',GetAllTask)
TodoRouter.get('/singleTask/:id',GetASingleTask)
TodoRouter.put('/updateTask/:id',UpdateATask)
TodoRouter.delete('/deleteTask/:id',DeleteATask)

export default TodoRouter;