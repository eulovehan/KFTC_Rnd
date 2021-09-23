import { NextFunction, Request, Response } from "express";
import { Opcode } from "./opcode";

export default function AsyncWrapper(callback: (req: Request, res: Response, next: NextFunction) => Promise<any>) {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			return await callback(req, res, next);
		} catch (err) {
			const { message } = err;
			console.log(err);

			res.status(500).json({
				opcode: Opcode.Error,
				message: message,
				errMessage: err.toString()
			})
		}
	}
}