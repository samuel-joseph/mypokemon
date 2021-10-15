import styles from "../styles/ViewPokemon.module.css";
import React, { useState, useEffect } from "react";
import Categories from "./home";
import ProgressBar from "./progressBar";

export default function ViewPokemon() {
  const [pokemons, setPokemons] = useState();

  useEffect(() => {
    // const leaders = JSON.parse(sessionStorage.getItem("leaders"));
    const data = JSON.parse(sessionStorage.getItem("pokemon") || "[]");
    if (Array.isArray(data)) {
      setPokemons([...data]);
    } else {
      setPokemons([data]);
    }
  }, []);

  return (
    <div className={styles.container}>
      <Categories />
      <h1>MY POKEMON</h1>
      {pokemons && (
        <div className={styles.row}>
          {pokemons.map((pokemon) => (
            <div className={styles.rowEach}>
              <h2>{pokemon.name}</h2>
              <div className={styles.rowEach2}>
                <div>
                  <img src={pokemon.frontImage} />
                  <p></p>
                  <p>
                    HP: {pokemon.currentHealth}/{pokemon.health}
                  </p>
                  <p>
                    EXP:{" "}
                    <ProgressBar
                      percentage={
                        (pokemon.currentExperience / pokemon.totalExperience) *
                        100
                      }
                    />
                  </p>
                </div>
                <div>
                  <p>Type:{pokemon.type}</p>
                  <p>Level {pokemon.level}</p>
                </div>
              </div>
              <h3>MOVES</h3>
              {pokemon.moves.map((move) => (
                <div className={styles.rowEach2}>
                  <div>
                    <p>{move.name}</p>
                    <img className={styles.animation} src={move.animation} />
                  </div>
                  <div>
                    <p>{move.type}</p>
                    <p>{move.attack}</p>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
