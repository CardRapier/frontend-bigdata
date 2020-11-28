import { useEffect, useState } from "react";

import Rating from "react-rating";
import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function MovieDetail(props) {
  const [movie_title, setMovie_title] = useState("");
  const [movie_text, setMovie_text] = useState("");

  const [rating, setRating] = useState(0);
  const [isRated, setIsRated] = useState(0);

  let { id } = useParams();

  useEffect(() => {
    getMovie(id);
    getRating(id);
  }, []);

  const getMovie = (pId) => {
    axios
      .get(process.env.REACT_APP_API_URL + "/movie/" + pId)
      .then((res) => {
        setMovie_title(res.data.movie_title);
        setMovie_text(res.data.movie_overview);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getRating = (pId) => {
    axios
      .get(
        process.env.REACT_APP_API_URL +
          "/movie_rating/" +
          localStorage.getItem("user_id") +
          "/" +
          pId
      )
      .then((res) => {
        setIsRated(true);
        setRating(res.data.rating);
      })
      .catch((err) => {
        setIsRated(false);
      });
  };

  const rate = () => {
    if (!isRated) {
      axios
        .post(process.env.REACT_APP_API_URL + "/movie_rating-create/", {
          user_id: localStorage.getItem("user_id"),
          rating: rating,
          movie_id: id,
        })
        .then((res) => {
          alert("Rated success!");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .post(
          process.env.REACT_APP_API_URL +
            "/movie_rating-update/" +
            localStorage.getItem("user_id") +
            "/" +
            id,
          {
            user_id: localStorage.getItem("user_id"),
            rating: rating,
            movie_id: id,
          }
        )
        .then((res) => {
          setIsRated(true);
          alert("Updated Rate success!");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4"></div>
        <div className="col-md-4">
          <div className="row text-center mt-3">
            <h2>{movie_title}</h2>
          </div>
          <div className="row text-center mt-1">
            <Rating
              {...props}
              initialRating={rating}
              onClick={(val) => setRating(val)}
              stop={5}
            />
            <button
              type="button"
              class="btn btn-outline-warning ml-2"
              onClick={rate}
            >
              Rate!
            </button>
          </div>
          <div className="row text-center mt-3">
            <h5>Overview</h5>
          </div>
          <div className="row text-center mt-3 mb-5">{movie_text}</div>
        </div>
        <div className="col-md-4"></div>
      </div>
    </div>
  );
}

export default MovieDetail;
