const express = require('express');
const WebSocket = require('ws');
const http = require('http');
const tickets = require('./tickets.json');
const cors = require('cors');

const app = express();

app.use(cors());

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const data = tickets;

wss.on('connection', (ws) => {
    console.log('Client connected');

    ws.send(JSON.stringify(data));

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

app.get('/tickets', (req, res) => {
    res.json(data);
});

server.listen(8080, () => {
    console.log('Server is listening on port 8080');
});
