import mongoose from 'mongoose'

const TodoSchema = new mongoose.Schema({
    title:{type:String,required:true},
    description:{type:String,required:true},
    status:{type:String,default:"in-progress"},
    dueDate:{type:String , default:new Date()}
})

const TodoModel = mongoose.model("Todos",TodoSchema);

export default TodoModel;