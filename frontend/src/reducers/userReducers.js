import {
	USER_LOGIN_FAIL,
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGOUT,
	USER_REGISTER_LOGOUT,
	USER_REGISTER_FAIL,
	USER_REGISTER_REQUEST,
	USER_REGISTER_SUCCESS,
	USER_UPDATE_REQUEST,
	USER_UPDATE_SUCCESS,
	USER_UPDATE_FAIL,
	USDC_BALANCE_REQUEST,
	USDC_BALANCE_SUCCESS,
	USDC_BALANCE_FAIL,
	USDC_TRANSFER_REQUEST,
	USDC_TRANSFER_SUCCESS,
	USDC_TRANSFER_FAIL,
	USDC_MINTMORE_REQUEST,
	USDC_MINTMORE_SUCCESS,
	USDC_MINTMORE_FAIL,
} from "../constants/userConstants";

export const userLoginReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_LOGIN_REQUEST:
			return { loading: true };
		case USER_LOGIN_SUCCESS:
			return { loading: true, userInfo: action.payload };
		case USER_LOGIN_FAIL:
			return { loading: false, error: action.payload };
		case USER_LOGOUT:
			return {};
		default:
			return state;
	}
};

export const userRegisterReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_REGISTER_REQUEST:
			return { loading: true };
		case USER_REGISTER_SUCCESS:
			return { loading: false, userInfo: action.payload };
		case USER_REGISTER_FAIL:
			return { loading: false, error: action.payload };
		case USER_REGISTER_LOGOUT:
			return {};
		default:
			return state;
	}
};
export const updateProfileReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_UPDATE_REQUEST:
			return { loading: true };
		case USER_UPDATE_SUCCESS:
			return { loading: false, userInfo: action.payload, success: true };
		case USER_UPDATE_FAIL:
			return { loading: false, error: action.payload, success: false };
		default:
			return state;
	}
};

export const usdcBalanceReducer = (state = {}, action) => {
	switch (action.type) {
		case USDC_BALANCE_REQUEST:
			return { loading: true };
		case USDC_BALANCE_SUCCESS:
			return { loading: false, usdcInfo: action.payload, success: true };
		case USDC_BALANCE_FAIL:
			return { loading: false, error: action.payload, success: false };
		default:
			return state;
	}
};

export const mintMoreUsdcReducer = (state = {}, action) => {
	switch (action.type) {
		case USDC_MINTMORE_REQUEST:
			return { loading: true };
		case USDC_MINTMORE_SUCCESS:
			return {
				loading: false,
				mintMoreInfo: action.payload,
				success: true,
			};
		case USDC_MINTMORE_FAIL:
			return { loading: false, error: action.payload, success: false };
		default:
			return state;
	}
};

export const transferUsdcReducer = (state = {}, action) => {
	switch (action.type) {
		case USDC_TRANSFER_REQUEST:
			return { loading: true };
		case USDC_TRANSFER_SUCCESS:
			return {
				loading: false,
				usdcTransferInfo: action.payload,
				success: true,
			};
		case USDC_TRANSFER_FAIL:
			return { loading: false, error: action.payload, success: false };
		default:
			return state;
	}
};
