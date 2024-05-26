import { Request, Response } from "express";
import TodoModel from "../model/TodoModel";
import redisClient from '../redisClient';

interface Todo {
    title: string;
    description: string;
    dueDate: string;
}

export const CreateTask = async (req: Request, res: Response) => {
    try {
        const TodoBody: Todo = req.body;

        // Error in request body
        if (!TodoBody.title || !TodoBody.description || !TodoBody.dueDate ) {
            return res.status(400).json({ msg: "Error in the request body. Please send the data again." });
        }

        // Storing data in MongoDB
        const data = await TodoModel.create(TodoBody);

        if (data) {
            // Invalidate the cache
            await redisClient.del('todos');
            return res.status(201).json({ msg: "Task has been created successfully." });
        }

    } catch (error: any) {
        return res.status(500).json({ msg: error.message });
    }
};

export const GetAllTask = async (req: Request, res: Response) => {
    try {
        // Check the cache
        const cachedData = await redisClient.get('todos');
        if (cachedData) {
            return res.status(200).json({ data: JSON.parse(cachedData) });
        }

        // Fetch data from MongoDB
        const data = await TodoModel.find({});

        // Store data in the cache
        await redisClient.set('todos', JSON.stringify(data), 'EX', 3600); 

        return res.status(200).json({ data });
    } catch (error: any) {
        console.error(error.message);
        return res.status(500).json({ msg: "An error occurred while fetching tasks." });
    }
};

export const GetASingleTask = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        // Check the cache
        const cachedData = await redisClient.get(`todo:${id}`);
        if (cachedData) {
            return res.status(200).json({ data: JSON.parse(cachedData) });
        }

        // Fetch data from MongoDB
        const data = await TodoModel.findById(id);

        if (data) {
            // Store data in the cache
            await redisClient.set(`todo:${id}`, JSON.stringify(data), 'EX', 3600); // Cache for 1 hour
        }

        return res.status(200).json({ data });
    } catch (error: any) {
        console.error(error.message);
        return res.status(500).json({ msg: "An error occurred while fetching the task." });
    }
};

export const UpdateATask = async (req: Request, res: Response) => {
    try {
        const updateTodo = req.body;
        const id = req.params.id;

        const updated = await TodoModel.findByIdAndUpdate(id, updateTodo, { new: true });

        if (updated) {
            // Invalidate the cache
            await redisClient.del('todos');
            await redisClient.del(`todo:${id}`);
            return res.status(202).json({ msg: 'Todo is updated successfully.' });
        }

    } catch (error: any) {
        return res.status(500).json({ msg: error.message });
    }
};

export const DeleteATask = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        const deleted = await TodoModel.findByIdAndDelete(id);

        if (deleted) {
            // Invalidate the cache
            await redisClient.del('todos');
            await redisClient.del(`todo:${id}`);
            return res.status(201).json({ msg: "Todo deleted successfully." });
        }

    } catch (error: any) {
        return res.status(500).json({ msg: error.message });
    }
};
