import styles from "../styles/StoryProgressBar.module.css";

export default function ProgressBar(props) {
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
