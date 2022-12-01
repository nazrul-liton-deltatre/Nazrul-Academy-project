import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";

const NavBar = () => {
	return (
		<>
			<Navbar bg="dark" expand="lg">
				<Container>
					<Navbar.Brand
						style={{
							color: "white",
							fontWeight: 700,
							letterSpacing: "1.5px",
							fontSize: "34px",
						}}
						href="#home"
					>
						Netflix
					</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="justify-content-end">
							<Nav.Link style={{ color: "white", fontWeight: 800 }} href="/">
								Home
							</Nav.Link>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</>
	);
};

export default NavBar;
