// HTTP server so we can utilise both WS and express
// on the same port
const server = require("http").createServer();
const { WebSocketServer } = require("ws");

const wss = new WebSocketServer({ server });

server.on('request', require('./file_svr'));

wss.on('connection', (ws) => {
	console.log(`New user connected! [${ws._socket.remoteAddress}]`);

	ws.on('message', (data) => {
		const cleanData = JSON.parse(data.toString());
		console.log(`New message received ${cleanData.author}: "${cleanData.content}"`);

		wss.clients.forEach(conn => {
			conn.send(JSON.stringify(cleanData));
		});
	});
});

const PORT = 8080;

server.listen(PORT, () => console.log(`http://localhost:${PORT}`));