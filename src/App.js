import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./Screens/Signin";
import SignUp from "./Screens/Signup";
import Home from "./Screens/Home";

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Routes>
					<Route exact path="/" element={<SignIn />} />
					<Route path="/Signup" element={<SignUp />} />
					<Route path="/Home" element={<Home />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}
export default App;
