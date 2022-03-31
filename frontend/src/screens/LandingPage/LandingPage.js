import React, { useEffect } from "react";
import { Container, Row, Button } from "react-bootstrap";
import "./LandingPage.css";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
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

	return (
		<div className="main">
			<Container>
				<Row>
					<div className="intro-text">
						<div>
							<h1 className="title">Welcome to Note Zipper</h1>
							<p className="subtitle">
								One safe place for all your Notes!
							</p>
						</div>
						<div className="buttonContainer">
							<a href="/login">
								<Button size="lg" className="landingbutton">
									Login
								</Button>
							</a>
							<a href="/register">
								<Button
									size="lg"
									className="landingbutton"
									variant="outline-primary"
								>
									SignUp
								</Button>
							</a>
						</div>
					</div>
				</Row>
			</Container>
		</div>
	);
};

export default LandingPage;
