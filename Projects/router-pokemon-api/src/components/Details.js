import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../poke.css";
function Details({ match }) {
  useEffect(() => {
    fetchPoke();
  }, []);

  const [poke, setPoke] = useState({
    sprites: { other: { home: {} } },
    stats: [{}, {}, {}, {}, {}, {}],
    types: [{ type: {} }],
  });

  const fetchPoke = async () => {
    const data = await fetch("https://pokeapi.co/api/v2/pokemon/" + match.params.id);
    const pokeData = await data.json();
    setPoke(pokeData);
  };
  return (
    <div className="container rounded shadow-sm my-5 p-5 details-cont bg-light">
      <Link to="/">go back</Link>
      <div className="container">
        <div className="d-lg-flex align-items-end">
          <img src={poke.sprites.other.home.front_default} alt="main-img" />
          <div className="container shadow-sm rounded bg-dark p-4">
            <div className="row text-center my-3">
              <div className="col d-flex p-2">
                <div className="fw-bolder display-4 text-capitalize p-1 rounded text-light">{poke.name}</div>
                <div className="h5 rounded text-secondary">{poke.id}</div>
              </div>
            </div>

            <div className="row text-center ">
              <div className="col lead p-1 bg-light border  m-1 rounded">
                Type: <span className="fw-bolder">{poke.types[0].type.name}</span>
              </div>
              <div className="col lead p-1 bg-light border m-1 rounded">
                <span className="fw-bolder">{poke.base_experience}.000 exp</span>
              </div>
            </div>
            <div className="row text-center ">
              <div className="col lead p-1 bg-light border m-1 rounded">
                Height: <span className="fw-bolder">{poke.height * 10}cm</span>
              </div>
              <div className="col lead p-1 bg-light border m-1 rounded">
                Weight: <span className="fw-bolder">{poke.weight / 10}kg</span>
              </div>
            </div>

            <div className="row text-center text-light mt-3">
              <div className="col lead p-2 bg-danger m-1 rounded">
                Health: <span className="fw-bolder">{poke.stats[0].base_stat}hp</span>
              </div>
              <div className="col lead p-2 bg-secondary  m-1 rounded">
                Attack: <span className="fw-bolder">{poke.stats[1].base_stat}</span>
              </div>
            </div>
            <div className="row text-center text-light">
              <div className="col lead p-2 bg-primary m-1 rounded">
                Deffence: <span className="fw-bolder">{poke.stats[2].base_stat}</span>
              </div>
              <div className="col lead p-2 bg-success m-1 rounded">
                Speed: <span className="fw-bolder">{poke.stats[5].base_stat}m/s</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
