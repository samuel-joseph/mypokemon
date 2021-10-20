import styles from "../styles/Home.module.css";
import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function Storage(props) {
  useEffect(() => {
    console.log([...props.pokemons]);
    localStorage.setItem("pokemon", JSON.stringify([...props.pokemons]));
  }, []);

  const save = () => {
    localStorage.removeItem("pokemon");
  };

  return (
    <div className={styles.attackOption}>
      <div className={styles.container}>
        <Link href="/home">Back</Link>
        {props.pokemons.map((pokemon) => (
          <img key={pokemon.key} src={pokemon.frontImage} />
        ))}
        <h4>Pokemon successfully stored!</h4>
      </div>
    </div>
  );
}
