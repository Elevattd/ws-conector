import { Server, Socket } from 'socket.io';

const clients: any = {
	client1: {
		placa1: { type: 'humedad', sensor: 'esp32', relay: 'esp32' },
		placa2: { type: 'humedad', sensor: 'esp32' },
	},
	client2: {
		placa3: { type: 'temperatura', sensor: 'esp32', humedad: 'esp32', relay: 'esp32' },
	},
	// ...
};

const findClientIdByPlacaId = (placaId: string) => {
	for (const clientId in clients) {
		const placas = clients[clientId as string];
		for (const placaKey in placas) {
			if (placaKey === placaId) {
				return clientId;
			}
		}
	}
	return null; // Si no se encuentra la placa, devolver null
};

const clientsConnected: Array<any> = [];

export const sockets = (io: Server) => {
	io.on('connection', (socket: Socket) => {
		console.log('SOCKET.IO --> CONNECTED:', socket.id);

		// Manejar la desconexión del cliente
		socket.on('disconnect', () => {
			console.log('SOCKET.IO --> DISCONNECTED:', socket.id);
		});

		// Manejar el evento "hum_temp"
		socket.on('hum_temp', (data: any) => {
			// Realiza cualquier lógica adicional que desees con los datos recibidos
			socket.emit('hum_temp_client', JSON.parse(data));
			// socket.
			// console.log('Evento "hum_temp" recibido:', JSON.parse(data));
		});

		// Manejar el evento "event"
		socket.on('event', (data: any) => {
			console.log('Evento "event" recibido:', data);
			// Realiza cualquier lógica adicional que desees con los datos recibidos
		});

		socket.on('error', (error: any) => {
			console.error('SOCKET.IO --> ERROR:', error);
		});
	});
};
