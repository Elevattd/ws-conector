import { Server } from 'socket.io';
import http from 'http';
import { sockets } from './socket/config';

const server = http.createServer();

const httpServer = server.listen(3000);
const io = new Server(httpServer, {
	// path: 'socket'
	cors: {
		origin: '*',
		methods: ['GET', 'POST', 'PUT', ' DELETE', 'OPTIONS'],
	},
});

sockets(io);
// console.log('🚀 👍 ~ io:', io);

console.log(`LOAD SERVER  --> ON: ${3000}`);
