import axios from "axios";
import Express, {
	Request,
	Response
} from "express";
import { stringify } from "querystring";
import config from "../../tools/config";
import { Opcode } from "../../tools/opcode";
import AsyncWrapper from "../../tools/wrapper";

const router = Express.Router();
console.log(`/fintech - API가 등록 되었습니다.`);

const testHost: string = "https://testapi.openbanking.or.kr";
// const testHost: string = "https://openapi.openbanking.or.kr";
// const testHost: string = "https://developers.kftc.or.kr";

const authorize = {
	code: '1y2Zi6LYAoMd6dFa5t1RHLNWSTrX6u',
    scope: 'inquiry login transfer',
    client_info: 'test info',
    state: 'b80BLsfigm9OokPTjy03elbJqRHOfGS6'
}

const token = {
    access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiIxMTAwOTk4Mjc4Iiwic2NvcGUiOlsiaW5xdWlyeSIsImxvZ2luIiwidHJhbnNmZXIiXSwiaXNzIjoiaHR0cHM6Ly93d3cub3BlbmJhbmtpbmcub3Iua3IiLCJleHAiOjE2Mzk2NTI0NDAsImp0aSI6ImUyYjFkYjgxLWIzMDItNGY3NC05ZjY4LTYzMzUyNjU2ZmYxNCJ9.vvNXUw-Jr1BHhiYR2hAnVQaBMeLd2vHBATTt8Azf08Q',
    token_type: 'Bearer',
    refresh_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiIxMTAwOTk4Mjc4Iiwic2NvcGUiOlsiaW5xdWlyeSIsImxvZ2luIiwidHJhbnNmZXIiXSwiaXNzIjoiaHR0cHM6Ly93d3cub3BlbmJhbmtpbmcub3Iua3IiLCJleHAiOjE2NDA1MTY0NDAsImp0aSI6ImMyMDRmNTFkLWFlMmEtNDZjMS1iMTgyLTBmYTU3YTczNjQ3MyJ9.D0CrFiX473K2U3QoFDucQbR9y2sXAhywgk0aA0cGJeg',
    expires_in: 7775999,
    scope: 'inquiry login transfer',
    user_seq_no: '1100998278'
}

router.get( // 2-legged 토큰 발급 (파라미터 에러남)
	"/2legged/token",
	AsyncWrapper (async (req: Request, res: Response) => {
		
		const openApiRoute: string = "/oauth​/2.0​/token";
		const url: string = `${testHost}${openApiRoute}`;

		const header = {
			headers: {
				"Content-Type": 'application/x-www-form-urlencoded; charset=UTF-8'
			}
		}

		const postBody = {
			client_id: config.KFTC.CLIENTID,
			client_secret: config.KFTC.CLIENTSECRET,
			scope: "oob",
			grant_type: "client_credentials"
		}

		await axios.post(url, stringify(postBody), header).then((axiosRes) => {
			console.log(axiosRes.status);
			console.log(axiosRes.data);
			
			res.status(200).json(axiosRes.data);
		}).catch((err) => {
			console.log(err);
			res.status(400).json({
				opcode: Opcode.Error,
				message: "토큰 검증에 실패 하였습니다.",
				errMessage: err.toString()
			});
		});

		console.log(postBody);
	})
)

router.get(
	"/2legged/user/register",
	AsyncWrapper (async (req: Request, res: Response) => {
		const openApiRoute: string = "/proxy/user/register";
		const url: string = `${testHost}${openApiRoute}`;

		const header = {
			headers: {
				"Content-Type": 'application/json; charset=UTF-8',
				authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJNMjAyMTExODYxIiwic2NvcGUiOlsib29iIl0sImlzcyI6Imh0dHBzOi8vd3d3Lm9wZW5iYW5raW5nLm9yLmtyIiwiZXhwIjoxNjM5NTQ4OTYwLCJqdGkiOiJiYTNjMDdlNi1iMmQ4LTRjM2EtOGI0NS01YTlmYWE2OGEyMGUifQ.oJevmscn5929E_nwgAy35RTtlLlsb_alM_sVERp82Ls"
			}
		}

		const postBody = {
			"bank_tran_id": "M202113220U000000000",
			"bank_code_std": "020",
			"register_account_num": "200000000001",
			"register_account_seq": "001",
			"user_info": "19981113",
			"user_name": "ㄱㅁㄸ",
			"user_ci": "Dqz4/pj34XFJTV222222222222222222222222222222222222222222222222222222222222222222222222==",
			"user_email": "start@paywork.io",
			"scope": "",
			"info_prvd_agmt_yn": "Y",
			"wd_agmt_yn": "Y",
			"agmt_data_type": "1"
		}

		await axios.post(url, postBody, header).then((axiosRes) => {
			console.log(axiosRes);
			
			res.status(200).json(axiosRes.data);
		}).catch((err) => {
			console.log(err);
			res.status(400).json({
				opcode: Opcode.Error,
				message: "계좌등록에 실패 하였습니다.",
				errMessage: err.toString()
			});
		});
	})
)

