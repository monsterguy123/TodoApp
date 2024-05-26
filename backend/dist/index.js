"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const TodoRoutes_1 = __importDefault(require("./routes/TodoRoutes"));
const dotenv_1 = require("dotenv");
const db_1 = __importDefault(require("./db"));
const app = (0, express_1.default)();
(0, dotenv_1.config)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
//DB
(0, db_1.default)();
//route
app.use('/api/v1', TodoRoutes_1.default);
app.listen(8080, () => {
    console.log('server is live on port 8080....');
});
