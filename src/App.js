import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import Login from "./Components/Login/Login";
import MainBooks from "./Components/Books/MainBooks";
import MainMovies from "./Components/Movies/MainMovies";
import MainSongs from "./Components/Songs/MainSongs";
import MovieDetail from "./Components/Movies/MovieDetail";
import Navbar from "./Components/Login/Navbar";
import Register from "./Components/Login/Register";
import SongDetail from "./Components/Songs/SongDetail";
import { useState } from "react";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <Router>
      <Navbar {...{ setLoggedIn, loggedIn }} />
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
        <Route path="/movies/:id">
          <MovieDetail />
        </Route>
        <Route
          render={(routeProps) => (
            <Login {...{ setLoggedIn, loggedIn, ...routeProps }} />
          )}
        />
      </Switch>
    </Router>
  );
}
export default App;
