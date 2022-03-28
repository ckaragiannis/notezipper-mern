import React from "react";
import { Container, Row } from "react-bootstrap";
import "./LandingPage.css";

const LandingPage = () => {
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
								<button size="lg" className="landingbutton">
									Login
								</button>
							</a>
							<a href="/register">
								<button size="lg" className="landingbutton">
									Register
								</button>
							</a>
						</div>
					</div>
				</Row>
			</Container>
		</div>
	);
};

export default LandingPage;
