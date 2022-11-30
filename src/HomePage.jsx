import React from "react";
import { Container } from "react-bootstrap";

import ItemRow from "./ItemRow";

const HomePage = () => {
	return (
		<Container fluid className="homepage">
			<ItemRow rowTitle={"Most Trending"} />
			<ItemRow rowTitle={"Action Films"} />
			<ItemRow rowTitle={"Super Heros"} />
			<ItemRow rowTitle={"Most Trending"} />
		</Container>
	);
};

export default HomePage;
