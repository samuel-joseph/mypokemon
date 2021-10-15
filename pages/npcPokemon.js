import React, { useState, useEffect } from "react";
import styles from "../styles/Explore.module.css";
import ProgressBar from "./progressBar";

export default function NpcPokemon(props) {
  return (
    <>
      <p style={{ color: "white" }} className={styles.npcHp}>
        LV{props.npc.level} {props.npc.name}
        <ProgressBar
          percentage={(props.npc.currentHealth / props.npc.health) * 100}
        />
      </p>
      <div className={styles.userAttackContainer}>
        {props.chosenMove && (
          <img
            className={styles.userAttackAnimation}
            src={props.chosenMove.animation}
          />
        )}
      </div>
      <div className={props.chosen ? styles.npc : styles.npcConst}>
        <img
          className={
            props.npc.currentHealth > 0 ? styles.image : styles.npcFainted
          }
          src={props.npc.frontImage}
        />
      </div>
    </>
  );
}
