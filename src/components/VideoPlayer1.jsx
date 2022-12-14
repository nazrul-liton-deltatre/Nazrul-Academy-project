import React, { useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import SpatialNavigation, { Focusable } from "react-js-spatial-navigation";
import { dummyVideoList } from "../data/data";

import "shaka-player/dist/controls.css";
import { AssetContext } from "../AssetContext";
const shaka = require("shaka-player/dist/shaka-player.ui.js");

const VideoPLayer = () => {
	const navigate = useNavigate();

	const videoComponent = useRef();
	const videoContainer = useRef(null);
	const myRef = useRef();
	const { assetToViewObject } = useContext(AssetContext);

	const onErrorEvent = (event) => {
		// Extract the shaka.util.Error object from the event.
		onError(event.detail);
	};

	const onError = (error) => {
		// Log the error.
		console.error("Error code", error.code, "object", error);
	};

	const filtered = dummyVideoList.filter((selected) => {
		return selected.id === Number(assetToViewObject);
	});

	useEffect(() => {
		//Link to MPEG-DASH video
		var manifestUri = filtered[0].videoURL;

		//Getting reference to video and video container on DOM
		const video = videoComponent.current;
		const videoContainer5 = videoContainer.current;

		//Initialize shaka player
		const player = new shaka.Player(video);

		//Setting UI configuration JSON object
		const uiConfig = {};
		const uiControls = {};

		//Setting up shaka player UI
		const ui = new shaka.ui.Overlay(player, videoContainer5, video);

		ui.configure(uiConfig); //configure UI
		ui.getControls(uiControls);

		// Listen for error events.
		player.addEventListener("error", onErrorEvent);

		// Try to load a manifest.
		// This is an asynchronous process.
		player
			.load(manifestUri)
			.then(function () {
				// This runs if the asynchronous load is successful.
				console.log("The video has now been loaded!");
			})
			.catch(onError); // onError is executed if the asynchronous load fails
	}, []);

	const playVideo = () => {
		videoComponent.current.play();
	};
	const pauseVideo = () => {
		videoComponent.current.pause();
	};
	const fastForward = () => {
		videoComponent.current.currentTime += 10;
	};
	const rewindVid = () => {
		if (videoComponent.current.currentTime >= 5) {
			return (videoComponent.current.currentTime -= 5);
		}
	};
	const restartVid = () => {
		videoComponent.current.currentTime = 0;
	};

	return (
		<SpatialNavigation>
			<Focusable>
				<div className="video-container" controls ref={videoContainer}>
					<video
						className="shaka-video"
						ref={videoComponent}
						poster="//shaka-player-demo.appspot.com/assets/poster.jpg"
					/>
				</div>
			</Focusable>
			<div className="video-bottom-nav">
				<a href="/" ref={myRef}>
					<Focusable onClickEnter={() => navigate("/", { replace: true })}>
						<button>Back</button>
					</Focusable>
				</a>
				<Focusable onClickEnter={playVideo}>
					<button>play</button>
				</Focusable>
				<Focusable onClickEnter={pauseVideo}>
					<button>pause</button>
				</Focusable>
				<Focusable onClickEnter={fastForward}>
					<button>Fast forward</button>
				</Focusable>
				<Focusable onClickEnter={rewindVid}>
					<button>Rewind</button>
				</Focusable>
				<Focusable onClickEnter={restartVid}>
					<button>Restart</button>
				</Focusable>
			</div>
		</SpatialNavigation>
	);
};

export default VideoPLayer;
