import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from 'axios';
import React from 'react'
import Rating from 'react-rating';

function BookDetail(props){
    const [book_title,setBook_title] = useState('')
    const [book_authors,setBook_authors] = useState('')
    const [book_overview,setBook_overview] = useState('')
    const [book_genres,setBook_genres] = useState('')

    const [rating,setRating] = useState(0)
    const [isRated, setIsRated] = useState(0);

    let { id } = useParams();

    useEffect(() => {
        getBook(id)
        getRating(id)
      }, []);

    const getBook = (pId) => {
        axios.get(process.env.REACT_APP_API_URL + '/book/'+pId )
        .then(res => {
            setBook_title(res.data.book_title)
            setBook_authors(res.data.book_authors)
            setBook_overview(res.data.book_overview)
            setBook_genres(res.data.book_genres)
        })
        .catch(err => {
            console.log(err)
        })
    }

    const getRating = (pId) => {
        axios.get(process.env.REACT_APP_API_URL + '/book_rating/'+localStorage.getItem('user_id')+"/" +pId )
        .then(res => {
            setIsRated(true)
            setRating(res.data.rating)
        })
        .catch(err => {
            setIsRated(false)
        })
    }

    const rate = () => {
        if(!isRated){
            axios.post(process.env.REACT_APP_API_URL+'/book_rating-create/',{
                user_id: localStorage.getItem('user_id'),
                rating: rating,
                book_id: id
            })
            .then(res => {
                alert('Rated success!')
            })
            .catch(err => {
                console.log(err)
            })
        }else{
            axios.post(process.env.REACT_APP_API_URL+'/book_rating-update/'+localStorage.getItem('user_id')+"/"+id,{
                user_id: localStorage.getItem('user_id'),
                rating: rating,
                book_id: id
            })
            .then(res => {
                setIsRated(true)
                alert('Updated Rate success!')
            })
            .catch(err => {
                console.log(err)
            })
        }
    }
    
    return(
        <div className="container">
            <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-4">
                    <div className="row text-center mt-3"><h2>{book_title}</h2></div>
                    <div className="row text-center mt-1"><h4>Genres: {book_genres}</h4></div>
                    <div className="row text-center mt-1"><h4>Authors: {book_authors}</h4></div>
                    <div className="row text-center mt-1">
                        <Rating
                        {...props} initialRating={rating}
                        onClick = {(val) => setRating(val)}
                        stop={5} 
                        />
                        <button type="button" class="btn btn-outline-warning ml-2" onClick={rate}>Rate!</button>
                        </div>
                    <div className="row text-center mt-3"><h5>Book overview</h5></div>
                    <div className="row text-center mt-3 mb-5">{book_overview}</div>
                </div>
                <div className="col-md-4"></div>
            </div>
        </div>
    );
}

export default BookDetail;