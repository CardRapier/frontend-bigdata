import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MainMovies(){

    const [popularMovies,setPopularMovies] = useState([])
    const [likedMovies,setLikedMovies] = useState([])
    const [favoriteMovies,setFavoriteMovies] = useState([])

    useEffect(() => {
        const songsAux = [
            {
                "song_id": 1,
                "song_artist":"Masluma",
                "song_title":"Piece of shit"
            },
            {
                "song_id": 2,
                "song_artist":"Masluma",
                "song_title":"Piece of shit"
            },
            {
                "song_id": 3,
                "song_artist":"Masluma",
                "song_title":"Piece of shit"
            },
            {
                "song_id": 4,
                "song_artist":"Masluma",
                "song_title":"Piece of shit"
            },
            {
                "song_id": 5,
                "song_artist":"Masluma",
                "song_title":"Piece of shit"
            },
            {
                "song_id": 6,
                "song_artist":"Masluma",
                "song_title":"Piece of shit"
            },
            {
                "song_id": 7,
                "song_artist":"Masluma",
                "song_title":"Piece of shit"
            }
        ]
        getFavoriteMovies()
        getPopularMovies()
        getLikedMovies()
        setFavoriteMovies(songsAux)
        setPopularMovies(songsAux)
        setLikedMovies(songsAux)
    },[]);

    const getFavoriteMovies = () => {
        axios.get(process.env.REACT_APP_API_URL + '/recomendation/movies/')
        .then(res => {
            setFavoriteMovies(res.data.movies)
        })
        .catch(err => {
            console.log(err)
        })
    }

    const getPopularMovies = () => {
        axios.get(process.env.REACT_APP_API_URL + '/recomendation/movies/popular/')
        .then(res => {
            setPopularMovies(res.data.movies)
        })
        .catch(err => {
            console.log(err)
        })
    }

    const getLikedMovies = () => {
        axios.get(process.env.REACT_APP_API_URL + '/recomendation/movies/most-liked/')
        .then(res => {
            setLikedMovies(res.data.movies)
        })
        .catch(err => {
            console.log(err)
        })
    }

    

    return(
        <div className="container mt-5">
            <div className="row mt-5">
                <h1>Recommended for you</h1>
            </div>
            <div className="row mt-3">
                {favoriteMovies.map((song) => { return (
                    <div key={song.song_id} className="col-md-3 mt-3">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{song.song_title}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">{song.song_artist}</h6>
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
                {likedMovies.map((song) => { return (
                    <div key={song.song_id} className="col-md-3 mt-3">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{song.song_title}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">{song.song_artist}</h6>
                                <p>Details</p>
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
                {popularMovies.map((song) => { return (
                    <div key={song.song_id} className="col-md-3 mt-3">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{song.song_title}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">{song.song_artist}</h6>
                                <p>Details</p>
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