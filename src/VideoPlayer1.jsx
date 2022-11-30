import React, { useEffect, useRef } from "react";
import SpatialNavigation, { Focusable } from "react-js-spatial-navigation";
import { dummyVideoList } from "./data";

import "shaka-player/dist/controls.css";
const shaka = require("shaka-player/dist/shaka-player.ui.js");

const VideoPLayer = () => {
	const videoComponent = useRef();
	const videoContainer = useRef();
	const myRef = useRef();

	const url = window.location.href;
	const assetID = url.split("").pop();
	const filtered = dummyVideoList.filter((selected) => {
		return selected.id === Number(assetID);
	});
	const video = videoComponent.current;

	useEffect(() => {
		//Link to MPEG-DASH video
		var manifestUri = filtered[0].videoURL;

		//Getting reference to video and video container on DOM
		const videoContainer = videoContainer.current;

		//Initialize shaka player
		var player = new shaka.Player(video);

		//Setting up shaka player UI
		const ui = new shaka.ui.Overlay(player, videoContainer, video);

		ui.configure(); //configure UI
		ui.getControls();

		// Try to load a manifest.
		// This is an asynchronous process.
		player
			.load(manifestUri)
			.then(function () {
				// This runs if the asynchronous load is successful.
				console.log("The video has now been loaded!");
			})
			.catch(onError); // onError is executed if the asynchronous load fails.
	}, []);

	const onErrorEvent = (event) => {
		// Extract the shaka.util.Error object from the event.
		onError(event.detail);
	};

	const onError = (error) => {
		// Log the error.
		console.error("Error code", error.code, "object", error);
	};

	const goBack = () => {
		myRef.current.click();
	};

	const playVideo = () => {
		video.play();
	};
	const pauseVideo = () => {
		video.pause();
	};
	const fastForward = () => {
		video.currentTime += 10;
	};
	const rewindVid = () => {
		if (video.currentTime >= 5) {
			return (video.currentTime -= 5);
		}
	};
	const restartVid = () => {
		video.currentTime = 0;
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
					<Focusable onClickEnter={goBack}>
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
