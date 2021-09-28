import styles from "../styles/NewGame.module.css";
import React, { useState, useEffect } from "react";
import Link from "next/link";

import Categories from "./home";

export default function NewGame() {
  const [starter, setStarter] = useState(null);
  const [chosen, setChosen] = useState(null);
  const [trigger, setTrigger] = useState(false);
  const [message, setMessage] = useState("CHOOSE YOUR STARTER!");
  const [value, setValue] = useState("");

  useEffect(() => {
    async function fetchAPI() {
      let response = await fetch(
        "https://samuel-joseph.github.io/jsonapi/pokemon.json"
      );
      response = await response.json();
      setStarter(response.starter);
    }
    fetchAPI();
  }, []);

  const store = (props) => {
    setTrigger(true);
    setChosen(props);
    setMessage("Give your pokemon a name!");
    // sessionStorage.setItem("pokemon", JSON.stringify(props));
  };

  const handleSubmit = () => {
    let newPokemon = chosen;
    if (value !== "") {
      newPokemon["name"] = value;
    }

    sessionStorage["pokemon"] = JSON.stringify(newPokemon);
  };

  return (
    <div className={styles.container}>
      <h1>WELCOME!</h1>
      {trigger ? (
        <>
          {chosen && (
            <div className={styles.column}>
              <img className={styles.image} src={chosen.frontImage} />
              <form>
                <label>
                  <input
                    type="text"
                    value={value}
                    onChange={(event) => setValue(event.target.value)}
                  />
                </label>
              </form>
              <Link href="/viewPokemon">
                <button onClick={handleSubmit}>SUBMIT</button>
              </Link>
            </div>
          )}
        </>
      ) : (
        <div className={styles.row}>
          {starter && (
            <>
              {starter.map((pokemon) => (
                <div className={styles.rowEach}>
                  <img src={pokemon.frontImage} />
                  <button onClick={() => store(pokemon)}>Choose</button>
                </div>
              ))}
            </>
          )}
        </div>
      )}
      <p>{message}</p>
    </div>
  );
}
