import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface Todo {
    title: string;
    description: string;
    status: string;
    dueDate: string;
    _id: string;
}

const ViewTodo: React.FC = () => {
    const [todo, setTodo] = useState<Todo | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const { id } = useParams<{ id: string }>();

    const updateTaskStatus = async (id: string, status: string) => {
        try {
            const url = `http://localhost:8080/api/v1/updateTask/${id}`;
            const res = await axios.put(url, { status });

            if (res.status === 202) {
                setTodo(prevTodo => prevTodo ? { ...prevTodo, status } : null);
            } else {
                setError('Failed to update task status');
            }
        } catch (error) {
            setError('Failed to update task status');
        }
    };

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const url = `http://localhost:8080/api/v1/singleTask/${id}`;
                const res = await axios.get(url);

                if (res.status === 200) {
                    const task = res.data.data;
                    const currentDate = new Date();
                    
                    if (new Date(task.dueDate) < currentDate && task.status !== 'completed') {
                        updateTaskStatus(task._id, 'pending');
                        task.status = 'pending'; 
                    }

                    setTodo(task);
                } else {
                    setError('Failed to fetch task');
                }
            } catch (error) {
                setError('Failed to fetch task');
            } finally {
                setLoading(false);
            }
        };

        fetchTask();
    }, [id]);

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
            {!todo ? (
                <div className="text-center text-gray-500">No task available</div>
            ) : (
                <div key={todo._id} className='bg-white p-8 mt-40 text-center rounded-xl shadow-2xl w-full max-w-md mx-auto relative'>
                    <div className="mb-4 text-xl font-bold">{todo.title}</div>
                    <div className="mb-4 text-gray-500">{todo.description}</div>
                    <div className="mb-4 text-gray-500">{todo.status}</div>
                    <div className="mb-4 text-gray-500">{todo.dueDate}</div>
                </div>
            )}
        </div>
    );
};

export default ViewTodo;
