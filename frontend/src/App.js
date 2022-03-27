// import logo from "./logo.svg";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";

// const App = () => <div className="App">Hello WORLD!</div>;
//
// OR
//
function App() {
	// This is JSX code which is an html like syntax used by REACT to render elements: sntax extension to JavaScript
	// For example, in the past we use class="" in HTML and in react (JSX) we use className=""
	return (
		<>
			<Header />
			<main style={{ minHeight: "93vh" }}></main>
			<Footer />
		</>
	);
}

export default App;
