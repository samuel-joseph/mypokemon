import styles from "../styles/Home.module.css";
import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function index() {
  const [isLoading, setIsLoading] = useState(false);
  const [newGame, setNewGame] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("pokemon") !== null) {
      setIsLoading(true);
    }
  }, []);

  let clickedNew = () => {
    setNewGame(true);
  };

  let clickedNo = () => {
    setNewGame(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div style={{ position: "absolute" }} className={styles.openingFont}>
          <h1 className={styles.pokemon} style={{ color: "yellow" }}>
            PoKeMoN
          </h1>
          <h2
            className={styles.battle}
            style={{ color: "red", marginTop: "-50px" }}
          >
            BATTLE
          </h2>
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
        {isLoading && !newGame && (
          <Link href="/viewPokemon">
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
          </Link>
        )}
        {!newGame && (
          <>
            <button
              style={{
                borderBlockColor: "red",
                backgroundColor: "blue",
                color: "white",
              }}
              onClick={() => clickedNew()}
              className={styles.buttonGame}
            >
              NEW GAME
            </button>
            <a
              style={{
                fontWeight: "lighter",
                textDecoration: "underline",
                marginTop: "10px",
                opacity: ".7",
              }}
              href="http://samueljosephvpinangay-rcnyk50us-samuel-joseph.vercel.app/"
            >
              About me
            </a>
          </>
        )}
        {newGame && (
          <>
            <h3 style={{ backgroundColor: "rgb(0,0,0,0.75)" }}>
              Are you sure?
            </h3>
            <Link href="/newGame">
              <button
                style={{
                  borderBlockColor: "red",
                  backgroundColor: "blue",
                  color: "white",
                  marginBottom: "5px",
                }}
                className={styles.buttonGame}
              >
                YES
              </button>
            </Link>
            <button
              style={{
                borderBlockColor: "red",
                backgroundColor: "blue",
                color: "white",
              }}
              onClick={() => clickedNo()}
              className={styles.buttonGame}
            >
              NO
            </button>
          </>
        )}
      </div>
    </div>
  );

  // return <>{isLoading ? <ViewPokemon /> : <NewGame />}</>;
}
