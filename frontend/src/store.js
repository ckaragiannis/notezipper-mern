import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
	mintMoreUsdcReducer,
	transferUsdcReducer,
	updateProfileReducer,
	usdcBalanceReducer,
	userLoginReducer,
	userRegisterReducer,
} from "./reducers/userReducers";

import {
	noteCreateReducer,
	noteDeleteReducer,
	noteListReducer,
	noteUpdateReducer,
} from "./reducers/noteReducers";

// create our reducers:
const reducer = combineReducers({
	// this will contain our reducers
	userLogin: userLoginReducer,
	userRegister: userRegisterReducer,
	userUpdate: updateProfileReducer,
	usdcBalance: usdcBalanceReducer,
	transferUsdc: transferUsdcReducer,
	mintMoreUsdc: mintMoreUsdcReducer,
	noteList: noteListReducer,
	noteDelete: noteDeleteReducer,
	noteCreate: noteCreateReducer,
	noteUpdate: noteUpdateReducer,
});

// Next we need to create our initial state of the application:
const userInfoFromStorage = localStorage.getItem("userInfo")
	? JSON.parse(localStorage.getItem("userInfo"))
	: null;

const initialState = {
	userLogin: { Loading: false, userInfo: userInfoFromStorage },
	userRegister: { Loading: false, userRegister: null },
};

// Add the middleware:
const middleware = [thunk];

// Next create our Store
const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
