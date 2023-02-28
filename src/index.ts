import http from 'http';
import { app } from './app.js';

const PORT = process.env.PORT || 4500;

const server = http.createServer(app);

server.listen(PORT);

server.on('error', () => {
  console.log('hay un error');
});

server.on('listening', () => {
  console.log('Listening in http://localhost:' + PORT);
});
