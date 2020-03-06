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
				<Route exact path="/" render={() => <NewsContainer />}/>
				<Route exact path="/belfold" render={() => <h1>Belföldi hírek</h1>}/>
				<Route exact path="/kulfold" render={() => <h1>Külföldi hírek</h1>}/>
				<Route exact path="/gazdasag" render={() => <h1>Gazdasági hírek</h1>}/>
			</Switch>
			{/* <NewsContainer /> */}
		</div>
	);
}

export default App;
