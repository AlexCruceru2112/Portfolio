import React, { useContext } from "react";
import { MovieContext } from "./MovieContext";
function Movie(props) {
  const [movies, setMovies] = useContext(MovieContext);

  function deleteMovie(e) {
    setMovies((movies) => movies.filter((_, i) => i !== movies.length - 1));
  }

  return (
    <div className="d-flex align-items-center justify-content-between my-2 rounded border bg-light shadow-sm">
      <div className="d-flex  px-3 ">
        <div className="text-dark  p-2">{props.name}</div>
        <span class="text-dark fw-bolder  p-2">${props.price} </span>
      </div>
      <button type="button" class="btn-close p-2 px-3" aria-label="Close" onClick={deleteMovie}></button>
    </div>
  );
}

export default Movie;
