import express from 'express';
import { GetController } from './controllers/index';

const router = express.Router();

router.use(function timeLog(req, res, next) {
	console.log('Time: ', Date.now());
	next();
});

router.get('/employees', GetController.employees);

export { router };
