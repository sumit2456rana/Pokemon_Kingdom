import "./styles.css";
import React, { useEffect } from "react";
import { useState } from "react";
export default function App() {
  const [allPokemons, setAllPokemons] = useState([]);
  const [URL, setURL] = useState(`https://pokeapi.co/api/v2/pokemon?limit=10`);

  async function getDetailedInfo(result) {
    result.forEach(async (eachPokemon) => {
      const resp = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${eachPokemon.name}`
      );
      const data = await resp.json();
      setAllPokemons((current) => [...current, data]);
    });
  }
  // console.log(allPokemons);
  async function getData() {
    const resp = await fetch(URL);
    const data = await resp.json();
    setURL(data.next);
    await getDetailedInfo(data.results);
  }
  useEffect(() => {
    getData();
  }, []);
  return (
    <div id="parent">
      <div className="section">
        <div className="content1">
          <h1>Pokemon</h1>
          <h1>Pokemon</h1>
        </div>
        <div className="content2">
          <h1>Kingdom</h1>
          <h1>Kingdom</h1>
        </div>
      </div>
      <div className="app-container">
        <div className="pokemon-container">
          <div className="all-container">
            {allPokemons.map((ePoke) => {
              return <PokemonCard data={ePoke} />;
            })}
          </div>
          <div className="btn">
            <button className="more" onClick={() => getData()}>
              More Pokemons
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function PokemonCard({ data }) {
  let image = data.sprites.other.dream_world.front_default;
  let id = data.id;
  let name = data.forms[0].name;
  let type = data.types[0].type.name;
  let height = data.height;
  let weight = data.weight;
  let stat1 = data.stats[0].stat.name;
  let stat2 = data.stats[1].stat.name;
  let stat3 = data.stats[2].stat.name;
  let stat4 = data.stats[3].stat.name;
  let stat5 = data.stats[4].stat.name;
  let stat6 = data.stats[5].stat.name;
  let stat = [stat1, stat2, stat3, stat4, stat5, stat6];

  let val1 = data.stats[0].base_stat;
  let val2 = data.stats[1].base_stat;
  let val3 = data.stats[2].base_stat;
  let val4 = data.stats[3].base_stat;
  let val5 = data.stats[4].base_stat;
  let val6 = data.stats[5].base_stat;
  let values = [val1, val2, val3, val4, val5, val6];
  const [isOverlayActive, setIsOverlayActive] = useState(false);
  function handleOverlay() {
    setIsOverlayActive(!isOverlayActive);
  }
  return (
    <>
      <div className={`thumb-container ${type}`}>
        <div className="number">
          <small id="id">#{id}</small>
        </div>
        <img src={image} alt="pokemon" />
        <div className="detail-wrapper">
          <h3>{name}</h3>
          <small>Type : {type}</small>
        </div>
        <button className="pokeInfoBtn" onClick={handleOverlay}>
          Know More...
        </button>
      </div>
      {isOverlayActive && (
        <OverLay
          stat={stat}
          values={values}
          name={name}
          weight={weight}
          height={height}
          image={image}
          handleOverlay={handleOverlay}
          type={type}
        />
      )}
    </>
  );
}

function OverLay({
  handleOverlay,
  type,
  image,
  name,
  weight,
  height,
  stat,
  values
}) {
  return (
    <div className="overlay-background">
      <div className={`overlay ${type}`}>
        <button className="close-btn water" onClick={handleOverlay}>
          x
        </button>
        <div className="left-overlay">
          <img src={image} alt="" className="image" />
          <h3>{name}</h3>
        </div>
        <div className="right-overlay water">
          <table className={`right-overlay-table ${type}`}>
            <tbody>
              <tr>
                <td>
                  <table>
                    <tbody>
                      <tr>
                        <td className="statName">Weight: {weight}</td>
                      </tr>
                      <tr>
                        <td className="statName">Height: {height}</td>
                      </tr>
                    </tbody>
                  </table>
                </td>
                <td>
                  <table>
                    <tbody>
                      <tr>
                        <td className="statName">
                          {stat[0]} : {values[0]}
                        </td>
                      </tr>
                      <tr>
                        <td className="statName">
                          {stat[1]} : {values[1]}
                        </td>
                      </tr>
                      <tr>
                        <td className="statName">
                          {stat[2]} : {values[2]}
                        </td>
                      </tr>
                      <tr>
                        <td className="statName">
                          {stat[3]} : {values[3]}
                        </td>
                      </tr>
                      <tr>
                        <td className="statName">
                          {stat[4]} : {values[4]}
                        </td>
                      </tr>
                      <tr>
                        <td className="statName">
                          {stat[5]} : {values[5]}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
