interface Config {
	WEB: {
		HOST: string,
		PORT: number,
		CORS: string
	},
	MYSQL: {
		HOST: string;
		PORT: number;
		USERNAME: string;
		PASSWORD: string;
		DATABASE: string;
		SYNCHRONIZE: boolean;
		LOGGING: boolean;
	},
	KFTC: {
		CLIENTID: string,
		CLIENTSECRET: string
	}
}

const config: Config = require("../../config");
export default config;