import styles from "../styles/StoryMode.module.css";
import Link from "next/link";

export default function LeaderContainer(props) {
  return (
    <>
      {props.message === "winningMessage" && <h1>You WIN!</h1>}
      {props.message === "losingMessage" && <h1>You LOSE!</h1>}
      {props.leader && (
        <div className={styles.leaderContainer}>
          <h1>{props.leader.name}</h1>
          <div className={styles.leaderImageContainer}>
            <img className={styles.leaderImage} src={props.leader.image} />
            <div className={styles.leaderPokemonContainer}>
              {props.leader.pokemon.map((pokemon) => (
                <img key={pokemon.key} src={pokemon.frontImage} />
              ))}
            </div>
          </div>
          <p>{props.leader[`${props.message}`]}</p>
          {!props.battleEnd && (
            <button
              className={styles.green}
              onClick={() => props.pokemonChoose()}
            >
              FIGHT
            </button>
          )}
          <button className={styles.red}>
            <Link href="/viewPokemon">BACK</Link>
          </button>
        </div>
      )}
    </>
  );
}
