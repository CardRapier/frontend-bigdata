import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from 'axios';
import React from 'react'
import Rating from 'react-rating';

function SongDetail(props){
    const [song_title,setSong_title] = useState('')
    const [song_text,setSong_text] = useState('')
    const [song_artist,setSong_artist] = useState('')

    const [rating,setRating] = useState(0)
    const [isRated, setIsRated] = useState(0);

    let { id } = useParams();

    useEffect(() => {
        getSong(id)
        getRating(id)
      }, []);

    const getSong = (pId) => {
        axios.get(process.env.REACT_APP_API_URL + '/song/'+pId )
        .then(res => {
            setSong_title(res.data.song_title)
            setSong_text(res.data.song_text)
            setSong_artist(res.data.song_artist)
        })
        .catch(err => {
            console.log(err)
        })
    }

    const getRating = (pId) => {
        axios.get(process.env.REACT_APP_API_URL + '/song_rating/'+localStorage.getItem('user_id')+"/" +pId )
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
            axios.post(process.env.REACT_APP_API_URL+'/song_rating-create/',{
                user_id: localStorage.getItem('user_id'),
                rating: rating,
                song_id: id
            })
            .then(res => {
                alert('Rated success!')
            })
            .catch(err => {
                console.log(err)
            })
        }else{
            axios.post(process.env.REACT_APP_API_URL+'/song_rating-update/'+localStorage.getItem('user_id')+"/"+id,{
                user_id: localStorage.getItem('user_id'),
                rating: rating,
                song_id: id
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
                    <div className="row text-center mt-3"><h2>{song_title}</h2></div>
                    <div className="row text-center mt-1"><h4>{song_artist}</h4></div>
                    <div className="row text-center mt-1">
                        <Rating
                        {...props} initialRating={rating}
                        onClick = {(val) => setRating(val)}
                        stop={5} 
                        />
                        <button type="button" class="btn btn-outline-warning ml-2" onClick={rate}>Rate!</button>
                        </div>
                    <div className="row text-center mt-3"><h5>Lirycs</h5></div>
                    <div className="row text-center mt-3 mb-5">{song_text}</div>
                </div>
                <div className="col-md-4"></div>
            </div>
        </div>
    );
}

export default SongDetail;