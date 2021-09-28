import Link from "next/link";
import styles from "../styles/Categories.module.css";
import React, { useEffect, useState } from "react";

export default function Evolution() {
  const [pokemons, setPokemons] = useState(null);
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("pokemon") || "[]");
    if (Array.isArray(data)) {
      setPokemons([...data]);
    } else {
      setPokemons([data]);
    }
  });

  return (
    <div className={styles.container}>
      <div className={styles.row}>
      </div>
    </div>
  );
}
