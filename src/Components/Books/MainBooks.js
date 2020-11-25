import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MainBooks(){

    const [popularBooks,setPopularBooks] = useState([])
    const [likedBooks,setLikedBooks] = useState([])
    const [favoriteBooks,setFavoriteBooks] = useState([])

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
        getFavoriteBooks()
        getPopularBooks()
        getLikedBooks()
        setFavoriteBooks(songsAux)
        setPopularBooks(songsAux)
        setLikedBooks(songsAux)
    },[]);

    const getFavoriteBooks = () => {
        axios.get(process.env.REACT_APP_API_URL + '/recomendation/books/')
        .then(res => {
            setFavoriteBooks(res.data.books)
        })
        .catch(err => {
            console.log(err)
        })
    }

    const getPopularBooks = () => {
        axios.get(process.env.REACT_APP_API_URL + '/recomendation/books/popular/')
        .then(res => {
            setPopularBooks(res.data.books)
        })
        .catch(err => {
            console.log(err)
        })
    }

    const getLikedBooks = () => {
        axios.get(process.env.REACT_APP_API_URL + '/recomendation/books/most-liked/')
        .then(res => {
            setLikedBooks(res.data.books)
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
                {favoriteBooks.map((song) => { return (
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
                <h1>Most liked books</h1>
            </div>
            <div className="row mt-3">
                {likedBooks.map((song) => { return (
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
                <h1>Popular books</h1>
            </div>
            <div className="row mt-3">
                {popularBooks.map((song) => { return (
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

export default MainBooks;