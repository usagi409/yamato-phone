const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, { cors: { origin: "*" } });

io.on('connection', (socket) => {
    // 全員同じ部屋に入れる（シンプル化）
    socket.join('main-room');
    
    // 信号の中継（Offer, Answer, ICE Candidate）
    socket.on('signal', (data) => {
        socket.to('main-room').emit('signal', data);
    });
});

server.listen(process.env.PORT || 3000);
