import React from "react";
import PokeCard from "./PokeCard";

function Home() {
  return (
    <div className="container text-center py-5">
      <div className="display-1 bg-dark text-light rounded fw-bolder">Pokémon API</div>
      <div className="py-1 bg-dark text-light rounded my-2">- select one from the following 1.000 pokémon list -</div>
      <PokeCard />
    </div>
  );
}

export default Home;
