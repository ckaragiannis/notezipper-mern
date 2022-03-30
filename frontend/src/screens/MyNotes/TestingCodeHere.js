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
