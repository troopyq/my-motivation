import { Request, Response } from "express";
import { pool } from "../database";

class GetController {
	async employees(req: Request, res: Response) {
		
		const temp = await pool.query(`

		`)

		res.status(200).send("okay")
	}
}

export default new GetController()


