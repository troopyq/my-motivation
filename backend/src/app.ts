import { router } from './router.js';
import express from 'express';
import cors from 'cors';
import config from 'config';

const PORT = config.get('port') || 80;

const app = express();

const corsOptions = {
  credentials: true,
  origin: 'http://localhost:3002'
}

app.use(cors(corsOptions));
app.use(express.json());

app.use('/api', router);

app.listen(PORT, () => console.log('SERVER STARTED ON PORT ' + PORT));

export { app, PORT };
