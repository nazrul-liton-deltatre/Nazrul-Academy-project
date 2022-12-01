import React, { useContext } from "react";
import postureImage from "../assets/classicHorror.jpeg";
import SpatialNavigation, { Focusable } from "react-js-spatial-navigation";
import { AssetContext } from "../AssetContext";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
	const navigateTo = useNavigate();
	const { setAssetToViewObject } = useContext(AssetContext);

	const watchVideo = (objectId) => {
		setAssetToViewObject(objectId);
		const urlToNavigateTo = `/video` + objectId;
		navigateTo(urlToNavigateTo);
	};
	return (
		<>
			<SpatialNavigation>
				<div className="hero-image-block">
					<img src={postureImage} alt="" srcSet="" />
					<div className="nav-block">
						<ul>
							<li style={{ color: "red" }}>Movieflix</li>
							<Focusable onClickEnter={() => navigateTo("/")}>
								<a href="/">
									<li>home</li>
								</a>
							</Focusable>
							<Focusable onClickEnter={() => navigateTo("/")}>
								<a href="/">
									<li>most trending</li>
								</a>
							</Focusable>
						</ul>
					</div>
					<div className="hero-asset-info">
						<h1>A Classic Horror Story</h1>
						<span>
							Lorem ipsum dolor sit amet, consectetur adipisicing elit.
							Obcaecati laudantium saepe temporibus earum nemo dolorum
							blanditiis veniam, error officia quam cupiditate, praesentium,
							architecto tempora in molestias quo hic nulla quos?
						</span>
						<Focusable onClickEnter={() => watchVideo(1)}>
							<button>Watch Now</button>
						</Focusable>
					</div>
				</div>
			</SpatialNavigation>
		</>
	);
};

export default NavBar;
