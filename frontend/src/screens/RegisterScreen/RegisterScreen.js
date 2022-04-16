import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import axios from "axios";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
// import { register } from "../../actions/userActions";
import MainScreen from "../../components/MainScreen";
import { useNavigate } from "react-router-dom";
import "./RegisterScreen.css";
import { register } from "./../../actions/userActions";

const RegisterScreen = () => {
	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [pic, setPic] = useState(
		"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
	);
	const [password, setPassword] = useState("");
	const [confirmpassword, setConfirmPassword] = useState("");
	const [message, setMessage] = useState(null); // this const is used for handling error messages
	const [picMessage, setPicMessage] = useState(null);
	// const [error, setError] = useState(false);
	// const [loading, setLoading] = useState(false);

	const navigate = useNavigate();

	const dispatch = useDispatch();
	const userRegister = useSelector((state) => state.userRegister); // userRegister is the name of our reducer in store.js
	const { loading, error, userInfo } = userRegister;

	useEffect(() => {
		// const userInfo = localStorage.getItem("userInfo");
		if (userInfo) {
			// if there is something inside of the userInfo variable, then navigate the person to the /mynotes route/page right away
			navigate("/login", {
				state: {
					registered: true,
					name: userInfo.name,
				},
			});

			// EXAMPLE: navigate("/quiz", { replace: true }); *** Here (React Router Version 6) if you want to se replace in your code
			// navigate(-1); // Here (React Router Version 6) *** if you want to use goBack() in your code
		}
	}, [navigate, userInfo]); // so whenever the navigate (which it doesnt in this case) changes this will trigger this useEffect function to run

	const submitHandler = async (e) => {
		e.preventDefault();

		if (password !== confirmpassword) {
			setMessage("Passwords do not match");
		} else {
			setMessage(null);
			dispatch(register(name, pic, email, password));

			// OLD WAY OF DOING THINGS WITHOUT REDUX
			// try {
			//	const config = {
			// 		headers: {
			// 			"Content-type": "application/json",
			// 		},
			// 	};
			// 	setLoading(true);

			// 	const { data } = await axios.post(
			// 		"/api/users",
			// 		{
			// 			name,
			// 			pic,
			// 			email,
			// 			password,
			// 		},
			// 		config
			// 	);
			// 	console.log(
			// 		"In submitHandler() function and data is: " +
			// 			JSON.stringify(data)
			// 	);
			// 	setLoading(false);
			// 	// localStorage.setItem("userInfo", JSON.stringify(data));
			// 	navigate("/login");
			// } catch (error) {
			// 	console.log(error);
			// 	setError(error.response.data.message);
			// 	setLoading(false);
			// }
		}
		console.log(message);
	};

	const postDetails = (pics) => {
		if (!pics) {
			return setPicMessage("Please select an Image");
		}
		setPicMessage(null);

		if (pics.type === "image/jpeg" || pics.type === "images/png") {
			const data = new FormData();
			data.append("file", pics);
			data.append("upload_preset", "notezipper");
			data.append("cloud_name", "piyushproj");
			fetch("https://api.cloudinary.com/v1_1/piyushproj/image/upload", {
				method: "post",
				body: data,
			})
				.then((res) => res.json())
				.then((data) => {
					console.log(data);
					setPic(data.url.toString());
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			return setPicMessage("Please Select an Image");
		}
	};

	return (
		<MainScreen title="REGISTER">
			<div className="loginContainer">
				{error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
				{message && (
					<ErrorMessage variant="danger">{message}</ErrorMessage>
				)}
				{loading && <Loading />}
				<Form onSubmit={submitHandler}>
					<Form.Group className="mb-3" controlId="name">
						<Form.Label>Name</Form.Label>
						<Form.Control
							type="name"
							value={name}
							placeholder="Enter name"
							onChange={(e) => setName(e.target.value)}
						/>
					</Form.Group>

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

					<Form.Group className="mb-3" controlId="confirmPassword">
						<Form.Label>Confirm Password</Form.Label>
						<Form.Control
							type="password"
							value={confirmpassword}
							placeholder="Confirm Password"
							onChange={(e) => setConfirmPassword(e.target.value)}
						/>
					</Form.Group>

					{picMessage && (
						<ErrorMessage variant="danger">
							{picMessage}
						</ErrorMessage>
					)}
					<Form.Group className="mb-3" controlId="pic">
						<Form.Label>Profile Picture</Form.Label>
						<Form.Control
							onChange={(e) => postDetails(e.target.files[0])}
							type="image/jpeg"
							label="Upload Profile Picture"
						/>
					</Form.Group>

					<Button variant="primary" type="submit">
						Register
					</Button>
				</Form>
				<Row className="py-3">
					<Col>
						Have an Account ? <Link to="/login">Login</Link>
					</Col>
				</Row>
			</div>
		</MainScreen>
	);
};

export default RegisterScreen;
