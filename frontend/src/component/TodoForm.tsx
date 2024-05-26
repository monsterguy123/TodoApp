import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

const TodoForm = ()=>{

    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [dueDate, setDueDate] = useState<string>("");

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        const newTask = {
            title,
            description,
            dueDate,
        };
        
        const url = 'http://localhost:8080/api/v1/createTask';
        const res = await axios.post(url, newTask);

        if(res.status === 201){
            console.log(res);
            alert(res.data.msg);
            setTitle('');
            setDescription('');
            setDueDate('');
        }
    };


    return(
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r bg-white">
            <Navbar/>
            <form className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-lg transform transition-transform duration-500 hover:scale-105" onSubmit={handleSubmit}>
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Create a New Task</h2>
                <div className="mb-6">
                    <label className="block text-gray-700 font-bold mb-2">Title</label>
                    <input
                        type='text'
                        placeholder="Title..."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 font-bold mb-2">Description</label>
                    <input
                        type='text'
                        placeholder="Description..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 font-bold mb-2">Due Date</label>
                    <input
                        type='date'
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    />
                </div>
                <button type="submit" className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600">
                    Add Task
                </button>
            </form>
        </div>
     )
}

export default TodoForm