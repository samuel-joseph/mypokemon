import Link from "next/link";
import styles from "../styles/Categories.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <Link href="/newGame">New Game</Link>
      </div>
      <div className={styles.row}>
        <Link href="/viewPokemon">View Pokemon</Link>
      </div>
      <div className={styles.row}>
        <Link href="/explore">Explore World</Link>
      </div>
      {/* <div className={styles.row}>
        <Link href="storyMode">Story Mode</Link>
      </div> */}
    </div>
  );
}
