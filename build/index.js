"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const http_1 = __importDefault(require("http"));
const app_1 = __importDefault(require("./app"));
const config_1 = require("./socket/config");
const server = http_1.default.createServer(app_1.default);
const httpServer = server.listen(4000);
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST', 'PUT', ' DELETE', 'OPTIONS'],
    },
});
(0, config_1.sockets)(io);
console.log(`LOAD SERVER  --> ON: ${4000}`);
