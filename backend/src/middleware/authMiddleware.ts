import { NextFunction, Request, Response } from 'express';
import { Res } from '../types';
import { logtime } from '../utils/logtime';
import jwt from 'jsonwebtoken';
import config from 'config';
import { parseCookie } from '../utils/cookie';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
	if (req.method === 'OPTIONS') next();

	try {
		const token =
			parseCookie(req.headers?.cookie)?.token || req.headers?.authorization?.split(' ')?.[1];

		if (!token) {
			return res.status(403).json({ status: false, error: 'Пользователь не авторизован' } as Res);
		}

		const decodeData = jwt.verify(token, config.get('secret'));
		req.body.user = decodeData;

		next();
	} catch (e) {
		logtime(req, e);
		res.status(403).json({ status: false, error: 'Пользователь не авторизован' } as Res);
	}
};
