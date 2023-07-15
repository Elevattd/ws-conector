import { Server } from 'socket.io';
import http from 'http';
import { sockets } from './socket/config';
import { app } from './app';

// const { API_PORT } = ENVIROMENTS;
const server = http.createServer(app);

const httpServer = server.listen(8888);
const io = new Server(httpServer, {
	// path: 'socket'

	transports: ['websocket'],
	cors: {
		origin: '*',
		methods: ['GET', 'POST', 'PUT', ' DELETE', 'OPTIONS'],
	},
});

sockets(io);
console.log(`WEB SOCKET LISTENING ON PORT ==>> ${8888}`);
