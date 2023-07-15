"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const http_1 = __importDefault(require("http"));
const config_1 = require("./socket/config");
// const { API_PORT } = ENVIROMENTS;
const server = http_1.default.createServer();
const httpServer = server.listen(8888);
const io = new socket_io_1.Server(httpServer, {
    // path: 'socket'
    transports: ['websocket'],
    cors: {
        origin: '*',
        methods: ['GET', 'POST', 'PUT', ' DELETE', 'OPTIONS'],
    },
});
(0, config_1.sockets)(io);
console.log(`WEB SOCKET LISTENING ON PORT ==>> ${8888}`);
