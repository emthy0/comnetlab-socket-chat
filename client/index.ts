import express from 'express';
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { Server } from 'socket.io';
import { ChatMessage } from '../types/chat';
const app = express();
const server = createServer(app);
const io = new Server(server);

const __dirname = dirname(fileURLToPath(import.meta.url));

app.get('/', (req, res) => {
  res.send('Hello World');
});


const userDatabase: { [userId: string]: string[] } = {}
const groupChatDatabase: { [chatId: string]: ChatMessage[] } = {};
const privateChatDatabase: { [chatId: string]: ChatMessage[] } = {};

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('listGroup', (msg) => {
    console.log('listGroup', msg);
    socket.emit('listGroup', Object.keys(groupChatDatabase));
  })

  socket.on('joinGroup', (msg) => {
    console.log('joinGroup', msg);
    socket.join(msg);
  });


  socket.on('chatMessageGroup', (msg) => {
    console.log('chatMessageGroup', msg);
    const chatId = msg.chatId;
    if (!groupChatDatabase[chatId]) {
      groupChatDatabase[chatId] = [];
    }
    groupChatDatabase[chatId].push({
      userId: msg.userId,
      message: msg.message,
      timestamp: Date.now(),
    });
    io.to(chatId).emit('chatMessageGroup', msg);
  })

  socket.on('chatMessagePrivate', (msg) => {

  })
});

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});