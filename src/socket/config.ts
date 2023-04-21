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

export const sockets = (client: any) => {
	// console.log('🚀 👍 ~ sockets ~ client:', client);
	try {
		client.use((socket: any, next: any) => {
			console.log('PASO TRANQUILO NOMAS');
			const refreshToken = socket.handshake.headers['refresh-token'];
			const apiKey = socket.handshake.headers['x-api-key'];
			return !refreshToken && !apiKey ? new Error('NO SE PUDO REY') : next();
		});

		client.on('connection', (socket: any) => {
			clientsConnected.push(client);
			console.log('SOCKET.IO --> CONNECTED:', socket.client.id);

			// Manejar la desconexión del cliente
			socket.on('disconnect', () => {
				console.log('SOCKET.IO --> DISCONNECTED:', socket.client.id);
			});

			// Manejar los mensajes que recibe el servidor
			socket.on('message-from-esp32', (data: any) => {
				const clientId = findClientIdByPlacaId(data.placaId); // Buscar el ID del cliente asociado a la placa
				client.to(clientId).emit('message-to-client', data); // Emitir la respuesta solo al cliente correspondiente
			});

			// Manejar errores
			socket.on('error', (error: any) => {
				console.error('SOCKET.IO --> ERROR:', error);
			});
		});
	} catch (error) {
		throw error;
	}
};
