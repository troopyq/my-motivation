import { Request, Response } from 'express';
import { pool } from '../database';
import { error } from '../utils/error';
import { RowDataPacket } from 'mysql2/promise';
import { logger, logtime } from '../utils/logtime';
import { Res } from '../types';
import { Employee, IEmployee, IRole, IShortEmployee } from '../types/employee';
import { getToken } from '../utils';

const getUserInfoFromDB = async (
	id?: number | string,
): Promise<Partial<IRole & IEmployee> | null> => {
	try {
		if (!id) return null;

		const [[employee]] = await pool.query<IEmployee[]>(`
		SELECT * from employee WHERE id='${id}'
	 `);

		if (!employee) return null;

		const [[role]] = await pool.query<IRole[]>(`
		SELECT * from roles WHERE id='${employee.position_id}'
	 `);

		const { id: _id, ...roles } = role;

		return {
			...employee,
			...roles,
		};
	} catch (error) {
		logger(error);

		return null;
	}
};

const UserController = {
	async getUser(req: Request, res: Response) {
		try {
			const { id } = req.query;

			logtime(req, req.query);

			// 	const [[employee]] = await pool.query<IEmployee[]>(`
			// 	SELECT * from employee WHERE user_id='${id}'
			//  `);

			const employee = await getUserInfoFromDB(id as string);

			if (!employee)
				return res.status(400).json({ status: false, error: 'Сотрудник не найден' } as Res);

			return res.status(200).json({ status: true, data: { ...employee } } as Res);
		} catch (e) {
			error(req, res, 500, e);
		}
	},

	profile: async (req: Request, res: Response) => {
		try {
			const { id } = req.query;
			const tokenData = getToken(req);
			const isSelfData = Number(id) === tokenData?.id;

			const employee = await getUserInfoFromDB(id as string);

			console.log(employee);
			if (!employee)
				return res.status(400).json({ status: false, error: 'Сотрудник не найден' } as Res);

			if (isSelfData) {
				return res.status(200).json({ status: true, data: { ...employee } } as Res);
			}

			const { bonuses, salary, target_completion, vacation_days, ...profile } =
				employee as Employee;

			return res.status(200).json({ status: true, data: { ...profile } } as Res);
		} catch (e) {
			error(req, res, 500, e);
		}
	},

	async searchEmployees(req: Request, res: Response) {
		try {
			const { search } = req.query;

			const [employees] = await pool.query<IShortEmployee[]>(`
		SELECT * from searchEmployees WHERE fio LIKE '%${search || ''}%'
	 `);

			logtime(req, employees);

			res.status(200).json({ status: true, data: employees } as Res);
		} catch (e) {
			error(req, res, 500, e);
		}
	},
};

export default UserController;
