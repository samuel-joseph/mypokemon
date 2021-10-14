import styles from "../styles/MoveBar.module.css";

export default function MoveBar(props) {
  return (
    <div className={styles.progressbar}>
      <Filler percentage={props.percentage} />
    </div>
  );
}

const Filler = (props) => {
  return (
    <div className={styles.filler} style={{ width: `${props.percentage}%` }} />
  );
};
