import React, { useContext, useState } from "react";
import postureImage from "../assets/classicHorror.jpeg";
import SpatialNavigation, { Focusable } from "react-js-spatial-navigation";
import { AssetContext } from "../AssetContext";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
	const navigateTo = useNavigate();
	const { setAssetToViewObject } = useContext(AssetContext);
	const [cssVal, setCssVal] = useState("");
	const [cssVal1, setCssVal1] = useState("");
	const [cssVal2, setCssVal2] = useState("");

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
							<Focusable
								onFocus={() => {
									console.log("hello");
									setCssVal("hide");
								}}
								onUnfocus={() => {
									console.log("hello");
									setCssVal("");
								}}
								onClickEnter={() => navigateTo("/")}
							>
								<a href="/" className={cssVal}>
									<li>home</li>
								</a>
							</Focusable>
							<Focusable
								onFocus={() => {
									console.log("hello");
									setCssVal1("hide");
								}}
								onUnfocus={() => {
									console.log("hello");
									setCssVal1("");
								}}
								onClickEnter={() => navigateTo("/")}
							>
								<a href="/" className={cssVal1}>
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
						<Focusable
							onFocus={() => {
								console.log("hello");
								setCssVal2("hide");
							}}
							onUnfocus={() => {
								console.log("hello");
								setCssVal2("");
							}}
							onClickEnter={() => watchVideo(1)}
							className={cssVal2}
						>
							<button>Watch Now</button>
						</Focusable>
					</div>
				</div>
			</SpatialNavigation>
		</>
	);
};

export default NavBar;
