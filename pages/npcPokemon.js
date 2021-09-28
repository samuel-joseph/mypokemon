import React, { useState, useEffect } from "react";
import styles from "../styles/Explore.module.css";
import ProgressBar from "./progressBar";

export default function NpcPokemon(props) {
  return (
    <>
      <p className={styles.npcHp}>
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
