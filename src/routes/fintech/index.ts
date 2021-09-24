import axios from "axios";
import Express, {
	Request,
	Response
} from "express";
import moment from "moment";
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
	code: 't6iCWLl74dOKI6DD5h0k0Izad6pvME',
    scope: 'inquiry login transfer',
    client_info: 'test info',
    state: 'b80BLsfigm9OokPTjy03elbJqRHOfGS6'
}

const token = {
    access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiIxMTAwOTk4Mjc4Iiwic2NvcGUiOlsiaW5xdWlyeSIsImxvZ2luIiwidHJhbnNmZXIiXSwiaXNzIjoiaHR0cHM6Ly93d3cub3BlbmJhbmtpbmcub3Iua3IiLCJleHAiOjE2NDAyMzAwOTksImp0aSI6ImE4MGI4ZmQ0LTUxODItNDljNC1hYTRjLTQ1NzVlYzY4MTFlZiJ9.-Oh0pCkY1V98v6CdzhmJJGmLh0IHzTbDPRL-ljYHdgo',
    token_type: 'Bearer',
    refresh_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiIxMTAwOTk4Mjc4Iiwic2NvcGUiOlsiaW5xdWlyeSIsImxvZ2luIiwidHJhbnNmZXIiXSwiaXNzIjoiaHR0cHM6Ly93d3cub3BlbmJhbmtpbmcub3Iua3IiLCJleHAiOjE2NDEwOTQwOTksImp0aSI6IjE0MDEwMjcxLTYxYTItNGU5MC05NWM3LTliNDQxNGQ5N2RhYSJ9.TZUYXVDnI1uiuolrv0o8HAZXjAQ7Pnx4FT9p7qDob-o',
    expires_in: 7775999,
    scope: 'inquiry login transfer',
    user_seq_no: '1100998278'
}

// router.get( // 2-legged 토큰 발급 (파라미터 에러남)
// 	"/2legged/token",
// 	AsyncWrapper (async (req: Request, res: Response) => {
		
// 		const openApiRoute: string = "/oauth​/2.0​/token";
// 		const url: string = `${testHost}${openApiRoute}`;

// 		const header = {
// 			headers: {
// 				"Content-Type": 'application/x-www-form-urlencoded; charset=UTF-8'
// 			}
// 		}

// 		const postBody = {
// 			client_id: config.KFTC.CLIENTID,
// 			client_secret: config.KFTC.CLIENTSECRET,
// 			scope: "oob",
// 			grant_type: "client_credentials"
// 		}

// 		await axios.post(url, stringify(postBody), header).then((axiosRes) => {
// 			console.log(axiosRes.status);
// 			console.log(axiosRes.data);
			
// 			res.status(200).json(axiosRes.data);
// 		}).catch((err) => {
// 			console.log(err);
// 			res.status(400).json({
// 				opcode: Opcode.Error,
// 				message: "토큰 검증에 실패 하였습니다.",
// 				errMessage: err.toString()
// 			});
// 		});

// 		console.log(postBody);
// 	})
// )

// router.get(
// 	"/2legged/user/register",
// 	AsyncWrapper (async (req: Request, res: Response) => {
// 		const openApiRoute: string = "/proxy/user/register";
// 		const url: string = `${testHost}${openApiRoute}`;

// 		const header = {
// 			headers: {
// 				"Content-Type": 'application/json; charset=UTF-8',
// 				authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJNMjAyMTExODYxIiwic2NvcGUiOlsib29iIl0sImlzcyI6Imh0dHBzOi8vd3d3Lm9wZW5iYW5raW5nLm9yLmtyIiwiZXhwIjoxNjM5NTQ4OTYwLCJqdGkiOiJiYTNjMDdlNi1iMmQ4LTRjM2EtOGI0NS01YTlmYWE2OGEyMGUifQ.oJevmscn5929E_nwgAy35RTtlLlsb_alM_sVERp82Ls"
// 			}
// 		}

// 		const postBody = {
// 			"bank_tran_id": "M202113220U000000000",
// 			"bank_code_std": "020",
// 			"register_account_num": "200000000001",
// 			"register_account_seq": "001",
// 			"user_info": "19981113",
// 			"user_name": "ㄱㅁㄸ",
// 			"user_ci": "Dqz4/pj34XFJTV222222222222222222222222222222222222222222222222222222222222222222222222==",
// 			"user_email": "start@paywork.io",
// 			"scope": "",
// 			"info_prvd_agmt_yn": "Y",
// 			"wd_agmt_yn": "Y",
// 			"agmt_data_type": "1"
// 		}

