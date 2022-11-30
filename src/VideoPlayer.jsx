import React from "react";
import SpatialNavigation, { Focusable } from "react-js-spatial-navigation";
import { dummyVideoList } from "./data";

import "shaka-player/dist/controls.css";
const shaka = require("shaka-player/dist/shaka-player.ui.js");
//Creating class component
class VideoPlayer extends React.PureComponent {
	constructor(props) {
		super(props);

		//Creating reference to store video component on DOM
		this.videoComponent = React.createRef();

		//Creating reference to store video container on DOM
		this.videoContainer = React.createRef();

		//Initializing reference to error handlers
		this.onErrorEvent = this.onErrorEvent.bind(this);
		this.onError = this.onError.bind(this);
		//Creates References to Go Back page
		this.goBack = this.goBack.bind(this);
		this.playVideo = this.playVideo.bind(this);
		this.pauseVideo = this.pauseVideo.bind(this);
		this.fastForward = this.fastForward.bind(this);
		this.rewindVid = this.rewindVid.bind(this);
		this.restartVid = this.restartVid.bind(this);

		this.myRef = React.createRef();
	}

	onErrorEvent(event) {
		// Extract the shaka.util.Error object from the event.
		this.onError(event.detail);
	}

	onError(error) {
		// Log the error.
		console.error("Error code", error.code, "object", error);
	}

	goBack() {
		this.myRef.current.click();
	}

	componentDidMount() {
		const url = window.location.href;
		const assetID = url.split("").pop();
		const filtered = dummyVideoList.filter((selected) => {
			return selected.id === Number(assetID);
		});
		//Link to MPEG-DASH video
		var manifestUri = filtered[0].videoURL;

		//Getting reference to video and video container on DOM
		this.video = this.videoComponent.current;
		const videoContainer = this.videoContainer.current;

		//Initialize shaka player
		var player = new shaka.Player(this.video);

		//Setting UI configuration JSON object
		const uiConfig = {};
		const uiControls = {};

		//Configuring elements to be displayed on video player control panel
		// uiConfig["controlPanelElements"] = [
		// 	"play_pause",
		// 	"rewind",
		// 	"fast_forward",
		// 	"mute",
		// 	"volume",
		// 	"time_and_duration",
		// 	"fullscreen",
		// 	"overflow_menu",
		// 	"cast",
		// ];
		// uiConfig["playbackRates"] = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];
		// uiConfig["fastForwardRates"] = [2, 4, 8, 1];
		// uiConfig["rewindRates"] = [-1, -2, -4, -8];
		// uiControls["Controls"] = ["BigPLayButton"];

		//Setting up shaka player UI
		const ui = new shaka.ui.Overlay(player, videoContainer, this.video);

		ui.configure(uiConfig); //configure UI
		ui.getControls(uiControls);

		// Listen for error events.
		player.addEventListener("error", this.onErrorEvent);

		// Try to load a manifest.
		// This is an asynchronous process.
		player
			.load(manifestUri)
			.then(function () {
				// This runs if the asynchronous load is successful.
				console.log("The video has now been loaded!");
			})
			.catch(this.onError); // onError is executed if the asynchronous load fails.
	}
	playVideo() {
		this.video.play();
	}
	pauseVideo() {
		this.video.pause();
	}
	fastForward() {
		this.video.currentTime += 10;
	}
	rewindVid() {
		if (this.video.currentTime >= 5) {
			return (this.video.currentTime -= 5);
		}
	}
	restartVid() {
		this.video.currentTime = 0;
	}

	render() {
		return (
			<SpatialNavigation>
				<Focusable>
					<div className="video-container" controls ref={this.videoContainer}>
						<video
							className="shaka-video"
							ref={this.videoComponent}
							poster="//shaka-player-demo.appspot.com/assets/poster.jpg"
						/>
					</div>
				</Focusable>
				<div className="video-bottom-nav">
					<a href="/" ref={this.myRef}>
						<Focusable onClickEnter={this.goBack}>
							<button>Back</button>
						</Focusable>
					</a>
					<Focusable onClickEnter={this.playVideo}>
						<button>play</button>
					</Focusable>
					<Focusable onClickEnter={this.pauseVideo}>
						<button>pause</button>
					</Focusable>
					<Focusable onClickEnter={this.fastForward}>
						<button>Fast forward</button>
					</Focusable>
					<Focusable onClickEnter={this.rewindVid}>
						<button>Rewind</button>
					</Focusable>
					<Focusable onClickEnter={this.restartVid}>
						<button>Restart</button>
					</Focusable>
				</div>
			</SpatialNavigation>
		);
	}
}

export default VideoPlayer;
