import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

function MainBooks(){

    const [popularBooks,setPopularBooks] = useState([])
    const [likedBooks,setLikedBooks] = useState([])
    const [favoriteBooks,setFavoriteBooks] = useState([])
    const [searchedBooks,setSearchedBooks] = useState([]);

    useEffect(() => {
        getFavoriteBooks()
        getPopularBooks()
        getLikedBooks()
    },[]);

    const getFavoriteBooks = () => {
    axios.post(process.env.REACT_APP_API_URL + "/recommendation/books/", {
        id: localStorage.getItem("id_user"),
      })
      .then((res) => {
        setFavoriteBooks(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    }

    const searchBooks = (text) => {
        if (text.target.value !== "") {
          axios
            .post(process.env.REACT_APP_API_URL + "/search/book/", {
              search: text.target.value,
            })
            .then((res) => {
                setSearchedBooks(res.data);
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
            setSearchedBooks([]);
        }
      };

    const getPopularBooks = () => {
        axios.get(process.env.REACT_APP_API_URL + '/recommendation/books/populars/')
        .then(res => {
            setPopularBooks(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }

    const getLikedBooks = () => {
        axios.get(process.env.REACT_APP_API_URL + '/recommendation/books/most-liked/')
        .then(res => {
            setLikedBooks(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }

    

    return(
        <div className="container mt-5">

        <div className="row mt-5">
                <h1>Search</h1>
                <input
                type="text"
                class="form-control"
                placeholder="Search"
                aria-label="Search"
                aria-describedby="basic-addon1"
                onChange={(event) => searchBooks(event)}
                />
            </div>
            <div className="row mt-3">
                {searchedBooks !== undefined ? (
                searchedBooks.map((book) => {
                    return (
                        <div key={book.book_id} className="col-md-3 mt-3">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{book.book_title}</h5>
                                <h6 className="card-subtitle mb-2 text-muted"><h4>Authors: </h4>{book.book_authors}</h6>
                                <h6 className="card-subtitle mb-2 text-muted"><h4>Genres: </h4>  {book.book_genres}</h6>
                                <Link to={"/books/" + book.book_id}>Details</Link>
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
                {favoriteBooks.map((book) => { return (
                        <div key={book.book_id} className="col-md-3 mt-3">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{book.book_title}</h5>
                                <h6 className="card-subtitle mb-2 text-muted"><h4>Authors: </h4>{book.book_authors}</h6>
                                <h6 className="card-subtitle mb-2 text-muted"><h4>Genres: </h4>  {book.book_genres}</h6>
                                <Link to={"/books/" + book.book_id}>Details</Link>
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
                {likedBooks.map((book) => { return (
                        <div key={book.book_id} className="col-md-3 mt-3">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{book.book_title}</h5>
                                <h6 className="card-subtitle mb-2 text-muted"><h4>Authors: </h4>{book.book_authors}</h6>
                                <h6 className="card-subtitle mb-2 text-muted"><h4>Genres: </h4>  {book.book_genres}</h6>
                                <Link to={"/books/" + book.book_id}>Details</Link>
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
                {popularBooks.map((book) => { return (
                        <div key={book.book_id} className="col-md-3 mt-3">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{book.book_title}</h5>
                                <h6 className="card-subtitle mb-2 text-muted"><h4>Authors: </h4>{book.book_authors}</h6>
                                <h6 className="card-subtitle mb-2 text-muted"><h4>Genres: </h4>  {book.book_genres}</h6>
                                <Link to={"/books/" + book.book_id}>Details</Link>
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