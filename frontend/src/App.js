// import logo from "./logo.svg";
import "./App.css";

// const App = () => <div className="App">Hello WORLD!</div>;
//
// OR
//
function App() {
	// This is JSX code which is an html like syntax used by REACT to render elements: sntax extension to JavaScript
	// For example, in the past we use class="" in HTML and in react (JSX) we use className=""
	const hello = "World!!!!!!";
	return (
		<>
			<div className="App">Hello {hello} 2</div>
		</>
	);
}

export default App;
