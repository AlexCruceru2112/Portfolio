import React, { useContext } from "react";
import { MovieContext } from "./MovieContext";
function Nav() {
  const [movies, setMovies] = useContext(MovieContext);
  return (
    <div className="text-center">
      <div className="lead text-dark fw-normal">
        Currently, we've got a number of <span className="fw-bolder">{movies.length}</span> movies.
      </div>
    </div>
  );
}

export default Nav;
