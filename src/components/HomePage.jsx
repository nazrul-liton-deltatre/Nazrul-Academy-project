import React from "react";
import { Container } from "react-bootstrap";

import ItemRow from "./ItemRow";
import NavBar from "./Navbar";

const HomePage = () => {
	return (
		<>
			<NavBar />
			<Container fluid className="homepage">
				<ItemRow rowTitle={"Most Trending"} />
				<ItemRow rowTitle={"Action Films"} />
				<ItemRow rowTitle={"Super Heros"} />
				<ItemRow rowTitle={"Limited Releases"} />
			</Container>
		</>
	);
};

export default HomePage;
