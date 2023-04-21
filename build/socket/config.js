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
const sockets = (io) => {
    io.on('connection', (socket) => {
        console.log('SOCKET.IO --> CONNECTED:', socket.client.id);
        // Manejar la desconexión del cliente
        socket.on('disconnect', () => {
            console.log('SOCKET.IO --> DISCONNECTED:', socket.client.id);
        });
        // Manejar los mensajes que recibe el servidor
        socket.on('message-from-esp32', (data) => {
            const clientId = findClientIdByPlacaId(data.placaId); // Buscar el ID del cliente asociado a la placa
            io.to(clientId).emit('message-to-client', data); // Emitir la respuesta solo al cliente correspondiente
        });
        // Manejar errores
        socket.on('error', (error) => {
            console.error('SOCKET.IO --> ERROR:', error);
        });
    });
};
exports.sockets = sockets;
