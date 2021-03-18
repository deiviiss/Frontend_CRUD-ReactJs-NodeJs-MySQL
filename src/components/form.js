import React, { useState, useEffect } from 'react';
import './form.css'
import Axios from 'axios'

export default function Form() {

  const [movieName, setMovieName] = useState("");
  const [review, setReview] = useState("");
  const [movieReviewList, setMovieList] = useState([]);
  const [newReview, setNewReview] = useState("")

  // Lista las peliculas al renderizar la página
  useEffect(() => {
    Axios.get('http://localhost:5000/api/get').then((response) => {
      console.log(response);
      setMovieList(response.data)
    })
  }, []);

  // botón enviar pelicula
  const submitReview = () => {
    //solicita los clientes
    Axios.post('http://localhost:5000/api/insert',
      {
        movieName: movieName,
        movieReview: review
      })
    // NO ACTUALIZA REVIEW
    //lista los clientes
    setMovieList([
      ...movieReviewList,
      { movieName: movieName, movieReview: review },

    ]);
  };


  // borra pelicula
  const deleteReview = (movieName) => {
    Axios.delete(`http://localhost:5000/api/delete/${movieName}`)
  }

  //actualiza pelicula

  const updateReview = (movieName) => {
    Axios.put("http://localhost:5000/api/update", {
      movieName: movieName,
      movieReview: newReview,
    })
    setNewReview("")
  }


  return (
    <>
      <h1>
        CRUD APPLICATION
      </h1>

      <div className="form">
        <label>
          Movie Name:
        </label>
        <input
          type="text"
          name="movieName"
          onChange={(e) => {
            setMovieName(e.target.value);
          }}
        />

        <label>
          Review:
        </label>
        <input
          type="text"
          name="review"
          onChange={(e) => {
            setReview(e.target.value);
          }}

        />
        <br />
        <button
          onClick={submitReview}
        >Submit</button>
      </div>

      {movieReviewList.map((value) => {
        return (
          <div className="cardMovie">

            <h1>Movie Name: {value.movieName}</h1>
            <p>Movie Review: {value.movieReview}</p>

            <button
              onClick={() => { deleteReview(value.movieName) }}>
              Delete</button>

            <input type="text"
              id="updateInput" onChange={(e) => {
                setNewReview(e.target.value)
              }} />
            <button onClick={() => { updateReview(value.movieName) }}>
              Update</button>
          </div>
        )
      })}

    </>
  )
}