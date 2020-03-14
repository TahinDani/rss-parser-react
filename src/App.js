import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import NewsContainer from './components/NewsContainer'
import Navbar from './components/Navbar'

function App() {
	return (
		<div className="App">
			<Navbar />
			<Switch>
				<Route exact path="/" render={() => <Redirect to="/all" />}/>
				<Route exact path="/:category" render={(routeProps) => <NewsContainer {...routeProps} />}/>
			</Switch>
		</div>
	);
}

export default App;
