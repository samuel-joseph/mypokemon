import React, { useState, useEffect } from "react";
import styles from "../styles/Capture.module.css";
import ViewPokemon from "../pages/viewPokemon";
import Link from "next/link";

export default function Capture(props) {
  const [value, setValue] = useState("");
  const [temporary, setTemporary] = useState({
    counter: 2,
    num: 0,
    isClicked: false,
    message: "",
    image: "https://thumbs.gfycat.com/GenerousTimelyBrontosaurus-max-1mb.gif",
    success: false,
  });

  const changeImage = (image, message, success) => {
    setTemporary((prevState) => ({
      ...prevState,
      image,
      message,
      success,
    }));
  };

  const handleSubmit = () => {
    let newPokemon = props.pokemon;
    if (value !== "") {
      newPokemon["name"] = value;
    }
    const data = JSON.parse(sessionStorage.getItem("pokemon") || "[]");
    let myPokemon;
    newPokemon.currentHealth = newPokemon.health;

    if (Array.isArray(data)) {
      myPokemon = [...data];
    } else {
      myPokemon = [data];
    }
    myPokemon.push(newPokemon);
    sessionStorage["pokemon"] = JSON.stringify(myPokemon);
  };

  const tap = () => {
    let temp;
    let num = temporary["num"];
    let counter = temporary["counter"];
    let width = document.getElementById("circ").getBoundingClientRect().width;
    let width1 = document.getElementById("circ1").getBoundingClientRect().width;
    temp = Math.abs(width - width1);
    num += temp;
    counter = counter - 1;

    if (counter == 0) {
      setTimeout(function () {
        console.log(num);
        if (num < 30) {
          changeImage(
            "https://www.freeiconspng.com/thumbs/pokeball-png/pokeball-transparent-png-2.png",
            `You have successfully captured ${props.pokemon.name}!`,
            true
          );
        } else {
          changeImage(
            props.pokemon.frontImage,
            `You have failed to capture ${props.pokemon.name}`,
            false
          );
        }
      }, 3000);
    }

    setTemporary((prevState) => ({
      ...prevState,
      num,
      counter,
      isClicked: true,
    }));
  };
  return (
    <>
      <div>
        <div className={styles.base}>
          {temporary["counter"] > 0 ? (
            <div id="circ1" className={styles.circle1}>
              <div
                id="circ"
                className={
                  temporary["isClicked"] ? styles.smallCircle : styles.bigCircle
                }
              >
                <button onClick={tap} className={styles.test}>
                  <img
                    className={styles.image}
                    src={props.pokemon.frontImage}
                  />
                </button>
              </div>
            </div>
          ) : (
            <div className={styles.row}>
              <img className={styles.ball} src={temporary["image"]} />

              {temporary["success"] && (
                <form onSubmit={handleSubmit}>
                  <input type="submit" value="PROCEED" />
                </form>
              )}
            </div>
          )}
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          marginTop: "350px",
          backgroundColor: "white",
          padding: "1vh 3vw",
          borderRadius: "20px",
          fontWeight: "bold",
        }}
      >
        {!temporary["success"] ? (
          <Link href="/viewPokemon">LEAVE</Link>
        ) : (
          <p>{temporary["message"]}</p>
        )}
      </div>
    </>
  );
}
