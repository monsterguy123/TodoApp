"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const TodoSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, default: "in-progress" },
    dueDate: { type: String, default: new Date() }
});
const TodoModel = mongoose_1.default.model("Todos", TodoSchema);
exports.default = TodoModel;
