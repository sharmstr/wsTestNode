let timer;
const path = require('path');

const envFile = process.env.ENV_FILE || './.env';
const envPath = path.resolve(envFile);

console.log('Looking for env file at:', envPath);
require('dotenv').config({ path: envPath });

const WebSocket = require('ws');

// Get server configuration from environment variables
const SERVER_HOST = process.env.SERVER_HOST;

console.log('ENV_FILE:', process.env.ENV_FILE);
console.log('SERVER_HOST from env:', process.env.SERVER_HOST);

const SERVER_URL = `ws://${SERVER_HOST}`;

console.log('Connecting to:', SERVER_URL);

const socket = new WebSocket(SERVER_URL);

socket.on('ping', () => {
  console.log('received ping from server');
});
socket.on('pong', () => {
  console.log('received pong from server');
});

socket.on('open', () => {
  console.log('connected to server');
  timer = setInterval(() => {
    //console.log("server tx'd ping. ");
    socket.ping();
  }, 2000);
});

