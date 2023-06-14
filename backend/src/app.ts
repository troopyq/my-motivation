import { router } from './router.js';
import express from 'express';
import cors from 'cors';
import config from 'config';
import path from 'path';

const PORT = config.get('port') || 80;

const app = express();

const corsOptions = {
  credentials: true,
  origin: '*'
}

app.use(cors(corsOptions));
app.use(express.json());

app.use('/api', router);

if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.resolve(__dirname, '..', 'frontend', 'dist')));
	app.get('*', (req, res) => {
		res.sendFile(path.join(__dirname, '..', 'frontend', 'dist', 'index.html'));
	});
}

try {
  app.listen(PORT, () => console.log('SERVER STARTED ON PORT ' + PORT));
} catch (error) {
  console.log('SERVER ERROR ON PORT:', PORT);
  
}

export { app, PORT };
