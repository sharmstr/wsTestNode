require('dotenv').config();
const WebSocket = require('ws');
let timer;

const PORT = process.env.SERVER_PORT || 8080;

console.log('Environment variable SERVER_PORT:', process.env.SERVER_PORT);
console.log('Using port:', PORT);

const server = new WebSocket.Server({
  port: PORT
});
console.log(`Server is running on port ${PORT}`);

server.on('connection', function(socket) {
  timer = setInterval(() => {
    //console.log("server tx'd ping. ");
    socket.ping();
  }, 5000);
  socket.on('error', console.error);
  socket.on('close', function() {
    console.log('disconnected');
  });
  socket.on('pong', function() {
    console.log('received pong from client');
  });
  socket.on('ping', function() {
    console.log('received ping from client');
  });
  
});
