require("dotenv").config({ path: "./.env.local" });

const express = require("express");
const socket = require("socket.io");
const app = express();

const cookieParser = require('cookie-parser');

const host = process.env.HOSTNAME;
const port = process.env.PORT;

const server = app.listen(port, host, () => {
    console.log(`http://${host}:${port}`);
});

const io = socket(server);

app.use(express.static(__dirname));
app.use(cookieParser('secret key'))

//----------------------------------
//-------------route----------------
//----------------------------------


app.get("/", (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});

app.all("*", (req, res) => {
    res.status(404).send("404 error");
});

//----------------------------------
//-------------scripts--------------
//----------------------------------

const users = {};

io.on("connection", (socket) => {
    socket.on("new-user", (name) => {
        users[socket.id] = name;
        socket.broadcast.emit("user-connected", name);
    });

    socket.on("disconnect", () => {
        socket.broadcast.emit("user-disconnected", users[socket.id]);
        delete users[socket.id];
    });

    socket.on("send-chat-message", (message) => {
        socket.broadcast.emit("chat-message-users", message);
        socket.emit("chat-message-your", message);
    });
});
