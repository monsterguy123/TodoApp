"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ioredis_1 = require("ioredis");
const Client = new ioredis_1.Redis();
exports.default = Client;
