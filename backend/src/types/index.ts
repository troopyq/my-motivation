export type Res<T extends unknown = unknown> = {
	error?: Nstring;
	status: boolean;
	data?: T;
};