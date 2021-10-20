import styles from "../styles/StoryMode.module.css";
import Link from "next/link";

export default function ChoosePokemon(props) {
  //userPokemon
  //inventory
  //removePokemon
  //chosenPokemon

  return (
    <div className={styles.leaderContainer}>
      <h3>CHOOSE POKEMONS FOR BATTLE</h3>
      <div className={styles.pokemonChosen}>
        {props.userPokemon.map((pokemon) => (
          <button
            key={pokemon.key}
            className={styles.optionPokemon}
            onClick={() => props.removePokemon(pokemon)}
          >
            <img style={{ width: "13vw" }} src={pokemon.frontImage} />
          </button>
        ))}
      </div>
      {props.userPokemon.length > 1 && (
        <button className={styles.green} onClick={() => props.toBattle()}>
          BATTLE
        </button>
      )}
      <button className={styles.red}>
        <Link href="/viewPokemon">BACK</Link>
      </button>
      {props.userPokemon.length != 6 && (
        <div className={styles.inventory}>
          {props.inventory.map((pokemon) => (
            <button
              key={pokemon.key}
              className={styles.optionPokemon}
              onClick={() => props.chosenPokemon(pokemon)}
            >
              <img src={pokemon.frontImage} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
