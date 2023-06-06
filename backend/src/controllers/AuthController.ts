import { Request, Response } from 'express';
import { pool } from '../database';
import { error } from '../utils/error';
import bcrypt from 'bcrypt';
import { RowDataPacket } from 'mysql2/promise';
import jwt from 'jsonwebtoken';
import config from 'config';
import { logger, logtime } from '../utils/logtime';
import { parseCookie } from '../utils/cookie';
import { Res } from '../types';
import { getToken } from '../utils';

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

			const [[user]] = await pool.execute<RowDataPacket[]>(
				`SELECT * from users WHERE login = ?`,
				[login],
			);

			if (!user) return res.status(401).json({ status: false, error: 'Пользователь не найден' });

			const isValid = bcrypt.compareSync(password, user.password);

			if (!isValid) return res.status(401).json({ status: false, error: 'Неверный пароль' });

			const [[employee]] = await pool.query<RowDataPacket[]>(`
			SELECT * from employee WHERE id='${user.id}'
		 `);

			const token = generateAccessToken(user.id, employee.role);
			// res.cookie('token', token, {maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true})
			res.cookie('token', token, { maxAge: 60 * 60 * 1000, httpOnly: true });
			return res.status(200).json({ status: true, data: { token, id: user.id } });
		} catch (e) {
			error(req, res, 500, e);
		}
	}

	async checkAuth(req: Request, res: Response) {
		try {
			const { token } = getToken(req);

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

	async generatePassword(req: Request, res: Response) {
		try {
			const { p, c } = req.query;
			const hash = bcrypt.hashSync(p as string, 7);
			const compare = c ? bcrypt.compareSync(p as string, c as string) : null;

			res.status(200).json({ hash, compare });
		} catch (error) {
			res.status(400).json({});
		}
	}
}

export default new AuthController();
