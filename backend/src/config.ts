import express from 'express';
import cors from 'cors';
import config from 'config'

const PORT = config.get('port') || 80;;

const app = express();

app.use(cors());
app.use(express.json());

export { app, PORT };
