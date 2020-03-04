import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import NewsContainer from './components/NewsContainer'
import Navbar from './components/Navbar'

function App() {
	return (
		<div className="App">
			<Navbar />
			<Switch>
				<Route exact path="/belfold" render={() => <h1>Belföldi hírek</h1>}/>
			</Switch>
			{/* <NewsContainer /> */}
		</div>
	);
}

export default App;