// router.get( // 3-legged 사용자 인증 (프로젝트내 authrize.html파일로 실행)
// 	"/3legged/auth",
// 	AsyncWrapper (async (req: Request, res: Response) => {
// 		const openApiRoute: string = "/oauth/2.0/authorize";
// 		const url: string = `${testHost}${openApiRoute}`;

// 		// state에 사용될 난수
// 		let randomText = "";
// 		let possible = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm0123456789";
// 		for ( var i = 0; i < 32; i++ ) {
// 			randomText += possible.charAt(Math.floor(Math.random() * possible.length));
// 		}

// 		const header = {
// 			params: {
// 				response_type: "code",
// 				client_id: config.KFTC.CLIENTID,
// 				redirect_url: "http://localhost:5221/fintech/test",
// 				scope: "login inquiry transfer",
// 				client_info: "test info",
// 				state: randomText,
// 				auth_type: "0",
// 				leng: "kor",
// 				cellphone_cert_yn: "Y",
// 				authorized_cert_yn: "Y",
// 				account_hold_auth_yn: "Y",
// 				register_info: "A"
// 			}
// 		}

// 		await axios.get(url, header).then((axiosRes) => {
// 			console.log(axiosRes);
			
// 			res.status(200).json(axiosRes.data);
// 		}).catch((err) => {
// 			console.log(err);
// 			res.status(400).json({
// 				opcode: Opcode.Error,
// 				message: "사용자 인증에 실패 하였습니다.",
// 				errMessage: err.toString()
// 			});
// 		});

// 		console.log(header);
// 		console.log(url);
// 	})
// )

router.get( // 3-legged 사용자 인증 리다이렉트
	"/3legged/userAuth/create/redirect",
	AsyncWrapper (async (req: Request, res: Response) => {
		console.log(`\n\n\n==> req`);
		console.log(req.query);

		res.status(200).json({
			opcode: Opcode.Success,
			query: req.query
		})
	})
)

router.get( // 3-legged 사용자 갱신 리다이렉트
	"/3legged/userAuth/refresh/redirect",
	AsyncWrapper (async (req: Request, res: Response) => {
		console.log(`\n\n\n==> req`);
		console.log(req.query);

		res.status(200).json({
			opcode: Opcode.Success,
			query: req.query
		})
	})
)

router.get( // 3-leeged 토큰 발급
	"/3legged/user/register",
	AsyncWrapper (async (req: Request, res: Response) => {
		const openApiRoute: string = "/oauth/2.0/token";
		const url: string = `${testHost}${openApiRoute}`;

		const header = {
			headers: {
				"Content-Type": 'application/x-www-form-urlencoded; charset=UTF-8'
			}
		}

		const postBody = {
			"code": authorize.code,
			"client_id": config.KFTC.CLIENTID,
			"client_secret": config.KFTC.CLIENTSECRET,
			"redirect_uri": "http://localhost:5221/fintech/test",
			"grant_type": "authorization_code"
		}

		await axios.post(url, stringify(postBody), header).then((axiosRes) => {
			console.log(axiosRes);
			
			res.status(200).json(axiosRes.data);
		}).catch((err) => {
			console.log(err);
			res.status(400).json({
				opcode: Opcode.Error,
				message: "토큰 발급에 실패 하였습니다.",
				errMessage: err.toString()
			});
		});

		console.log(postBody);
	})
)

router.get( // 3-leeged 등록 계좌 조회
	"/3legged/account/list",
	AsyncWrapper (async (req: Request, res: Response) => {
		const openApiRoute: string = "/v2.0/account/list";
		const url: string = `${testHost}${openApiRoute}`;

		const header = {
			headers: {
				authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiIxMTAwOTk4Mjc4Iiwic2NvcGUiOlsiaW5xdWlyeSIsImxvZ2luIiwidHJhbnNmZXIiXSwiaXNzIjoiaHR0cHM6Ly93d3cub3BlbmJhbmtpbmcub3Iua3IiLCJleHAiOjE2Mzk2NTI0NDAsImp0aSI6ImUyYjFkYjgxLWIzMDItNGY3NC05ZjY4LTYzMzUyNjU2ZmYxNCJ9.vvNXUw-Jr1BHhiYR2hAnVQaBMeLd2vHBATTt8Azf08Q"
			},
			params: {
				user_seq_no: "1100998278",
				include_cancle_yn: "N",
				sort_order: "D"
			}
		}

		await axios.get(url, header).then((axiosRes) => {
			console.log(axiosRes.data);
			
			res.status(200).json(axiosRes.data);
		}).catch((err) => {
			console.log(err);
			res.status(400).json({
				opcode: Opcode.Error,
				message: "토큰 발급에 실패 하였습니다.",
				errMessage: err.toString()
			});
		});
	})
)

export default router;