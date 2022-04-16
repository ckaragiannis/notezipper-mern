import {
	NOTES_LIST_FAIL,
	NOTES_LIST_REQUEST,
	NOTES_LIST_SUCCESS,
	NOTES_DELETE_FAIL,
	NOTES_DELETE_REQUEST,
	NOTES_DELETE_SUCCESS,
	NOTES_CREATE_REQUEST,
	NOTES_CREATE_SUCCESS,
	NOTES_CREATE_FAIL,
	NOTES_UPDATE_REQUEST,
	NOTES_UPDATE_SUCCESS,
	NOTES_UPDATE_FAIL,
} from "../constants/noteConstants";
import axios from "axios";

export const listNotes = () => async (dispatch, getState) => {
	try {
		dispatch({ type: NOTES_LIST_REQUEST });

		// getState() returns the entire state of our redux store and we are just taking out the userInfo portion with this next line
		const {
			userLogin: { userInfo },
		} = getState();

		// console.log("noteActions->listNOTES->userInfo is:");
		// console.log(userInfo);

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};
		const { data } = await axios.get("/api/notes", config); // destructure the data from the response array so you only have the data variable VERY SMART

		console.log("noteActions->listNotes->data is: ");
		console.log(data);
		dispatch({ type: NOTES_LIST_SUCCESS, payload: data });
	} catch (error) {
		// console.log("noteActions->error.response is: ");
		// console.log(error.response);
		// console.log(
		// 	"noteActions->error.response.data.message IS: " +
		// 		error.response.data.message
		// );
		dispatch({
			type: NOTES_LIST_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const deleteNoteAction = (id) => async (dispatch, getState) => {
	try {
		dispatch({ type: NOTES_DELETE_REQUEST });

		const {
			userLogin: { userInfo },
		} = getState();

		// console.log("noteActions->listNOTES->userInfo is:");
		// console.log(userInfo);

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};
		const { data } = await axios.delete(`/api/notes/${id}`, config); // destructure the data from the response array so you only have the data variable VERY SMART

		console.log("noteActions->deleteNote->data is: ");
		console.log(data);
		dispatch({ type: NOTES_DELETE_SUCCESS, payload: data });
	} catch (error) {
		// console.log("noteActions->error.response is: ");
		// console.log(error.response);
		// console.log(
		// 	"noteActions->error.response.data.message IS: " +
		// 		error.response.data.message
		// );
		dispatch({
			type: NOTES_DELETE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const createNoteAction =
	(title, content, category) => async (dispatch, getState) => {
		try {
			dispatch({ type: NOTES_CREATE_REQUEST });

			const {
				userLogin: { userInfo },
			} = getState();

			// console.log("noteActions->createNoteAction->userInfo is:");
			// console.log(userInfo);

			const config = {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${userInfo.token}`,
				},
			};
			const { data } = await axios.post(
				`/api/notes/create/`,
				{ title, content, category },
				config
			); // destructure the data from the response array so you only have the data variable VERY SMART

			console.log("noteActions->createNoteAction->data is: ");
			console.log(data);
			dispatch({ type: NOTES_CREATE_SUCCESS, payload: data });
		} catch (error) {
			// console.log("noteActions->error.response is: ");
			// console.log(error.response);
			// console.log(
			// 	"noteActions->error.response.data.message IS: " +
			// 		error.response.data.message
			// );
			dispatch({
				type: NOTES_CREATE_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			});
		}
	};

export const updateNoteAction =
	(id, title, content, category) => async (dispatch, getState) => {
		try {
			dispatch({
				type: NOTES_UPDATE_REQUEST,
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

			const { data } = await axios.put(
				`/api/notes/${id}`,
				{ title, content, category },
				config
			);

			dispatch({
				type: NOTES_UPDATE_SUCCESS,
				payload: data,
			});
		} catch (error) {
			const message =
				error.response && error.response.data.message
					? error.response.data.message
					: error.message;
			dispatch({
				type: NOTES_UPDATE_FAIL,
				payload: message,
			});
		}
	};
