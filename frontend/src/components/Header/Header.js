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

const Header = () => {
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
						<NavDropdown
							title="Chris Karagiannis"
							id="navbarScrollingDropdown"
						>
							<NavDropdown.Item href="#action3.1">
								My Profile
							</NavDropdown.Item>
							<NavDropdown.Divider />
							<NavDropdown.Item href="#action3.3">
								Logout
							</NavDropdown.Item>
						</NavDropdown>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default Header;
