import express from 'express';

const port: number = process.env.PORT || 5000;

const app = express();

app.listen(port);