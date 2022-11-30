import "./App.css";
import "shaka-player/dist/controls.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import VideoPlayer from "./VideoPlayer";
import HomePage from "./HomePage";

function App() {
	return (
		<div>
			<Router>
				<Routes>
					<Route path="/video:id" element={<VideoPlayer />} />
					<Route path="/" element={<HomePage />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
