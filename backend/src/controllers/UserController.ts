import { Request, Response } from 'express';
import { pool } from '../database';
import { error } from '../utils/error';
import { RowDataPacket } from 'mysql2/promise';
import { logtime } from '../utils/logtime';
import { Res } from '../types';

class UserController {
	async getUser(req: Request, res: Response) {
		try {
			const { id } = req.query;

			logtime(req, req.query);

			const [[employee]] = await pool.query<RowDataPacket[]>(`
			SELECT * from employee WHERE user_id='${id}'
		 `);

			if (!employee)
				return res.status(400).json({ status: false, error: 'Сотрудник не найден' } as Res);

			return res.status(200).json({ status: true, data: { ...employee } } as Res);
		} catch (e) {
			error(req, res, 500, e);
		}
	}
}

export default new UserController();
