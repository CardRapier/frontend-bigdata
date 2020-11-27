import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Link
  } from "react-router-dom";

function MainSongs(){

    const [popularSongs,setPopularSongs] = useState([])
    const [likedSongs,setLikedSongs] = useState([])
    const [favoriteSongs,setFavoriteSongs] = useState([])
    const [searchedSongs,setSearchedSongs] = useState([])


    useEffect(() => {
        getFavoriteSongs()
        getPopularSongs()
        getLikedSongs()
    },[]);

    const getFavoriteSongs = () => {
        axios.post(process.env.REACT_APP_API_URL + '/recommendation/songs/',{
            id: localStorage.getItem('id_user')
        })
        .then(res => {
            setFavoriteSongs(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }

    const searchSongs = (text) => {
        if(text.target.value !== ""){
            axios.post(process.env.REACT_APP_API_URL + '/search/song/',{
                search: text.target.value
            })
            .then(res => {
                setSearchedSongs(res.data)
            })
            .catch(err => {
                console.log(err)
            })
        }else{
            setSearchedSongs([])
        }
        
    }

    const getPopularSongs = () => {
        axios.get(process.env.REACT_APP_API_URL + '/recommendation/songs/populars/')
        .then(res => {
            setPopularSongs(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }

    const getLikedSongs = () => {
        axios.get(process.env.REACT_APP_API_URL + '/recommendation/songs/most-liked/')
        .then(res => {
            setLikedSongs(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }

    

    return(
        <div className="container mt-5">

            <div className="row mt-5">
                <h1>Search</h1>
                <input type="text" class="form-control" placeholder="Search" aria-label="Search" aria-describedby="basic-addon1" onChange={ (event) => searchSongs(event)} />
            </div>
            <div className="row mt-3">
            {searchedSongs !== undefined ?
                searchedSongs.map((song) => { return (
                    <div key={song.song_id} className="col-md-3 mt-3">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{song.song_title}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">{song.song_artist}</h6>
                                <Link to={"/songs/"+song.song_id}>Details</Link>
                            </div>
                        </div>
                    </div>
                );
                })
                : 
                <div class="spinner-border" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            }
            </div>

            <div className="row mt-5">
                <h1>Recommended for you</h1>
            </div>
            <div className="row mt-3">
            {favoriteSongs !== undefined ?
                favoriteSongs.map((song) => { return (
                    <div key={song.song_id} className="col-md-3 mt-3">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{song.song_title}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">{song.song_artist}</h6>
                                <Link to={"/songs/"+song.song_id}>Details</Link>
                            </div>
                        </div>
                    </div>
                );
                })
                : ''
            }
            </div>

            <div className="row mt-3">
                <h1>Most liked songs</h1>
            </div>
            <div className="row mt-3">
            {likedSongs !== undefined ?
                likedSongs.map((song) => { return (
                    <div key={song.song_id} className="col-md-3 mt-3">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{song.song_title}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">{song.song_artist}</h6>
                                <Link to={"/songs/"+song.song_id}>Details</Link>
                            </div>
                        </div>
                    </div>
                );
                })
            : ''
            }
            </div>

            <div className="row mt-3">
                <h1>Popular songs</h1>
            </div>
            <div className="row mt-3">
            {popularSongs !== undefined ?
                popularSongs.map((song) => { return (
                    <div key={song.song_id} className="col-md-3 mt-3">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{song.song_title}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">{song.song_artist}</h6>
                                <Link to={"/songs/"+song.song_id}>Details</Link>
                            </div>
                        </div>
                    </div>
                );
                })
                : ''
            }
            </div>
        </div>
    );
}

export default MainSongs;