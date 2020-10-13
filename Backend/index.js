const express = require('express');
const http = require('http');
const socket = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socket(server);

const chatRoutes = require('./Routes');
app.use('/chat', chatRoutes);

io.on('connection', (socket) => {
  console.log('We got a new user connected!');

  socket.on('text', ({ name, room }) => {
    console.log('name: and room', name, room);
    // callback();
  });

  socket.on('disconnect', () => {
    console.log('User has left');
  });
});

server.listen(process.env.PORT || 8080, () => {
  console.log('SERver is running on port: 8080');
});
