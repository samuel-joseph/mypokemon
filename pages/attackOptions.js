import React, { useState, useEffect } from "react";
import styles from "../styles/AttackOptions.module.css";

export default function AttackOptions(props) {
  const [color, setColor] = useState("");

  useEffect(() => {
    switch (props.move.type) {
      case "Grass":
        setColor("green");
        break;
      case "Fire":
        setColor("red");
        break;
      case "Water":
        setColor("blue");
        break;
      case "Electric":
        setColor("yellow");
        break;
      case "Poison":
        setColor("violet");
        break;
      case "Rock":
        setColor("dark brown");
        break;
      case "Ground":
        setColor("light brown");
        break;
      case "Dragon":
        setColor("gray");
        break;
      case "Flying":
        setColor("light blue");
        break;
      case "Bug":
        setColor("light green");
        break;
      case "Normal":
        setColor("white");
        break;
    }
  });

  return (
    <div className={styles.innerAttack}>
      {props.move.gauge === 100 && (
        <button
          className={styles.circleButton}
          onClick={() => props.userMove(props.move)}
          disabled={props.attack}
          style={{ backgroundColor: color }}
        >
          <p className={styles.text}>
            {props.move.name}::{props.move.type}
          </p>
        </button>
      )}
    </div>
  );
}
