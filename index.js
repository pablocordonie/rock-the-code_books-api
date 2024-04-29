require('dotenv').config();
const PORT = 8000;
const LOCALHOST = `http://localhost:${PORT}`;

const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const { connectDB } = require('./src/config/db');
connectDB();

const pong = (req, res, next) => res.status(200).json('Pong!');
app.use('/ping', pong);

const mainRouter = require('./src/api/routes/router');
app.use('/api/v1', mainRouter);

app.use('*', (req, res, next) => res.status(404).json('Route not found'));

app.listen(PORT, () => {
    console.log(`Listening on: ${LOCALHOST}`);
});