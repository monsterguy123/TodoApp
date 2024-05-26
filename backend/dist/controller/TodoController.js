"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteATask = exports.UpdateATask = exports.GetASingleTask = exports.GetAllTask = exports.CreateTask = void 0;
const TodoModel_1 = __importDefault(require("../model/TodoModel"));
const redisClient_1 = __importDefault(require("../redisClient"));
const CreateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const TodoBody = req.body;
        // Error in request body
        if (!TodoBody.title || !TodoBody.description || !TodoBody.dueDate) {
            return res.status(400).json({ msg: "Error in the request body. Please send the data again." });
        }
        // Storing data in MongoDB
        const data = yield TodoModel_1.default.create(TodoBody);
        if (data) {
            // Invalidate the cache
            yield redisClient_1.default.del('todos');
            return res.status(201).json({ msg: "Task has been created successfully." });
        }
    }
    catch (error) {
        return res.status(500).json({ msg: error.message });
    }
});
exports.CreateTask = CreateTask;
const GetAllTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Check the cache
        const cachedData = yield redisClient_1.default.get('todos');
        if (cachedData) {
            return res.status(200).json({ data: JSON.parse(cachedData) });
        }
        // Fetch data from MongoDB
        const data = yield TodoModel_1.default.find({});
        // Store data in the cache
        yield redisClient_1.default.set('todos', JSON.stringify(data), 'EX', 3600);
        return res.status(200).json({ data });
    }
    catch (error) {
        console.error(error.message);
        return res.status(500).json({ msg: "An error occurred while fetching tasks." });
    }
});
exports.GetAllTask = GetAllTask;
const GetASingleTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        // Check the cache
        const cachedData = yield redisClient_1.default.get(`todo:${id}`);
        if (cachedData) {
            return res.status(200).json({ data: JSON.parse(cachedData) });
        }
        // Fetch data from MongoDB
        const data = yield TodoModel_1.default.findById(id);
        if (data) {
            // Store data in the cache
            yield redisClient_1.default.set(`todo:${id}`, JSON.stringify(data), 'EX', 3600); // Cache for 1 hour
        }
        return res.status(200).json({ data });
    }
    catch (error) {
        console.error(error.message);
        return res.status(500).json({ msg: "An error occurred while fetching the task." });
    }
});
exports.GetASingleTask = GetASingleTask;
const UpdateATask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updateTodo = req.body;
        const id = req.params.id;
        const updated = yield TodoModel_1.default.findByIdAndUpdate(id, updateTodo, { new: true });
        if (updated) {
            // Invalidate the cache
            yield redisClient_1.default.del('todos');
            yield redisClient_1.default.del(`todo:${id}`);
            return res.status(202).json({ msg: 'Todo is updated successfully.' });
        }
    }
    catch (error) {
        return res.status(500).json({ msg: error.message });
    }
});
exports.UpdateATask = UpdateATask;
const DeleteATask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const deleted = yield TodoModel_1.default.findByIdAndDelete(id);
        if (deleted) {
            // Invalidate the cache
            yield redisClient_1.default.del('todos');
            yield redisClient_1.default.del(`todo:${id}`);
            return res.status(201).json({ msg: "Todo deleted successfully." });
        }
    }
    catch (error) {
        return res.status(500).json({ msg: error.message });
    }
});
exports.DeleteATask = DeleteATask;
