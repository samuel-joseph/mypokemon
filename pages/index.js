import styles from "../styles/Home.module.css";
import React, { useState, useEffect } from "react";
import NewGame from "./newGame";
import ViewPokemon from "./viewPokemon";
import Link from "next/link";

export default function index() {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("pokemon") !== null) {
      setIsLoading(true);
    }
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div style={{ position: "absolute" }} className={styles.openingFont}>
          <h1>PoKeMoN</h1>
          <h2 style={{ paddingTop: "-20px" }}>BATTLE</h2>
        </div>
        <div className={styles.battleContainer}>
          <div className={styles.charizardContainer}>
            <img
              className={styles.charizard}
              src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/6.gif"
            />
            <img
              className={styles.hydroPump}
              src="https://gifimage.net/wp-content/uploads/2018/10/aura-gif-transparent-6.gif"
            />
          </div>
          <div className={styles.blastoiseContainer}>
            <img
              className={styles.blastoise}
              src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/back/9.gif"
            />
          </div>
          <img
            className={styles.fireBlast}
            src="https://i.ya-webdesign.com/images/transparent-explosions-animated-gif-4.gif"
          />
        </div>
      </div>
      <div className={styles.buttons}>
        <button
          style={{
            borderBlockColor: "red",
            backgroundColor: "blue",
            color: "white",
            marginBottom: "10px",
          }}
          className={styles.buttonGame}
        >
          CONTINUE
        </button>
        <button
          style={{
            borderBlockColor: "red",
            backgroundColor: "blue",
            color: "white",
          }}
          className={styles.buttonGame}
        >
          NEW GAME
        </button>
      </div>
    </div>
  );

  // return <>{isLoading ? <ViewPokemon /> : <NewGame />}</>;
}
