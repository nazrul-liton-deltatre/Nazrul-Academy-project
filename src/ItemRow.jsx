import React, { useState } from "react";
import SpatialNavigation, {
	Focusable,
	FocusableSection,
} from "react-js-spatial-navigation";

import { Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { dummyVideoList } from "./data";

const ItemRow = ({ rowTitle }) => {
	const [active, setActive] = useState(false);
	const navigateTo = useNavigate();
	return (
		<>
			<SpatialNavigation>
				<Row className="row-top">
					<Focusable>
						<span>{rowTitle}</span>
					</Focusable>
				</Row>
				<Row>
					{dummyVideoList.map((anObjectMapped, i) => {
						const urlToNavigateTo = `/video` + anObjectMapped.id;
						return (
							<Col xl={2} key={anObjectMapped.id} className="row-list-item">
								<Focusable onClickEnter={() => navigateTo(urlToNavigateTo)}>
									<img
										className="list-item"
										tabIndex={anObjectMapped.id}
										src={anObjectMapped.imgUrl}
										alt=""
									/>
								</Focusable>
							</Col>
						);
					})}
				</Row>
			</SpatialNavigation>
		</>
	);
};

export default ItemRow;
