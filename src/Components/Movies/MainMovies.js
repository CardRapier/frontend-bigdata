import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import axios from "axios";

function MainMovies() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [likedMovies, setLikedMovies] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [searchedMovies, setSearchedMovies] = useState([]);

  useEffect(() => {
    getFavoriteMovies();
    getPopularMovies();
    getLikedMovies();
  }, []);

  const getFavoriteMovies = () => {
    axios
      .post(process.env.REACT_APP_API_URL + "/recommendation/movies/", {
        id: localStorage.getItem("id_user"),
      })
      .then((res) => {
        setFavoriteMovies(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getPopularMovies = () => {
    axios
      .get(process.env.REACT_APP_API_URL + "/recommendation/movies/populars/")
      .then((res) => {
        setPopularMovies(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getLikedMovies = () => {
    axios
      .get(process.env.REACT_APP_API_URL + "/recommendation/movies/most-liked/")
      .then((res) => {
        setLikedMovies(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const searchMovies = (text) => {
    if (text.target.value !== "") {
      axios
        .post(process.env.REACT_APP_API_URL + "/search/movie/", {
          search: text.target.value,
        })
        .then((res) => {
          setSearchedMovies(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setSearchedMovies([]);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row mt-5">
        <h1>Search</h1>
        <input
          type="text"
          class="form-control"
          placeholder="Search"
          aria-label="Search"
          aria-describedby="basic-addon1"
          onChange={(event) => searchMovies(event)}
        />
      </div>
      <div className="row mt-3">
        {searchedMovies !== undefined ? (
          searchedMovies.map((movie) => {
            return (
              <div key={movie.movie_id} className="col-md-3 mt-3">
                <div className="card">
                  <div className="card-body">
                    <h6 className="card-title">{movie.movie_title}</h6>
                    <Link to={"/movies/" + movie.movie_id}>Details</Link>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        )}
      </div>

      <div className="row mt-5">
        <h1>Recommended for you</h1>
      </div>
      <div className="row mt-3">
        {favoriteMovies.map((movie) => {
          return (
            <div key={movie.movie_id} className="col-md-3 mt-3">
              <div className="card">
                <div className="card-body">
                  <h6 className="card-title">{movie.movie_title}</h6>
                  <Link to={"/movies/" + movie.movie_id}>Details</Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="row mt-3">
        <h1>Most liked movies</h1>
      </div>
      <div className="row mt-3">
        {likedMovies.map((movie) => {
          return (
            <div key={movie.movie_id} className="col-md-3 mt-3">
              <div className="card">
                <div className="card-body">
                  <h6 className="card-title">{movie.movie_title}</h6>
                  <Link to={"/movies/" + movie.movie_id}>Details</Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="row mt-3">
        <h1>Popular movies</h1>
      </div>
      <div className="row mt-3">
        {popularMovies.map((movie) => {
          return (
            <div key={movie.movie_id} className="col-md-3 mt-3">
              <div className="card">
                <div className="card-body">
                  <h6 className="card-title">{movie.movie_title}</h6>
                  <Link to={"/movies/" + movie.movie_id}>Details</Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MainMovies;
