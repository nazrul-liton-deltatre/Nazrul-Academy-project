import React, { useState, useContext } from "react";
import SpatialNavigation, { Focusable } from "react-js-spatial-navigation";

import { Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { dummyVideoList } from "../data/data";
import { AssetContext } from "../AssetContext";

const ItemRow = ({ rowTitle }) => {
	const [active, setActive] = useState(false);
	const { setAssetToViewObject } = useContext(AssetContext);
	const navigateTo = useNavigate();

	const watchVideo = (objectId) => {
		setAssetToViewObject(objectId);
		const urlToNavigateTo = `/video` + objectId;
		navigateTo(urlToNavigateTo);
	};
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
						const id = anObjectMapped.id;
						const urlToNavigateTo = `/video` + id;
						return (
							<Col xl={2} key={anObjectMapped.id} className="row-list-item">
								<Focusable onClickEnter={() => watchVideo(id)}>
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
