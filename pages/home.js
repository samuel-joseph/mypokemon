import Link from "next/link";
import styles from "../styles/Categories.module.css";
import React, { useEffect, useState } from "react";
import Index from "./index";

export default function Home() {
  const [Len, setLen] = useState(0);
  useEffect(() => {
    let pokemons = JSON.parse(sessionStorage.getItem("pokemon"));
    if (pokemons !== null) {
      setLen(pokemons.length);
    } else {
      setLen(null);
    }
  }, []);

  return (
    // <>
    //   {Len ? (
    <div className={styles.container}>
      <div className={styles.row}>
        <Link href="/">HOME</Link>
      </div>
      <div className={styles.row}>
        <Link href="/viewPokemon">VIEW POKEMON</Link>
      </div>
      <div className={styles.row}>
        <Link href="/explore">EXPLORE WORLD</Link>
      </div>
      {Len > 1 && (
        <div className={styles.row}>
          <Link href="/storyMode">STORY MODE</Link>
        </div>
      )}
    </div>
    // ) : (
    //   <Index />
    //   )}
    // </>
  );
}
