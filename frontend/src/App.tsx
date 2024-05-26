import { BrowserRouter , Routes ,Route } from "react-router-dom"
import Home from "./component/Home"
import TodoForm from "./component/TodoForm"
import UpdateTodo from "./component/UpdateTask"
import ViewTodo from "./component/ViewTask"

function App() {

  return (
    <BrowserRouter>
       <Routes>
         <Route path="/" element={<Home/>}/>
         <Route path="/createtask" element={<TodoForm/>}/>
         <Route path="/task/:id" element={<ViewTodo/>}/>
         <Route path="/updateTask/:id" element={<UpdateTodo/>} />
       </Routes>
    </BrowserRouter>
  )
}

export default App
