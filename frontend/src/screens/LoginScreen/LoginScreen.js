import React, { useState, useEffect } from "react";
import MainScreen from "../../components/MainScreen";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./LoginScreen.css";
import axios from "axios";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import { useNavigate } from "react-router-dom";

const LoginScreen = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(false);

	const navigate = useNavigate();

	useEffect(() => {
		const userInfo = localStorage.getItem("userInfo");
		if (userInfo) {
			// if there is something inside of the userInfo variable, then navigate the person to the /mynotes route/page right away
			navigate("/mynotes");
			// EXAMPLE: navigate("/quiz", { replace: true }); *** Here (React Router Version 6) if you want to se replace in your code
			// navigate(-1); // Here (React Router Version 6) *** if you want to use goBack() in your code
		}
	}, [navigate]); // so whenever the navigate (which it doesnt in this case) changes this will trigger this useEffect function to run

	const submitHandler = async (e) => {
		e.preventDefault();

		console.log(
			"\nIn frontend> submitHandler() function and email and password are: " +
				email,
			password
		);

		try {
			const config = {
				headers: { "Content-type": "application/json" },
			};
			setLoading(true);
			const { data } = await axios.post(
				"/api/users/login",
				{
					email,
					password,
				},
				config
			);
			console.log(data);
			localStorage.setItem("userInfo", JSON.stringify(data));
			setLoading(false);
			navigate("/mynotes"); // submit was successful, so just load the /mynotes page now
		} catch (error) {
			console.log(error);
			setError(error.response.data.message);
			setLoading(false);
		}
	};

	return (
		<MainScreen title="LOGIN">
			<div className="loginContainer">
				{error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
				{loading && <Loading />}
				<Form onSubmit={submitHandler}>
					<Form.Group className="mb-3" controlId="formBasicEmail">
						<Form.Label>Email address</Form.Label>
						<Form.Control
							type="email"
							value={email}
							placeholder="Enter email"
							onChange={(e) => setEmail(e.target.value)}
						/>
					</Form.Group>

					<Form.Group className="mb-3" controlId="formBasicPassword">
						<Form.Label>Password</Form.Label>
						<Form.Control
							type="password"
							value={password}
							placeholder="Password"
							onChange={(e) => setPassword(e.target.value)}
						/>
					</Form.Group>
					<Button variant="primary" type="submit">
						Submit
					</Button>
				</Form>
				<Row className="py-3">
					<Col>
						New Customer ? <Link to="/register">Register Here</Link>
					</Col>
				</Row>
			</div>
		</MainScreen>
	);
};

export default LoginScreen;
