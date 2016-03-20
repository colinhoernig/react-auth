const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');

// Setup app
app.use(morgan('combined')); // logging
app.use(bodyParser.json({ type: '*/*'})); // parse incoming requests to JSON
router(app);

// Setup server
const port = process.env.PORT || 3090;
const server = http.createServer(app);

server.listen(port);
console.log("Server listening on: " + port);
