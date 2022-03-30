import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Accordion, Badge, Button, Card } from "react-bootstrap";
import MainScreen from "../../components/MainScreen";
import axios from "axios";

const MyNotes = () => {
	const [notes, setNotes] = useState([]);

	const deleteHandler = (id) => {
		if (window.confirm("Are you sure?")) {
		}
	};

	console.log(notes);

	const fetchNotes = async () => {
		// const data = await axios.get("http://localhost:5000/api/notes"); // since we added proxy line to frontend->package.json we can change this to
		// const data = await axios.get("/api/notes");
		const { data } = await axios.get("/api/notes"); // destructure the data from the response array so you only have the data variable
		setNotes(data);
	};

	useEffect(() => {
		console.log("IAMHERE");
		fetchNotes();
	}, []);

	return (
		<MainScreen title="Welcome back Chris Karagiannis">
			<Link to="/createnote" style={{ flex: 1 }}>
				<Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
					Create New Note
				</Button>
			</Link>
			<Accordion defaultActiveKey="0">
				{notes.map((note) => (
					<Accordion.Item key={note._id} eventKey={note._id}>
						<Card style={{ margin: 10 }}>
							<Accordion.Header>
								<Card.Header style={{ display: "flex" }}>
									<span
										style={{
											color: "black",
											textDecoration: "none",
											flex: 1,
											cursor: "pointer",
											alignSelf: "center",
											fontSize: 18,
										}}
									>
										{note.title} / {note._id}
										&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
									</span>
									<div>
										<Button href={`/note/${note._id}`}>
											Edit
										</Button>
										<>
											<Button
												variant="danger"
												className="mx-2"
												onClick={() =>
													deleteHandler(note._id)
												}
											>
												Delete
											</Button>
										</>
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
											Created on - Date
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
