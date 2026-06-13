const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('Пользователь подключился:', socket.id);

    // Получаем фейковый донат от друга и пересылаем всем (в OBS)
    socket.on('send_donation', (data) => {
        io.emit('new_donation', data);
    });

    socket.on('disconnect', () => {
        console.log('Пользователь отключился:', socket.id);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});