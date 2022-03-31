// import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import LandingPage from "./screens/LandingPage/LandingPage";
import MyNotes from "./screens/MyNotes/MyNotes";
// import TestingCodeHere from "./screens/MyNotes/TestingCodeHere";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen/RegisterScreen";

// const App = () => <div className="App">Hello WORLD!</div>;
//
// OR
//
function App() {
	return (
		// This is JSX code which is an html like syntax used by REACT to render elements: sntax extension to JavaScript
		// For example, in the past we use class="" in HTML and in react (JSX) we use className=""
		<BrowserRouter>
			<Header />
			<main>
				<Routes>
					<Route path="/" element={<LandingPage />} exact />
					<Route path="/mynotes" element={<MyNotes />} exact />
					<Route path="/login" element={<LoginScreen />} exact />
					<Route
						path="/register"
						element={<RegisterScreen />}
						exact
					/>
					{/* <Route
						path="/testingcodehere"
						element={<TestingCodeHere />}
						exact
					/> */}
				</Routes>
			</main>
			<Footer />
		</BrowserRouter>
	);
}

export default App;
