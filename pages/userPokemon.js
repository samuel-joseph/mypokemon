import React, { useState, useEffect } from "react";
import Link from "next/link";
import styles from "../styles/Explore.module.css";
import ProgressBar from "./progressBar";

export default function UserPokemon(props) {
  return (
    <div className={styles.user}>
      <div className={styles.userMainContainer}>
        {props.user.currentHealth > 0 && (
          <div className={styles.npcAttackContainer}>
            {props.npcMove && props.npcHp > 0 && (
              <img className={styles.npcAttack} src={props.npcMove.animation} />
            )}
          </div>
        )}
        <div className={styles.userContainer}>
          <div className={props.attack && styles.userAttack}>
            <img
              className={
                props.user.currentHealth > 0
                  ? styles.imageUser
                  : styles.userFainted
              }
              src={props.user.backImage}
            />
          </div>
        </div>
        <div className={styles.userDetails}>
          <p>
            LV{props.user.level} {props.user.name}
            <ProgressBar
              percentage={(props.user.currentHealth / props.user.health) * 100}
            />
          </p>
        </div>
      </div>
    </div>
  );
}
