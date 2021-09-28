import styles from "../styles/Home.module.css";
import React, { useState, useEffect } from "react";
import NewGame from "./newGame";
import ViewPokemon from "./viewPokemon";

export default function index() {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("pokemon") !== null) {
      setIsLoading(true);
    }
  }, []);

  return <>{isLoading ? <ViewPokemon /> : <NewGame />}</>;
}
