import { RowDataPacket } from 'mysql2/promise';

export interface Employee {
	id: number;
	first_name: string;
	last_name: string;
	middle_name: Nstring;
	birthday: Nstring;
	position_id: Nstring;
	role: string;
	salary: string;
	target_completion: Nstring;
	bonuses: Nstring;
	vacation_days: number;
	position_days: number;
	block: Nstring;
}

export interface IEmployee extends Employee, RowDataPacket {}

export interface IRole extends RowDataPacket {
	id: number;
	role_name: string;
	role_desc: Nstring;
}

export interface IShortEmployee extends RowDataPacket {
	id: number;
	fio: string;
}
