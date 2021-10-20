import styles from "../styles/NewGame.module.css";
import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function NewGame() {
  const [starter, setStarter] = useState(null);
  const [chosen, setChosen] = useState(null);
  const [trigger, setTrigger] = useState(false);
  const [message, setMessage] = useState("CHOOSE YOUR STARTER!");
  const [value, setValue] = useState("");
  const [leaders, setLeaders] = useState(null);

  useEffect(() => {
    async function fetchAPI() {
      let response = await fetch(
        "https://samuel-joseph.github.io/jsonapi/pokemon.json"
      );
      response = await response.json();
      setStarter(response.starter);
      console.log(response.starter);
      console.log([...response.leaders]);
      setLeaders([...response.leaders]);
    }
    fetchAPI();
  }, []);

  const store = (props) => {
    setTrigger(true);
    setChosen(props);
    setMessage("Good luck!");
  };

  const handleSubmit = () => {
    let newPokemon = chosen;
    if (value !== "") {
      newPokemon["name"] = value;
    }
    console.log(chosen);
    console.log(newPokemon);
    sessionStorage["pokemon"] = JSON.stringify(newPokemon);
    sessionStorage["leaders"] = JSON.stringify(leaders);
  };

  return (
    <div className={styles.container}>
      <h1>WELCOME!</h1>
      {trigger ? (
        <>
          {chosen && (
            <div className={styles.column}>
              <img className={styles.image} src={chosen.frontImage} />

              <Link href="/viewPokemon">
                <button onClick={handleSubmit}>PROCEED</button>
              </Link>
            </div>
          )}
        </>
      ) : (
        <div className={styles.row}>
          {starter && (
            <>
              {starter.map((pokemon) => (
                <div key={pokemon.key} className={styles.rowEach}>
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
