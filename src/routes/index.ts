import Express from "express";
import Async from "async";
import cors from "cors";
import config from "../tools/config";
import bodyParser from "body-parser";
import methodOverride from "method-override";
import LoginRouter from "./login";
import FintechRouter from "./fintech";

const app: Express.Application = Express();
Async.series(
	[
		(callback) => { // cors and library
			try {
				app.use(cors({
					credentials: true,
					methods: "GET,POST",
					origin: config.WEB.CORS
				}));

				app.use(bodyParser.json());
				app.use(bodyParser.urlencoded({extended: true}));
				app.use(methodOverride("_method"));
				
				console.log(`[CORS] ${config.WEB.CORS}`);

				callback(null);
			} catch (err) {
				callback(err);
			}
		},
		(callback) => { // express on
			try {
				app.listen(config.WEB.PORT, () => {
					console.log(`=> http://${config.WEB.HOST}:${config.WEB.PORT} Express On`);
				});

				callback(null);
			} catch (err) {
				callback(err);
			}
		},
		(callback) => { // routing
			app.use("/login", LoginRouter);
			app.use("/fintech", FintechRouter);

			callback(null);
		}
	],
	(err) => {
		if (err) {
			console.log(`Express Service 기동 중 오류가 발생 하였습니다. => \n`, err);
		}
	}
)

export default app;