// 		await axios.post(url, postBody, header).then((axiosRes) => {
// 			console.log(axiosRes);
			
// 			res.status(200).json(axiosRes.data);
// 		}).catch((err) => {
// 			console.log(err);
// 			res.status(400).json({
// 				opcode: Opcode.Error,
// 				message: "계좌등록에 실패 하였습니다.",
// 				errMessage: err.toString()
// 			});
// 		});
// 	})
// )

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
			"redirect_uri": "http://localhost:5221/fintech/3legged/userAuth/create/redirect",
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
				authorization: `Bearer ${token.access_token}`
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
				message: "등록 계좌 조회에 실패하였습니다.",
				errMessage: err.toString()
			});
		});
	})
)

router.get( // 3-leeged 계좌 해지 (scope 처리 문제로 보류)
	"/3legged/account/cancel",
	AsyncWrapper (async (req: Request, res: Response) => {
		const openApiRoute: string = "/v2.0/account/cancel";
		const url: string = `${testHost}${openApiRoute}`;
		console.log(url);

		const header = {
			headers: {
				authorization: `Bearer ${token.access_token}`,
				"Content-Type": 'application/json; charset=UTF-8'
			}
		}

		const bank_tran_id: string = "M202111861" + "U" + "00000020K"; // 채번. 이용기관코드10자리 + U + 임의의 문자
		const body = {
			bank_tran_id: bank_tran_id, // 채번
			scope: "inquiry", // scope 바이트제한은 10인데 이걸 다 안넣으면 오류가 남
			fintech_use_num: "120211186188932157184731"
		}

		await axios.post(url, body, header).then((axiosRes) => {
			console.log(axiosRes.data);
			
			res.status(200).json(axiosRes.data);
		}).catch((err) => {
			console.log(err);
			res.status(400).json({
				opcode: Opcode.Error,
				message: "계좌 해지에 실패 하였습니다.",
				errMessage: err.toString()
			});
		});
	})
)

router.get( // 3-leeged 잔액조회
	"/3legged/account/balance/fin_num",
	AsyncWrapper (async (req: Request, res: Response) => {
		const openApiRoute: string = "/v2.0/account/balance/fin_num";
		const url: string = `${testHost}${openApiRoute}`;
		console.log(url);

		const bank_tran_id: string = "M202111861" + "U" + "00000002A"; // 채번. 이용기관코드10자리 + U + 임의의 문자

		const formatDate = moment().format("YYYYMMDDHHmmss");
		console.log(formatDate);
		const header = {
			headers: {
				authorization: `Bearer ${token.access_token}`
			},
			params: {
				bank_tran_id: bank_tran_id, // 채번
				fintech_use_num: "120211186188932157184694",
				tran_dtime: formatDate
			}
		}

		await axios.get(url, header).then((axiosRes) => { // rsp_code
			console.log(axiosRes.data);
			
			res.status(200).json(axiosRes.data);
		}).catch((err) => {
			console.log(err);
			res.status(400).json({
				opcode: Opcode.Error,
				message: "잔액 조회에 실패 하였습니다.",
				errMessage: err.toString()
			});
		});
	})
)

router.get( // 3-leeged 거래내역조회
	"/3legged/account/transaction_list/fin_num",
	AsyncWrapper (async (req: Request, res: Response) => {
		const openApiRoute: string = "/v2.0/account/transaction_list/fin_num";
		const url: string = `${testHost}${openApiRoute}`;
		console.log(url);

		const bank_tran_id: string = "M202111861" + "U" + "00000004A"; // 채번. 이용기관코드10자리 + U + 임의의 문자

		const formatDate = moment().format("YYYYMMDDHHmmss");
		console.log(formatDate);
		const header = {
			headers: {
				authorization: `Bearer ${token.access_token}`
			},
			params: {
				bank_tran_id: bank_tran_id, // 채번
				fintech_use_num: "120211186188932157184694",
				inquiry_type: "A",
				inquiry_base: "D",
				from_date: "20210101",
				to_date: "20210924", // 현재 일자보다 크면 에러. 현재일자는 허용됨
				sort_order: "D",
				tran_dtime: formatDate
			}
		}

		await axios.get(url, header).then((axiosRes) => { // rsp_code
			console.log(axiosRes.data);
			
			res.status(200).json(axiosRes.data);
		}).catch((err) => {
			console.log(err);
			res.status(400).json({
				opcode: Opcode.Error,
				message: "거래내역 조회에 실패 하였습니다.",
				errMessage: err.toString()
			});
		});
	})
)

export default router;