import "./styling/App.css";
import "shaka-player/dist/controls.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { createContext, useState } from "react";

import VideoPlayer from "./components/VideoPlayer1";
import HomePage from "./components/HomePage";
import { AssetContext } from "./AssetContext";

export const assetToViewIdContext = createContext();

function App() {
	const [assetToViewObject, setAssetToViewObject] = useState();

	return (
		<AssetContext.Provider value={{ assetToViewObject, setAssetToViewObject }}>
			<Router>
				<Routes>
					<Route
						path="/video:id"
						assetToViewObject={assetToViewObject}
						element={<VideoPlayer />}
					/>
					<Route
						path="/"
						assetToViewObject={assetToViewObject}
						element={<HomePage />}
					/>
				</Routes>
			</Router>
		</AssetContext.Provider>
	);
}

export default App;
