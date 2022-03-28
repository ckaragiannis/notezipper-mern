import React from "react";
import {
	Navbar,
	Nav,
	NavDropdown,
	Container,
	Form,
	FormControl,
} from "react-bootstrap";

const Header = () => {
	return (
		<Navbar bg="primary" expand="lg" variant="dark">
			<Container>
				<Navbar.Brand href="/">VERA Luxury Pools</Navbar.Brand>
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
						<Nav.Link href="#action1">My Notes</Nav.Link>
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
