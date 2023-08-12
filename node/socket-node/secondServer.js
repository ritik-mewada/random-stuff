const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Set up Socket.IO event listeners
io.on('connection', (socket) => {
  console.log('A client connected');

  socket.on('incomingFile', (data) => {
    console.log('Received file:', data);

    // Emit a 'fileLogged' event to confirm the logging process
    socket.emit('fileLogged');
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('A client disconnected');
  });
});

// Start the server
const port = 8000;
server.listen(port, () => {
  console.log(`Second server is running on port ${port}`);
});
