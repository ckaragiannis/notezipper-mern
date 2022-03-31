import React from "react";
import MainScreen from "../../";

const RegisterScreen = () => {
	return (
		<MainScreen title="REGISTER">
			<div className="loginContainer">
				{error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
				{message && (
					<ErrorMessage variant="danger">{message}</ErrorMessage>
				)}
				{loading && <Loading />}
				<Form onSubmit={submitHandler}>
					<Form.Group controlId="name">
						<Form.Label>Name</Form.Label>
						<Form.Control
							type="name"
							value={name}
							placeholder="Enter name"
							onChange={(e) => setName(e.target.value)}
						/>
					</Form.Group>

					<Form.Group controlId="formBasicEmail">
						<Form.Label>Email address</Form.Label>
						<Form.Control
							type="email"
							value={email}
							placeholder="Enter email"
							onChange={(e) => setEmail(e.target.value)}
						/>
					</Form.Group>

					<Form.Group controlId="formBasicPassword">
						<Form.Label>Password</Form.Label>
						<Form.Control
							type="password"
							value={password}
							placeholder="Password"
							onChange={(e) => setPassword(e.target.value)}
						/>
					</Form.Group>

					<Form.Group controlId="confirmPassword">
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
					<Form.Group controlId="pic">
						<Form.Label>Profile Picture</Form.Label>
						<Form.File
							onChange={(e) => postDetails(e.target.files[0])}
							id="custom-file"
							type="image/png"
							label="Upload Profile Picture"
							custom
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
