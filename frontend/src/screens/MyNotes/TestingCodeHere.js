import React from "react";

const TestingCodeHere = () => {
	return <div>Testing Code Here</div>;
};

export default TestingCodeHere;

// import React from "react";
// import { Link } from "react-router-dom";
// import { Accordion, Badge, Button, Card } from "react-bootstrap";
// import MainScreen from "../../components/MainScreen";
// import notes from "../../data/notes";

// const TestingCodeHere = () => {
// 	const deleteHandler = (id) => {
// 		if (window.confirm("Are you sure?")) {
// 		}
// 	};

// 	return (
// 		<MainScreen title="Testing - Chris Karagiannis">
// 			<Link to="/createnote" style={{ flex: 1 }}>
// 				<Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
// 					Create New Note
// 				</Button>
// 			</Link>
// 			<Accordion defaultActiveKey="0">
// 				{notes.map((note) => (
// 					<Card style={{ margin: 10 }}>
// 						<Card.Header style={{ display: "flex" }}>
// 							<span
// 								style={{
// 									color: "black",
// 									textDecoration: "none",
// 									flex: 1,
// 									cursor: "pointer",
// 									alignSelf: "center",
// 									fontSize: 18,
// 								}}
// 							>
// 								<Accordion.Toggle
// 									as={Card.Text}
// 									variant="Link"
// 									eventKey="0"
// 								>
// 									{note.title}
// 								</Accordion.Toggle>
// 							</span>
// 							<div>
// 								<Button href={`/note/${note._id}`}>Edit</Button>
// 								<Button
// 									variant="danger"
// 									className="mx-2"
// 									onClick={() => deleteHandler(note._id)}
// 								>
// 									Delete
// 								</Button>
// 							</div>
// 						</Card.Header>
// 						<Accordion.Collapse eventKey="0">
// 							<Card.Body>
// 								<h4>
// 									<Badge text="light" bg="success">
// 										Category - {note.category}
// 									</Badge>
// 								</h4>
// 								<blockquote className="blockquote mb-0">
// 									<p>{note.content}</p>
// 									<footer className="blockquote-footer">
// 										Created on - Date
// 									</footer>
// 								</blockquote>
// 							</Card.Body>
// 						</Accordion.Collapse>
// 					</Card>
// 				))}
// 			</Accordion>
// 		</MainScreen>
// 	);
// };

// export default TestingCodeHere;

// MYNOTES:
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { Accordion, Badge, Button, Card } from "react-bootstrap";
// import MainScreen from "../../components/MainScreen";
// import axios from "axios";

// const MyNotes = () => {
// 	const [notes, setNotes] = useState([]);
// 	const [userInfo, setUserInfo] = useState({});

// 	const deleteHandler = (id) => {
// 		if (window.confirm("Are you sure?")) {
// 		}
// 	};

// 	console.log(notes);

// 	const fetchNotes = async () => {
// 		// const data = await axios.get("http://localhost:5000/api/notes"); // since we added proxy line to frontend>package.json we can change this to
// 		// const data = await axios.get("/api/notes");
// 		const config = {
// 			headers: {
// 				Authorization: `Bearer ${userInfo.token}`,
// 			},
// 		};
// 		console.log(config);
// 		const { data } = await axios.get("/api/notes", config); // destructure the data from the response array so you only have the data variable VERY SMART
// 		setNotes(data);
// 		console.log(data);
// 	};

// 	useEffect(() => {
// 		setUserInfo(JSON.parse(localStorage.getItem("userInfo")));
// 		fetchNotes();
// 	}, []);

// 	return (
// 		<MainScreen
// 			title={"Welcome Back " + (userInfo ? userInfo.name : "UNKNOWN")}
// 		>
// 			<Link to="/createnote">
// 				<Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
// 					Create New Note
// 				</Button>
// 			</Link>
// 			<Accordion defaultActiveKey="0">
// 				{notes.map((note) => (
// 					<Accordion.Item key={note._id} eventKey={note._id}>
// 						<Card style={{ margin: 10, display: "flex" }}>
// 							<Accordion.Header>
// 								<Card.Header style={{ display: "flex" }}>
// 									<span
// 										style={{
// 											color: "black",
// 											textDecoration: "none",
// 											flex: 1,
// 											cursor: "pointer",
// 											alignSelf: "center",
// 											padding: "10px 200px",
// 											justifyContent: "space-between",
// 											fontSize: 18,
// 										}}
// 									>
// 										{note.title} / {note._id}
// 									</span>
// 									<div>
// 										<Button href={`/note/${note._id}`}>
// 											Edit
// 										</Button>
// 										<>
// 											<Button
// 												variant="danger"
// 												className="mx-2"
// 												onClick={() =>
// 													deleteHandler(note._id)
// 												}
// 											>
// 												Delete
// 											</Button>
// 										</>
// 									</div>
// 								</Card.Header>
// 							</Accordion.Header>
// 							<Accordion.Body>
// 								<Card.Body>
// 									<h4>
// 										<Badge text="light" bg="success">
// 											Category - {note.category}
// 										</Badge>
// 									</h4>
// 									<blockquote className="blockquote mb-0">
// 										<p>{note.content}</p>
// 										<footer className="blockquote-footer">
// 											Created on - Date
// 										</footer>
// 									</blockquote>
// 								</Card.Body>
// 							</Accordion.Body>
// 						</Card>
// 					</Accordion.Item>
// 				))}
// 			</Accordion>
// 		</MainScreen>
// 	);
// };

// export default MyNotes;
