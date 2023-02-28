import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { fruitsRouter } from './router/fruits.router.js';
export const app = express();
app.disable('x-powered-by');

const corsOptions = {
  origin: '*',
};
app.use(morgan('dev'));
app.use(express.json());
app.use(cors(corsOptions));

app.use((_req, _resp, next) => {
  next();
});

app.use('/fruits', fruitsRouter);

app.get('/', (_req, resp) => {
  resp.send('Initial');
});
