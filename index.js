const colors = require("colors");
const server = require("http").createServer();
const { WebSocketServer } = require("ws");

const wss = new WebSocketServer({ server });
const connections = new Set();

server.on('request', require('./file_svr'));

function getSign(sign) {
	return ("[".green.bold + `${sign}`.yellow.bold + "]".green.bold);
}

wss.on('connection', (ws) => {
	connections.add(ws);
	console.log(`${getSign("+")} New user connected! [${ws._socket.remoteAddress}]`);

	ws.on('message', (data) => {
		const cleanData = JSON.parse(data.toString());
		console.log(`${getSign("+")} New message received ${cleanData.author}: "${cleanData.content}"`);

		connections.forEach(conn => {
			conn.send(JSON.stringify(cleanData));
		});
	});
});

wss.on("close", (ws) => {
	connections.delete(ws);
});

const PORT = 8080;

server.listen(PORT, () => console.log(`http://localhost:${PORT}`));
