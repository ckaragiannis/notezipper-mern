import {
	USDC_BALANCE_FAIL,
	USDC_BALANCE_REQUEST,
	USDC_BALANCE_SUCCESS,
	USDC_MINTMORE_FAIL,
	USDC_MINTMORE_REQUEST,
	USDC_MINTMORE_SUCCESS,
	USDC_TRANSFER_FAIL,
	USDC_TRANSFER_REQUEST,
	USDC_TRANSFER_SUCCESS,
	USER_LOGIN_FAIL,
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGOUT,
	USER_REGISTER_FAIL,
	USER_REGISTER_LOGOUT,
	USER_REGISTER_REQUEST,
	USER_REGISTER_SUCCESS,
	USER_UPDATE_FAIL,
	USER_UPDATE_REQUEST,
	USER_UPDATE_SUCCESS,
} from "../constants/userConstants";
import axios from "axios";

export const logout = () => async (dispatch) => {
	localStorage.removeItem("userInfo");
	dispatch({ type: USER_LOGOUT }); // clear the redus userInfo field
	dispatch({ type: USER_REGISTER_LOGOUT }); // clear the redux userRegister state field as well
};

export const login = (email, password) => async (dispatch) => {
	try {
		dispatch({ type: USER_LOGIN_REQUEST });

		const config = {
			headers: { "Content-type": "application/json" },
		};

		const { data } = await axios.post(
			"/api/users/login",
			{
				email,
				password,
			},
			config
		);
		// console.log("IN userActions.js and data is: ");
		// console.log(data);
		dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
		localStorage.setItem("userInfo", JSON.stringify(data));
	} catch (error) {
		// console.log("In userActions.js and ERROR.response is: ");
		// console.log(error.response);
		// console.log(
		// 	"In userActions.js and ERROR.response.data.message IS: " +
		// 		error.response.data.message
		// );
		dispatch({
			type: USER_LOGIN_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const register = (name, pic, email, password) => async (dispatch) => {
	try {
		dispatch({ type: USER_REGISTER_REQUEST });

		const config = {
			headers: {
				"Content-type": "application/json",
			},
		};

		const { data } = await axios.post(
			"/api/users",
			{
				name,
				pic,
				email,
				password,
			},
			config
		);
		// console.log(
		// 	"In userActions()->userRegister function and data is: " +
		// 		JSON.stringify(data)
		// );
		dispatch({ type: USER_REGISTER_SUCCESS, payload: data });

		// You can also auto log in the user if you'd like by doing this:
		// dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
	} catch (error) {
		// console.log("In userActions.js and ERROR.response is: ");
		// console.log(error.response);
		// console.log(
		// 	"In userActions.js and ERROR.response.data.message IS: " +
		// 		error.response.data.message
		// );
		dispatch({
			type: USER_REGISTER_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const updateProfile = (user) => async (dispatch, getState) => {
	try {
		dispatch({
			type: USER_UPDATE_REQUEST,
		});

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const { data } = await axios.post(`/api/users/profile`, user, config);

		dispatch({
			type: USER_UPDATE_SUCCESS,
			payload: data,
		});

		// Now update the user login information for userInfo, and reload the Application->localStorage variable
		dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

		localStorage.setItem("userInfo", JSON.stringify(data));
	} catch (error) {
		const message =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message;
		dispatch({
			type: USER_UPDATE_FAIL,
			payload: message,
		});
	}
};

export const getUsdcBalance = () => async (dispatch, getState) => {
	try {
		dispatch({ type: USDC_BALANCE_REQUEST });

		const {
			userLogin: { userInfo },
		} = getState();

		console.log("GETUSDCBALANCE: UserINFO.token is: ", userInfo.token);
		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const { data } = await axios.get(`/api/users/usdcBalance`, config);

		// console.log(
		// 	"In userActions()->getUsdcBalance function and data is: " +
		// 		JSON.stringify(data)
		// );
		dispatch({ type: USDC_BALANCE_SUCCESS, payload: data });

		// You can also auto log in the user if you'd like by doing this:
		// dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
	} catch (error) {
		// console.log("In userActions.js and ERROR.response is: ");
		// console.log(error.response);
		// console.log(
		// 	"In userActions.js and ERROR.response.data.message IS: " +
		// 		error.response.data.message
		// );
		dispatch({
			type: USDC_BALANCE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const sendTransferUsdc = (txUser) => async (dispatch, getState) => {
	try {
		dispatch({ type: USDC_TRANSFER_REQUEST });

		const {
			userLogin: { userInfo },
		} = getState();

		console.log("UserINFO.token is: ", userInfo.token);
		console.log("SenderAddress is: ", txUser.senderAddress);
		console.log("ReceiverAddress is: ", txUser.receiverAddress);
		console.log("Transfer Amount is: ", txUser.amount);
		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const { data } = await axios.post(
			"/api/users/transferUsdc",
			// {
			// 	senderAddress,
			// 	receiverAddress,
			// 	amount,
			// },
			txUser,
			config
		);

		console.log(
			"In userActions()->transferUsdc function and data is: " +
				JSON.stringify(data)
		);
		dispatch({ type: USDC_TRANSFER_SUCCESS, payload: data }); // do the transfer
	} catch (error) {
		// console.log("In userActions.js and ERROR.response is: ");
		// console.log(error.response);
		// console.log(
		// 	"In userActions.js and ERROR.response.data.message IS: " +
		// 		error.response.data.message
		// );
		dispatch({
			type: USDC_TRANSFER_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const getMoreUsdc = (txAddress) => async (dispatch, getState) => {
	try {
		dispatch({ type: USDC_MINTMORE_REQUEST });

		const {
			userLogin: { userInfo },
		} = getState();

		console.log("GETMOREUSDC UserINFO.token is: ", userInfo.token);
		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const { data } = await axios.post(
			`/api/users/mintMoreUsdc`,
			txAddress,
			config
		);

		console.log(
			"In userActions()->mintMoreUsdc function and data is: " +
				JSON.stringify(data)
		);
		dispatch({ type: USDC_MINTMORE_SUCCESS, payload: data });

		// You can also auto log in the user if you'd like by doing this:
		// dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
	} catch (error) {
		// console.log("In userActions.js and ERROR.response is: ");
		// console.log(error.response);
		// console.log(
		// 	"In userActions.js and ERROR.response.data.message IS: " +
		// 		error.response.data.message
		// );
		dispatch({
			type: USDC_MINTMORE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};
