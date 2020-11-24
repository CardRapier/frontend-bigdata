import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MainSongs(){

    const [popularSongs,setPopularSongs] = useState([])
    const [likedSongs,setLikedSongs] = useState([])
    const [favoriteSongs,setFavoriteSongs] = useState([])

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
        getFavoriteSongs()
        getPopularSongs()
        getLikedSongs()
        setFavoriteSongs(songsAux)
        setPopularSongs(songsAux)
        setLikedSongs(songsAux)
    },[]);

    const getFavoriteSongs = () => {
        axios.get(process.env.REACT_APP_API_URL + '/recomendation/songs/')
        .then(res => {
            setFavoriteSongs(res.data.songs)
        })
        .catch(err => {
            console.log(err)
        })
    }

    const getPopularSongs = () => {
        axios.get(process.env.REACT_APP_API_URL + '/recomendation/songs/popular/')
        .then(res => {
            setPopularSongs(res.data.songs)
        })
        .catch(err => {
            console.log(err)
        })
    }

    const getLikedSongs = () => {
        axios.get(process.env.REACT_APP_API_URL + '/recomendation/songs/most-liked/')
        .then(res => {
            setLikedSongs(res.data.songs)
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
                {favoriteSongs.map((song) => { return (
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
                <h1>Most liked songs</h1>
            </div>
            <div className="row mt-3">
                {likedSongs.map((song) => { return (
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
                <h1>Popular songs</h1>
            </div>
            <div className="row mt-3">
                {likedSongs.map((song) => { return (
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

export default MainSongs;