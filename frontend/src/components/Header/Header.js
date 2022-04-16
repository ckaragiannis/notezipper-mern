import React from "react";
import {
	Navbar,
	Nav,
	NavDropdown,
	Container,
	Form,
	FormControl,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./../../actions/userActions";

const Header = () => {
	const navigate = useNavigate();

	const dispatch = useDispatch();
	const userLogin = useSelector((state) => state.userLogin); // userLogin is the name of our reducer in store.js
	const { userInfo } = userLogin;

	const logoutHandler = (e) => {
		e.preventDefault();
		if (userInfo) {
			localStorage.removeItem("userInfo");
			//navigate("/");
			dispatch(logout());
			navigate("/login");
			// , {
			// state: {
			// 	id: 1,
			// 	name: "chris karagiannis",
			// },
		}
	};

	return (
		<Navbar bg="primary" expand="lg" variant="dark">
			<Container>
				<Navbar.Brand>
					<Link to="/">VERA Luxury Pools</Link>
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="navbarScroll" />
				<Navbar.Collapse id="navbarScroll">
					<Nav className="m-auto">
						<Form className="d-flex">
							<FormControl
								type="search"
								placeholder="Search"
								className="mr-sm-2"
								aria-label="Search"
							/>
						</Form>
					</Nav>
					<Nav>
						<Nav.Link>
							<Link to="/testingcodehere">Testing Code Here</Link>
						</Nav.Link>
						<Nav.Link>
							<Link to="/mynotes">My Notes</Link>
						</Nav.Link>
						{userInfo != null && (
							<NavDropdown
								title={
									userInfo != null ? userInfo.name : "UNKNOWN"
								}
								id="navbarScrollingDropdown"
							>
								<NavDropdown.Item href="/profile">
									My Profile
								</NavDropdown.Item>
								<NavDropdown.Divider />
								<NavDropdown.Item onClick={logoutHandler}>
									Logout
								</NavDropdown.Item>
							</NavDropdown>
						)}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default Header;
