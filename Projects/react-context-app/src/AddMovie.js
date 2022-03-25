import React, { useState, useContext } from "react";
import { MovieContext } from "./MovieContext";

const AddMovie = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [movies, setMovies] = useContext(MovieContext);

  function validateForm() {
    return name.length > 0 && price.length > 0;
  }

  const updateName = (e) => {
    setName(e.target.value);
  };

  const updatePrice = (e) => {
    setPrice(e.target.value);
  };

  const addMovie = (e) => {
    e.preventDefault();
    setMovies((prevMovies) => [...prevMovies, { name: name, price: price }]);
  };

  return (
    <form class="input-group mb-2" onSubmit={addMovie}>
      <input
        type="text"
        class="form-control me-1 rounded"
        placeholder="Movie title"
        value={name}
        onChange={updateName}
      />
      <input
        type="number"
        class="form-control ms-1 rounded"
        placeholder="Selling price $"
        value={price}
        onChange={updatePrice}
      />
      <button class="btn btn-dark px-5 my-2 rounded w-100" disabled={!validateForm()}>
        Add a new movie
      </button>
    </form>
  );
};

export default AddMovie;
