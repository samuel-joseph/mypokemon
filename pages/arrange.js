import Link from "next/link";
import styles from "../styles/Arrange.module.css";
import React, { useEffect, useState } from "react";

export default function Evolution() {
  const [data, setData] = useState({
    pokemons: null,
    queued: [],
  });
  const [queued, setQueued] = useState(null);

  useEffect(() => {
    const response = JSON.parse(localStorage.getItem("pokemon") || "[]");
    if (Array.isArray(response)) {
      setData((prevState) => ({
        ...prevState,
        pokemons: [...response],
      }));
    } else {
      setData((prevState) => ({
        ...prevState,
        pokemons: response,
      }));
    }
  }, []);

  const clicked = (pokemon) => {
    let oldPokemons = data.pokemons;
    let temp = data.queued;
    console.log(pokemon);
    console.log(temp);
    temp.push(pokemon);
    console.log(temp);
    let newPokemon = pokemon;
    let index = oldPokemons.findIndex(
      (i) => i.currentExperience === newPokemon.currentExperience
    );

    oldPokemons.splice(index, 1);
    console.log(oldPokemons);
    setData((prevState) => ({
      ...prevState,
      pokemons: oldPokemons,
      queued: temp,
    }));
  };

  const store = () => {
    localStorage.setItem("pokemon", JSON.stringify(data.queued));
  };

  return (
    <div className={styles.main}>
      {data.pokemons && (
        <div>
          {data.pokemons.length != 0 && (
            <div className={styles.row}>
              {data.pokemons.map((pokemon) => (
                <img
                  key={pokemon.key}
                  src={pokemon.frontImage}
                  onClick={() => clicked(pokemon)}
                />
              ))}
            </div>
          )}
          <div>
            {data.queued.length > 0 && (
              <>
                <div className={styles.column}>
                  {data.queued.map((pokemon) => (
                    <img
                      key={pokemon.key}
                      className={styles.image}
                      src={pokemon.frontImage}
                    />
                  ))}
                </div>
                {data.pokemons.length == 0 && (
                  <Link href="/viewPokemon">
                    <button className={styles.button} onClick={() => store()}>
                      SAVE
                    </button>
                  </Link>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
