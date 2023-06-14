import { Request, Response } from 'express';
import { pool } from '../database';
import { error } from '../utils/error';
import { RowDataPacket } from 'mysql2/promise';
import { logger, logtime } from '../utils/logtime';
import { Res } from '../types';
import { Employee, IEmployee, ILikes, IRole, IShortEmployee } from '../types/employee';
import { getToken, upd } from '../utils';

interface Salary {
	id: number;
	employee_id: number;
	salary_data: Record<string, any>[] | string | null;
}
interface ISalary extends Salary, RowDataPacket {}

interface ISalaryUpdate extends Request {
	body: Salary;
}

interface ILike extends Request {
	body: { id: number };
}

const getUserInfoFromDB = async (
	id?: number | string,
): Promise<Partial<IRole & IEmployee & ISalary> | null> => {
	try {
		if (!id) return null;

		const [[employee]] = await pool.query<IEmployee[]>(`
		SELECT * from employees WHERE id='${id}'
	 `);

		if (!employee) return null;

		const [[role]] = await pool.query<IRole[]>(`
		SELECT * from roles WHERE id='${employee.position_id}'
	 `);

		const [[salaries]] = await pool.query<ISalary[]>(`
		SELECT * from salaries WHERE employee_id='${employee.position_id}'
	 `);

		const { id: _id, ...roles } = role;

		return {
			...employee,
			...roles,
			salary_data: JSON.parse(salaries?.salary_data as string),
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

			const employee = await getUserInfoFromDB(id as string);

			if (!employee)
				return res.status(400).json({ status: false, error: 'Сотрудник не найден' } as Res);

			return res.status(200).json({ status: true, data: { ...employee } } as Res);
		} catch (e) {
			error(req, res, 500, e);
		}
	},

	async profile(req: Request, res: Response) {
		try {
			const { id } = req.query;
			const tokenData = getToken(req);
			const isSelfData = Number(id) === tokenData?.id;

			logger(tokenData)

			let employee = await getUserInfoFromDB(id as string);

			if (!employee)
				return res.status(400).json({ status: false, error: 'Сотрудник не найден' } as Res);

			employee.likes =
				(employee.likes || []) &&
				(JSON.parse((employee.likes as string) || '[]')?.map((el) => el?.toString()) as string[]);

			employee.likes = {
				you_like: employee.likes?.includes(id as string),
				count: employee.likes?.length || 0,
			};

			if (isSelfData) {
				return res.status(200).json({ status: true, data: { ...employee } } as Res);
			}

			let { bonuses, salary, target_completion, vacation_days, salary_data, ...profile } = employee;

			if (tokenData.roles === 'RKM') profile = { ...profile, target_completion };

			return res.status(200).json({ status: true, data: { ...profile } } as Res);
		} catch (e) {
			error(req, res, 500, e);
		}
	},

	async updateSalary(req: ISalaryUpdate, res: Response) {
		try {
			const { employee_id, salary_data } = req.body;

			logger(`${upd({ salary_data })}`);

			const resp = await pool.query(`
        UPDATE salaries SET
				salary_data = ${upd({ salary_data }, true)}
        WHERE employee_id=${employee_id}
       `);

			res.status(200).json({ status: true } as Res);
		} catch (e) {
			error(req, res, 500, e);
		}
	},

	async searchEmployees(req: Request, res: Response) {
		try {
			const [employees] = await pool.query<IShortEmployee[]>(`
		SELECT * from searchEmployees
		`);

			res.status(200).json({ status: true, data: employees } as Res);
		} catch (e) {
			error(req, res, 500, e);
		}
	},

	async like(req: ILike, res: Response) {
		try {
			const { id } = req.body;

			let [[user]] = await pool.execute<ILikes[]>(`
			SELECT likes from employees WHERE id=${id}
			`);

			if (!user.likes) user.likes = '[]';

			let likes = JSON.parse(user.likes)?.map((el) => Number(el)) as number[];

			if (likes.includes(id)) {
				likes = likes.filter((el) => el !== id);
			} else {
				likes.push(id);
			}
			logger(likes);

			const [employees] = await pool.execute<IShortEmployee[]>(`
		UPDATE employees SET likes = ${upd({ likes }, true)} WHERE id = ${id}
		`);

			const resp = {
				you_like: likes.includes(id),
				count: likes?.length || 0,
			};

			res.status(200).json({ status: true, data: resp } as Res);
		} catch (e) {
			error(req, res, 500, e);
		}
	},
};

export default UserController;
