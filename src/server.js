import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import * as sapper from '@sapper/server';
import http from 'http';
import * as WebSocket from 'ws';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

const server = http.createServer();

const app = polka({ server }) // You can also use Express
	.use(
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		sapper.middleware()
	)
	.listen(PORT, err => {
		if (err) console.log('error', err);
    });

export default app.handler;

const wss = new WebSocket.Server({ server });
wss.on('connection', ws => {
	ws.on('message', msg => {
        wss.clients.forEach(client => client.send(msg));
	});
});

// const io = require('socket.io')(server);
// io.on('connection', function(socket) {
//     console.log(`connection ${socket.id}`);
// 	//let message = 'Server: A new user has joined the chat';
// 	//socket.emit('user joined', { message, numUsers });
// 	//socket.broadcast.emit('user joined', { message, numUsers });

// 	socket.on('chat-message', function(msg) {
// 	 	io.emit('chat-message', msg);
// 	});

// 	socket.on('disconnect', function() {
//         console.log(`disconnection ${socket.id}`);
// 		//socket.broadcast.emit('user left', numUsers);
// 	});

// 	// socket.on('user disconnect', function(name) {
// 	// 	socket.broadcast.emit('message', `Server: ${name} has left the chat.`)
// 	// })
// });