const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origin: 'http://mobileapp-test.informistmedia.com:4001',
    methods: ['GET', 'POST']
  }
});
const chokidar = require('chokidar');
const path = require('path');
const ioClient = require('socket.io-client');
const xml2js = require('xml2js');

const folderPath = path.join(__dirname, 'public/story');

// Start the server
http.listen(4001, () => {
  console.log(`Server is running on port 4001`);

});

//socket connection
io.on('connection', (socket) => {
  console.log('Client Connected.');

  socket.on('custom_event', (data) => {
    console.log(data);
  })

  const watcher = chokidar.watch(folderPath, {
    ignoreInitial: true, // Ignore initial files/folders
  });

  // Listen for file addition or creation events
  watcher.on('add', (filePath) => {
    console.log(`File added: ${filePath}`);

    // Emit a socket event to notify the client
    socket.emit('fileAdded', { filePath });

    socket.emit('incomingFile', { filePath });

    socket.on('fileLogged', () => {
      console.log('File logged on the second server:', filePath);
      socket.disconnect();
    });

  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('A client disconnected');
    watcher.close(); // Stop watching for file changes
  });
})


// // Connect to the server client
// const socket = ioClient('http://mobileapp-test.informistmedia.com:4001'); 
// socket.on('connect', () => {
//   console.log('Connected to server');
// });
// socket.on('disconnect', () => {
//   console.log('Disconnected from server');
// });

// socket.emit('custom_event', { message: 'Hello from client' });
