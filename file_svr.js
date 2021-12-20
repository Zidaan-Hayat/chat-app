const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("static"));

app.get("/status", (_req, res) => {
	res.send({ status: true, msg: "Server is up and alive! :D"  });
});

module.exports = app;