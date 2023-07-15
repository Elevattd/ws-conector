"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sockets = void 0;
const clients = {
    client1: {
        placa1: { type: 'humedad', sensor: 'esp32', relay: 'esp32' },
        placa2: { type: 'humedad', sensor: 'esp32' },
    },
    client2: {
        placa3: { type: 'temperatura', sensor: 'esp32', humedad: 'esp32', relay: 'esp32' },
    },
    // ...
};
const findClientIdByPlacaId = (placaId) => {
    for (const clientId in clients) {
        const placas = clients[clientId];
        for (const placaKey in placas) {
            if (placaKey === placaId) {
                return clientId;
            }
        }
    }
    return null; // Si no se encuentra la placa, devolver null
};
const clientsConnected = [];
const sockets = (io) => {
    console.log('🚀 👍 ~ sockets ~ io:', io);
    // console.log('🚀 👍 ~ sockets ~ client:', client);
    try {
        // client.use((socket: any, next: any) => {
        // 	console.log('PASO TRANQUILO NOMAS');
        // 	const refreshToken = socket.handshake.headers['refresh-token'];
        // 	const apiKey = socket.handshake.headers['x-api-key'];
        // 	return !refreshToken && !apiKey ? new Error('NO SE PUDO REY') : next();
        // });
        io.on('connect', (socket) => {
            // console.log("🚀 👍 ~ client.on ~ socket:", socket)
            clientsConnected.push(io);
            // console.log('🚀 👍 ~ client.on ~ clientsConnected:', clientsConnected);
            console.log('SOCKET.IO --> CONNECTED:', socket.client.id);
            // Manejar la desconexión del cliente
            socket.on('disconnect', () => {
                console.log('SOCKET.IO --> DISCONNECTED:', socket.client.id);
            });
            // Manejar los mensajes que recibe el servidor
            socket.on('message-from-esp32', (data) => {
                // const { type, data: messageData } = data;
                console.log('🚀 👍 ~ socket.on ~ data:', data);
                const clientId = findClientIdByPlacaId(data.placaId); // Buscar el ID del cliente asociado a la placa
                io.to(clientId).emit('message-to-client', data); // Emitir la respuesta solo al cliente correspondiente
            });
            // Manejar errores
            socket.on('error', (error) => {
                console.error('SOCKET.IO --> ERROR:', error);
            });
        });
    }
    catch (error) {
        throw error;
    }
};
exports.sockets = sockets;
