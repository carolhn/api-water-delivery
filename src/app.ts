import cors from 'cors';
import express from 'express';
import { handleErrors, notFound } from './middlewares/handleErrors';
import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);

app.use(notFound);
app.use(handleErrors);

export default app;
