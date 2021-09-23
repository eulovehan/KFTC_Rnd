module.exports = {
	WEB: {
		HOST: process.env.WEB_HOST,
		PORT: parseInt(process.env.WEB_PORT),
		CORS: process.env.WEB_CORS
	},
	MYSQL: {
		HOST: process.env.MYSQL_HOST,
		PORT: parseInt(process.env.MYSQL_PORT),
		USERNAME: process.env.MYSQL_USERNAME,
		PASSWORD: process.env.MYSQL_PASSWORD,
		DATABASE: process.env.MYSQL_DATABASE,
		SYNCHRONIZE: process.env.MYSQL_SYNCHRONIZE,
		LOGGING: process.env.MYSQL_LOGGING
	},
	KFTC: {
		CLIENTID: process.env.KFTC_CLIENTID,
		CLIENTSECRET: process.env.KFTC_CLIENTSECRET
	}
}