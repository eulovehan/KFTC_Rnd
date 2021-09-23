import Async from "async";
import { createConnection } from "typeorm";
import config from "./tools/config";

Async.series(
	[
		(callback) => { // web config check
			let triggerType: string = "WEB.HOST";
			if (!config.WEB.HOST) {
				const errCode: Error = Error(`[${triggerType}] 검증에 실패하였습니다.`);
				callback(errCode);
				return false;
			} else {
				console.log(`[${triggerType}] Pass Inspection`);
			}

			triggerType = "WEB.PORT";
			if (!config.WEB.PORT) {
				const errCode: Error = Error(`[${triggerType}] 검증에 실패하였습니다.`);
				callback(errCode);
				return false;
			} else {
				console.log(`[${triggerType}] Pass Inspection`);
			}

			triggerType = "WEB.CORS";
			if (!config.WEB.CORS) {
				const errCode: Error = Error(`[${triggerType}] 검증에 실패하였습니다.`);
				callback(errCode);
				return false;
			} else {
				console.log(`[${triggerType}] Pass Inspection`);
			}

			callback(null);
		},
		(callback) => { // mysql config check
			let triggerType = "MYSQL.HOST";
			if (!config.MYSQL.HOST) {
				const errCode: Error = Error(`[${triggerType}] 검증에 실패하였습니다.`);
				callback(errCode);
				return false;
			} else {
				console.log(`[${triggerType}] Pass Inspection`);
			}

			triggerType = "MYSQL.PORT";
			if (!config.MYSQL.PORT) {
				const errCode: Error = Error(`[${triggerType}] 검증에 실패하였습니다.`);
				callback(errCode);
				return false;
			} else {
				console.log(`[${triggerType}] Pass Inspection`);
			}

			triggerType = "MYSQL.USERNAME";
			if (!config.MYSQL.USERNAME) {
				const errCode: Error = Error(`[${triggerType}] 검증에 실패하였습니다.`);
				callback(errCode);
				return false;
			} else {
				console.log(`[${triggerType}] Pass Inspection`);
			}

			triggerType = "MYSQL.DATABASE";
			if (!config.MYSQL.DATABASE) {
				const errCode: Error = Error(`[${triggerType}] 검증에 실패하였습니다.`);
				callback(errCode);
				return false;
			} else {
				console.log(`[${triggerType}] Pass Inspection`);
			}

			triggerType = "MYSQL.SYNCHRONIZE";
			if (!config.MYSQL.SYNCHRONIZE) {
				const errCode: Error = Error(`[${triggerType}] 검증에 실패하였습니다.`);
				callback(errCode);
				return false;
			} else {
				console.log(`[${triggerType}] Pass Inspection`);
			}

			triggerType = "MYSQL.LOGGING";
			if (!config.MYSQL.LOGGING) {
				const errCode: Error = Error(`[${triggerType}] 검증에 실패하였습니다.`);
				callback(errCode);
				return false;
			} else {
				console.log(`[${triggerType}] Pass Inspection`);
			}

			callback(null);
		},
		(callback) => { // mysql createConnection
			// const triggerType: string = "createConnection(mysql)";
			// createConnection({
			// 	type: "mysql",
			// 	host: config.MYSQL.HOST,
			// 	port: config.MYSQL.PORT,
			// 	username: config.MYSQL.USERNAME,
			// 	password: config.MYSQL.PASSWORD,
			// 	database: config.MYSQL.DATABASE,
			// 	synchronize: config.MYSQL.SYNCHRONIZE,
			// 	logging: config.MYSQL.LOGGING,
			// 	entities: [`${__dirname}/models/**/*.{js, ts}`]
			// })
			// .catch(callback)
			// .then(() => {
			// 	console.log(`[${triggerType}] Connect`);
			// 	callback(null);
			// });
			callback(null);
		},
		(callback) => { // route on
			const triggerType: string = "Routes";

			import("./routes")
			.catch((err) => {
				callback(err);
			})
			.then(() => {
				console.log(`[${triggerType}] Routes Import`);
				callback(null);
			});
		}
	], (err) => {
		if (err) {
			console.log(`서버 기동중 오류가 발생 하였습니다. => \n`, err);
		}
	}
)