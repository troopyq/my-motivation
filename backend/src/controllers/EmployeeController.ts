import { Request, Response } from 'express';
import { pool } from '../database';
import { error } from '../utils/error';

class EmployeeController {
	async employees(req: Request, res: Response) {
		try {
			const [row] = await pool.query(`
				SELECT * from employee
			`);
			res.status(200).json({status: true, data: row?.[0]})
		} catch (e: any) {
			error(req, res, 500, e);
		}
	}
}

export default new EmployeeController();
