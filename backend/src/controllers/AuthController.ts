import { Request, Response } from 'express';
import { pool } from '../database';
import { error } from '../utils/error';
import bcrypt from 'bcryptjs';
import { RowDataPacket } from 'mysql2/promise';
import jwt from 'jsonwebtoken';
import config from 'config';
import { logtime } from '../utils/logtime';
import { parseCookie } from '../utils/cookie';
import { Res } from '../types';

export type AuthParams = {
	login: string;
	password: string;
};

export type AuthResponse = { token: string };

export const generateAccessToken = (id, roles) => {
	const payload = {
		id,
		roles,
	};

	return jwt.sign(payload, config.get('secret') || 'qazwsx', { expiresIn: '1d' });
};

class AuthController {
	async auth(req: Request, res: Response) {
		try {
			const { login, password }: AuthParams = req.body;

			logtime(req, req.body);

			const [[user]] = await pool.query<RowDataPacket[]>(`
					SELECT * from users WHERE login='${login}'
				`);

			if (!user) return res.status(401).json({ status: false, error: 'Пользователь не найден' });

			const isValid = bcrypt.compareSync(password, user.password);

			if (!isValid) return res.status(401).json({ status: false, error: 'Неверный пароль' });

			const [[employee]] = await pool.query<RowDataPacket[]>(`
			SELECT * from employee WHERE id='${user.id}'
		 `);

			const token = generateAccessToken(user.id, employee.role);
			// res.cookie('token', token, {maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true})
			res.cookie('token', token, { maxAge: 30 * 1000, httpOnly: true });
			return res.status(200).json({ status: true, data: { token, id: user.id } });
		} catch (e) {
			error(req, res, 500, e);
		}
	}

	async checkAuth(req: Request, res: Response) {
		try {
			const token =
				parseCookie(req.headers?.cookie)?.token || req.headers?.authorization?.split(' ')?.[1];

			if (!token) {
				return res.status(403).json({ status: false, error: 'Пользователь не авторизован' } as Res);
			}

			const decodeData = jwt.verify(token, config.get('secret')) as any;

			logtime(req, decodeData);

			req.body.user = decodeData;
			res.cookie('token', token, { maxAge: 30 * 1000, httpOnly: true });
			return res.status(200).json({ status: true, data: { id: decodeData?.id } });
		} catch (e) {
			error(req, res, 401, e);
		}
	}

	async logout(req: Request, res: Response) {
		try {
			const token =
				req.headers?.authorization?.split(' ')?.[1] || parseCookie(req.headers?.cookie)?.token;
			logtime(req, token);

			if (!token) {
				return res.status(403).json({ status: false, error: 'Пользователь не авторизован' } as Res);
			}

			const decodeData = jwt.verify(token, config.get('secret'), { maxAge: 0 });

			logtime(req, { decodeData });

			req.body.user = decodeData;
			res.cookie('token', '', { maxAge: 0, httpOnly: true });
			return res.status(200).json({ status: true });
		} catch (e) {
			error(req, res, 401, e);
		}
	}
}

export default new AuthController();
