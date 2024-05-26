import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

interface Todo {
    title: string;
    description: string;
    status: string;
    dueDate: string;
    _id: string;
}

const AllTask: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const updateTaskStatus = async (id: string, status: string) => {
        try {
            const url = `http://localhost:8080/api/v1/updateTask/${id}`;
            const res = await axios.put(url, { status });

            if (res.status === 202) {
                setTodos((prevTodos) =>
                    prevTodos.map((todo) =>
                        todo._id === id ? { ...todo, status } : todo
                    )
                );
            } else {
                setError('Failed to update task');
            }
        } catch (error) {
            setError('Failed to update task');
        }
    };

    const deleteTask = async (id: string) => {
        try {
            const url = `http://localhost:8080/api/v1/deleteTask/${id}`;
            const res = await axios.delete(url);
            if (res.status === 201) {
                alert(res.data.msg);
                setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
            } else {
                setError('Failed to delete task');
            }
        } catch (error) {
            setError('Failed to delete task');
        }
    };

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const url = "http://localhost:8080/api/v1/getallTask";
                const res = await axios.get(url);

                if (res.status === 200) {
                    const tasks = res.data.data;
                    const currentDate = new Date();

                    const updatedTasks = tasks.map((task: Todo) => {
                        if (new Date(task.dueDate) < currentDate && task.status !== 'completed') {
                            updateTaskStatus(task._id, 'pending');
                            return { ...task, status: 'pending' };
                        }
                        return task;
                    });

                    setTodos(updatedTasks);
                } else {
                    setError('Failed to fetch tasks');
                }
            } catch (error) {
                setError('Failed to fetch tasks');
            } finally {
                setLoading(false);
            }
        };

        fetchTasks();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return (
            <div>
                <div>{error}</div>
                <button onClick={() => window.location.reload()} className="bg-red-500 text-white rounded-md px-4 py-2 hover:bg-red-600">
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className="container mx-auto mt-10">
            {todos.length === 0 ? (
                <div className="text-center text-gray-500">No tasks available</div>
            ) : (
                todos.map((item) => (
                    <div key={item._id} className='bg-white p-8 text-center rounded-xl shadow-2xl w-full max-w-md mx-auto mt-10 relative'>
                        <div className="absolute top-0 right-0 m-4 cursor-pointer" onClick={() => deleteTask(item._id)}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="absolute top-0 right-8 m-4 cursor-pointer">
                            <Link to={`/updateTask/${item._id}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                    <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                                    <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                                </svg>
                            </Link>
                        </div>
                        <Link to={`/task/${item._id}`}>
                            <div className="mb-4 text-xl font-bold">{item.title}</div>
                            <div className="mb-4 text-gray-500">{item.status}</div>
                            <div className="mb-4 text-gray-500">{item.dueDate}</div>
                        </Link>
                        <div>
                            <button
                                onClick={() => updateTaskStatus(item._id, 'completed')}
                                className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600"
                                disabled={item.status === "completed"}
                            >
                                {item.status === "completed" ? "Already Completed" : "Mark Done"}
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default AllTask;
