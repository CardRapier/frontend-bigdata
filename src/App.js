import Register from './Components/Login/Register';
import Login from './Components/Login/Login';
import Navbar from './Components/Login/Navbar';

import MainSongs from './Components/Songs/MainSongs'
import SongDetail from './Components/Songs/SongDetail'

import MainBooks from './Components/Books/MainBooks'
import MainMovies from './Components/Movies/MainMovies'


import {useState} from 'react'

import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";

function App() {
    const [loggedIn, setLoggedIn] = useState(false)

    return (
        <Router>
        <Navbar {...{setLoggedIn,loggedIn}}/>
        <Switch>
            <Route exact path="/register">
                <Register />
            </Route>
            <Route exact path="/songs">
                <MainSongs />
            </Route>
            <Route path="/songs/:id">
                <SongDetail />
            </Route>
            <Route exact path="/books">
                <MainBooks />
            </Route>
            <Route exact path="/movies">
                <MainMovies />
            </Route>
            <Route render={
                (routeProps) => <Login {...{setLoggedIn,loggedIn, ...routeProps}} />
            } />
        </Switch>
        </Router> 
    );
}
export default App;