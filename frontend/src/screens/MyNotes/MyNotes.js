import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Accordion, Badge, Button, Card } from "react-bootstrap";
import MainScreen from "../../components/MainScreen";
// import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { deleteNoteAction, listNotes } from "../../actions/noteActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";

const MyNotes = () => {
	// const [notes, setNotes] = useState([]);
	// const [userInfo, setUserInfo] = useState({});

	const navigate = useNavigate();
	const location = useLocation();

	const dispatch = useDispatch();

	const noteList = useSelector((state) => state.noteList);
	const { loading, error, notes } = noteList;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const noteDelete = useSelector((state) => state.noteDelete);
	const {
		loading: loadingDelete,
		error: errorDelete,
		success: successDelete,
	} = noteDelete;

	// Use this hook to make sure the newly created note is displayed as sometimes it isn't
	const noteCreate = useSelector((state) => state.noteCreate);
	const { success: successCreate } = noteCreate;

	// Use this hook to make sure the newly updaated note is updated properly in the MyNotes pages when you update it
	const noteUpdate = useSelector((state) => state.noteUpdate);
	const { success: successUpdate } = noteUpdate;

	console.log("MyNotes->userLogin is:");
	console.log(userLogin);
	console.log("MyNotes->notes returned is:");
	console.log(notes);
	console.log("MyNotes->noteDelete is:");
	console.log(noteDelete);
	console.log("MyNotes->noteCreate is:");
	console.log(noteCreate);
	console.log("MyNotes->noteUpdate is:");
	console.log(noteUpdate);

	// const fetchNotes = async () => {
	// 	// const data = await axios.get("http://localhost:5000/api/notes"); // since we added proxy line to frontend>package.json we can change this to
	// 	// const data = await axios.get("/api/notes");
	// 	const config = {
	// 		headers: {
	// 			Authorization: `Bearer ${userInfo.token}`,
	// 		},
	// 	};
	// 	console.log(config);
	// 	const { data } = await axios.get("/api/notes", config); // destructure the data from the response array so you only have the data variable VERY SMART
	// 	// setNotes(data);
	// 	console.log(data);
	// };

	useEffect(() => {
		dispatch(listNotes());
		// fetchNotes();
		if (!userInfo) {
			navigate("/");
		}
	}, [
		dispatch,
		navigate,
		userInfo,
		successDelete,
		successUpdate,
		successCreate,
	]);

	const deleteHandler = (id) => {
		if (window.confirm("Are you sure?" + id)) {
			dispatch(deleteNoteAction(id));
		}
	};

	return (
		<MainScreen
			title={"Welcome Back " + (userInfo ? userInfo.name : "UNKNOWN")}
		>
			{/* {console.log(notes)} */}
			<Link to="/createnote">
				<Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
					Create New Note
				</Button>
			</Link>
			{error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
			{errorDelete && (
				<ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
			)}

			<Accordion defaultActiveKey="0">
				{loading && <Loading />}
				{loadingDelete && <Loading />}
				{notes &&
					notes?.reverse().map((note) => (
						<Accordion.Item key={note._id} eventKey={note._id}>
							<Card style={{ margin: 10, display: "flex" }}>
								<Accordion.Header>
									<Card.Header style={{ display: "flex" }}>
										<span
											style={{
												color: "black",
												textDecoration: "none",
												flex: 1,
												cursor: "pointer",
												alignSelf: "center",
												padding: "10px 200px",
												justifyContent: "space-between",
												fontSize: 18,
											}}
										>
											{note.title} / {note._id}
										</span>
										<div>
											<>
												<Button
													href={`/note/${note._id}`}
												>
													Edit
												</Button>
											</>
											<Button
												variant="danger"
												className="mx-2"
												onClick={() =>
													deleteHandler(note._id)
												}
											>
												Delete
											</Button>
										</div>
									</Card.Header>
								</Accordion.Header>
								<Accordion.Body>
									<Card.Body>
										<h4>
											<Badge text="light" bg="success">
												Category - {note.category}
											</Badge>
										</h4>
										<blockquote className="blockquote mb-0">
											<p>{note.content}</p>
											<footer className="blockquote-footer">
												Created on -{" "}
												{note.createdAt.substring(
													0,
													note.createdAt.indexOf("T")
												)}
											</footer>
										</blockquote>
									</Card.Body>
								</Accordion.Body>
							</Card>
						</Accordion.Item>
					))}
			</Accordion>
		</MainScreen>
	);
};

export default MyNotes;
