import { router } from './router.js';
import express from 'express';
import cors from 'cors';
import config from 'config';

const PORT = config.get('port') || 80;

const app = express();

const corsOptions = {
  credentials: true,
  origin: '*'
}

app.use(cors(corsOptions));
app.use(express.json());

app.use('/api', router);

try {
  app.listen(PORT, () => console.log('SERVER STARTED ON PORT ' + PORT));
} catch (error) {
  console.log('SERVER ERROR ON PORT:', PORT);
  
}

export { app, PORT };
