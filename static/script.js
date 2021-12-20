const socket = new WebSocket(window.location.href.replace("http", "ws"));

function makeWarning(text) {
	const warning = document.getElementById("warning-text");
	warning.innerText = text;

	const warningBox = document.getElementById("warning-box");
	warningBox.className = "";
}

function clearWarning() {
	const warningBox = document.getElementById("warning-box");
	warningBox.className = "hidden";
}

socket.onmessage = (e) => {
	const data = JSON.parse(e.data);
	
	const msgCard = document.createElement("div");
	msgCard.className = "msg-card";
	msgCard.innerHTML = `<span class="msg-author">${data.author}</span>: ${data.content}`;

	const msgTable = document.getElementById("msg-table");
	msgTable.appendChild(msgCard);
};

document.getElementById("send-btn").addEventListener("click", () => {
	const username = document.getElementById("username-input").value;

	if (!username || username.trim() === "") {
		makeWarning("Missing username");
		return;
	}

	const contentInput = document.getElementById("send-ctnt");

	if (!contentInput.value || contentInput.value.trim() === "") {
		makeWarning("Empty message");
		return;
	}

	socket.send(JSON.stringify({ author: username, content: contentInput.value }));
	contentInput.value = "";
});

document.getElementById("send-ctnt").addEventListener("keyup", e => {
	if (e.keyCode === 13) {
		e.preventDefault();
		document.getElementById("send-btn").click();
	}
});
