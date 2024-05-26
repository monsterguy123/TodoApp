import express from 'express'
import cors from 'cors'
import TodoRouter from './routes/TodoRoutes';
import {config} from 'dotenv'
import DB from './db';
const app = express();
config()


app.use(express.json());
app.use(cors());

//DB
DB();

//route
app.use('/api/v1',TodoRouter)

app.listen(8080,()=>{
    console.log('server is live on port 8080....');
})