import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../poke.css";

function PokeCard() {
  useEffect(() => {
    fetchPoke();
  }, []);

  const [poke, setPoke] = useState([]);

  const fetchPoke = async () => {
    const data = await fetch("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1000");
    const pokeData = await data.json();

    setPoke(pokeData.results);
  };

  return (
    <div>
      <div className="row">
        <div className="col">
          {poke.slice(0, 200).map((pok) => (
            <Link to={"/" + pok.name} className="text-decoration-none">
              <div className="border rounded p-1 m-1 text-secondary text-center text-capitalize shadow-sm">
                <div className="poke-tile">{pok.name}</div>
              </div>
            </Link>
          ))}
        </div>
        <div className="col">
          {poke.slice(200, 400).map((pok) => (
            <Link to={"/" + pok.name} className="text-decoration-none" key={pok.id}>
              <div className="border rounded p-1 m-1 text-secondary text-center text-capitalize shadow-sm">
                <div className="poke-tile">{pok.name}</div>
              </div>
            </Link>
          ))}
        </div>
        <div className="col">
          {poke.slice(400, 600).map((pok) => (
            <Link to={"/" + pok.name} className="text-decoration-none" key={pok.id}>
              <div className="border rounded p-1 m-1 text-secondary text-center text-capitalize shadow-sm">
                <div className="poke-tile">{pok.name}</div>
              </div>
            </Link>
          ))}
        </div>
        <div className="col">
          {poke.slice(600, 800).map((pok) => (
            <Link to={"/" + pok.name} className="text-decoration-none" key={pok.id}>
              <div className="border rounded p-1 m-1 text-secondary text-center text-capitalize shadow-sm">
                <div className="poke-tile">{pok.name}</div>
              </div>
            </Link>
          ))}
        </div>
        <div className="col">
          {poke.slice(800, 1000).map((pok) => (
            <Link to={"/" + pok.name} className="text-decoration-none" key={pok.id}>
              <div className="border rounded p-1 m-1 text-secondary text-center text-capitalize shadow-sm">
                <div className="poke-tile">{pok.name}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PokeCard;
