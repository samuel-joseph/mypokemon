import styles from "../styles/StoryMode.module.css";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Storage from "./storage";
import Categories from "./home";
import UserPokemon from "./userPokemon";
import NpcPokemon from "./npcPokemon";
import AttackOptions from "./attackOptions";
import Capture from "./capture";

export default function Explore() {
  // const [capture, setCapture] = useState(false);
  const [rarity, setRarity] = useState({
    common: null,
    rare: null,
    unique: null,
    evolution: null,
  });
  const [newPokemon, setNewPokemon] = useState(false);
  const [attack, setAttack] = useState(false);
  const [temporary, setTemporary] = useState({
    chosen: null,
    chosenMove: null,
    start: false,
    battleShowButton: false,
    readyMove: true,
    pokemon: null,
    fainted: false,
    newPokemon: false,
    boss: null,
    bossChosen: null,
    bossMove: null,
    npcCounter: {
      special: 0,
      medium: 0,
      weak: 100,
    },
    userCounter: {
      special: 0,
      medium: 0,
      weak: 100,
    },
  });

  const level = {
    common: [19, 16, 37, 60, 43],
    rare: [25, 129, 120, 93, 64, 75],
    unique: [134, 135, 136, 142, 147, 143, 131],
    legend: [144, 146, 145],
  };

  useEffect(() => {
    let chosenVar, pokemonVar;

    fetch("https://samuel-joseph.github.io/jsonapi/pokemon.json")
      .then((results) => results.json())
      .then((response) => {
        let bossVar = [...response.boss];
        let bossChosenVar;

        bossChosenVar = bossVar[0];

        const data = JSON.parse(localStorage.getItem("pokemon") || "[]");
        if (Array.isArray(data)) {
          pokemonVar = [...data];
          // chosenVar = data[0];
        } else {
          pokemonVar = [data];
          // chosenVar = data;
        }
        // pokemonVar.splice(0, 1);
        bossVar.splice(0, 1);

        setTemporary((prevState) => ({
          ...prevState,
          // chosen: chosenVar,
          pokemon: pokemonVar,
          boss: bossVar,
          bossChosen: bossChosenVar,
        }));
      });
  }, [temporary]);

  // const randomInt = (rand) => {
  //   return Math.floor(Math.random() * rand);
  // };

  // const generatePokemon = (id, props) => {
  // return temporary["wild"].filter((pokemon) => pokemon.pokemonId === i
  //   return rarity[`${props}`].filter((pokemon) => pokemon.pokemonId === id);
  // };

  // const groupChosen = (props) => {
  // let group = level[`${props}`];
  // let length = group.length;
  // let rand = randomInt(length);

  // let group = level[`${props}`];
  // let length = group.length;
  // let rand = randomInt(length);
  // let chosenLevel = group[rand];
  // let wildPokemon = generatePokemon(chosenLevel, props);

  // let chosenLevel = group[rand];
  // let wildPokemon = generatePokemon(chosenLevel);

  //   setTemporary((prevState) => ({
  //     ...prevState,
  //     boss: wildPokemon,
  //   }));
  // };

  const updatePokemons = (index) => {
    let temp = temporary["pokemon"];
    temp.splice(index, 1);
    setPokemon(temp);
  };

  const damageCalc = (attacker, attacked) => {
    let newHp = attacked.currentHealth;
    let attackedStat = attacked;
    newHp -= attacker;

    attackedStat["currentHealth"] = newHp;
    return attackedStat;
  };

  const counterUser = (userMoves, level) => {
    if (level === "special") {
      for (const moves of userMoves) {
        if (moves.level === "special") {
          moves.gauge = 0;
        } else if (moves.level === "medium") {
          if (moves.gauge != 100) {
            moves.gauge += 50;
          }
        }
      }
    } else if (level === "medium") {
      for (const moves of userMoves) {
        if (moves.level === "medium") {
          moves.gauge = 0;
        } else if (moves.level === "special") {
          if (moves.gauge != 100) {
            moves.gauge += 20;
          }
        }
      }
    }
  };

  const typeAdvantage = (moveType, pokemonType) => {
    switch (moveType) {
      case "Dragon":
        switch (pokemonType) {
          case "Dragon":
            return 2;
          default:
            return 1;
        }
      case "Ghost":
        switch (pokemonType) {
          case "Normal":
            return 0;
          case "Psychic":
            return 0;
          case "Ghost":
            return 2;
          default:
            return 1;
        }
      case "Rock":
        switch (pokemonType) {
          case "Fire":
            return 2;
          case "Ice":
            return 0.5;
          case "Fighting":
            return 0.5;
          case "Flying":
            return 2;
          case "Ground":
            return 0.5;
          case "Ghost":
            return 0.5;
          default:
            return 1;
        }
      case "Bug":
        switch (pokemonType) {
          case "Fire":
            return 0.5;
          case "Grass":
            return 2;
          case "Fighting":
            return 0.5;
          case "Poison":
            return 2;
          case "Flying":
            return 0.5;
          case "Psychic":
            return 2;
          case "Ghost":
            return 0.5;
          default:
            return 1;
        }
      case "Psychic":
        switch (pokemonType) {
          case "Fighting":
            return 2;
          case "Poison":
            return 2;
          case "Psychic":
            return 0.5;
          default:
            return 1;
        }
      case "Flying":
        switch (pokemonType) {
          case "Electric":
            return 0.5;
          case "Grass":
            return 2;
          case "Fighting":
            return 2;
          case "Bug":
            return 2;
          case "Ghost":
            return 0.5;
          default:
            return 1;
        }
      case "Ground":
        switch (pokemonType) {
          case "Fire":
            return 2;
          case "Electric":
            return 2;
          case "Grass":
            return 0.5;
          case "Poison":
            return 2;
          case "Flying":
            return 0;
          case "Bug":
            return 0.5;
          case "Rock":
            return 2;
          default:
            return 1;
        }
      case "Poison":
        switch (pokemonType) {
          case "Grass":
            return 2;
          case "Ice":
            return 2;
          case "Grass":
            return 0.5;
          case "Poison":
            return 0.5;
          case "Ground":
            return 0.5;
          case "Bug":
            return 2;
          case "Rock":
            return 0.5;
          case "Ghost":
            return 0.5;
          default:
            return 1;
        }
      case "Fighting":
        switch (pokemonType) {
          case "Normal":
            return 2;
          case "Ice":
            return 2;
          case "Grass":
            return 0.5;
          case "Poison":
            return 0.5;
          case "Psychic":
            return 0.5;
          case "Flying":
            return 0.5;
          case "Bug":
            return 0.5;
          case "Rock":
            return 2;
          case "Ghost":
            return 0;
          default:
            return 1;
        }
      case "Ice":
        switch (pokemonType) {
          case "Water":
            return 0.5;
          case "Grass":
            return 2;
          case "Ice":
            return 0.5;
          case "Ground":
            return 2;
          case "Flying":
            return 2;
          case "Dragon":
            return 2;
          default:
            return 1;
        }
      case "Grass":
        switch (pokemonType) {
          case "Fire":
            return 0.5;
          case "Water":
            return 2;
          case "Grass":
            return 0.5;
          case "Poison":
            return 0.5;
          case "Ground":
            return 2;
          case "Flying":
            return 0.5;
          case "Dragon":
            return 0.5;
          default:
            return 1;
        }
      case "Electric":
        switch (pokemonType) {
          case "Water":
            return 2;
          case "Electric":
            return 0.5;
          case "Grass":
            return 0.5;
          case "Ground":
            return 0;
          case "Flying":
            return 2;
          case "Dragon":
            return 0.5;
          default:
            return 1;
        }
      case "Water":
        switch (pokemonType) {
          case "Fire":
            return 2;
          case "Water":
            return 0.5;
          case "Grass":
            return 0.5;
          case "Ground":
            return 2;
          case "Rock":
            return 2;
          case "Dragon":
            return 0.5;
          default:
            return 1;
        }
      case "Fire":
        switch (pokemonType) {
          case "Fire":
            return 0.5;
          case "Water":
            return 0.5;
          case "Grass":
            return 2;
          case "Ice":
            return 2;
          case "Bug":
            return 2;
          case "Rock":
            return 0.5;
          case "Dragon":
            return 0.5;
          default:
            return 1;
        }
      case "Normal":
        switch (pokemonType) {
          case "Rock":
            return 0.5;
          case "Ghost":
            return 0;
          default:
            return 1;
        }
    }
  };

  const userMove = (props) => {
    setAttack(true);
    // if (!temporary["bossMove"]) {
    //   npcMoves();
    // }
    // if (newPokemon) {
    //   npcMoves();
    //   setNewPokemon(false);
    // }
    let npc = temporary["bossChosen"];
    let userMoves = temporary["chosen"].moves;
    let user = temporary["chosen"];

    let typePokemon = temporary["chosen"].type;
    let typeMove = props.type;
    let typeBonus = 1;

    if (typeMove === typePokemon) {
      typeBonus = 1.2;
    }

    typeBonus *= user.level * 0.009;
    let test = typeAdvantage(props.type, npc.type);

    typeBonus += test;

    if (props.attack >= 100) {
      counterUser(userMoves, props.level);
    } else if (props.attack < 100 && props.attack >= 55) {
      counterUser(userMoves, props.level);
    } else {
      for (const move of userMoves) {
        switch (move.level) {
          case "medium":
            if (move.gauge != 100) {
              move.gauge += 50;
            }
            break;
          case "special":
            if (move.gauge != 100) {
              move.gauge += 20;
            }
        }
      }
    }

    user.moves = userMoves;

    setTimeout(() => {
      setAttack(false);
      setTemporary((prevState) => ({
        ...prevState,
        chosenMove: null,
      }));
    }, 2000);

    let attackedStat = damageCalc(props.attack * typeBonus, npc);

    let pokemon = temporary["pokemon"];

    pokemon.push(user);

    // conso

    // setAttack(false);

    if (user.currentHealth < 0) {
    }
    if (npc.currentHealth <= 0) {
      let boss = temporary["boss"];

      let bossChosen = boss[0];
      boss.splice(0, 1);
      setTemporary((prevState) => ({
        ...prevState,
        chosenMove: props,
        boss,
        bossChosen,
        bossMove: null,
        // start: false,
        // chosen: null,
      }));
    } else {
      setTemporary((prevState) => ({
        ...prevState,
        chosenMove: props,
        // boss: [attackedStat],
        chosen: user,
      }));
    }

    // setTimeout(function () {
    //   setAttack(false);
    // }, 1500);
  };

  const overExp = (data) => {
    let difference;
    if (data > 100) {
      difference = data - 100;
      if (difference > 100) {
        overExp(difference);
      } else {
        return difference;
      }
    }
  };

  const exp = () => {
    let pokemonVar = temporary["pokemon"];
    let evolution = rarity["evolution"];
    let chosenVar = temporary["chosen"];

    for (const [i, pokemon] of pokemonVar.entries()) {
      pokemon["currentHealth"] = pokemon["health"];
      if (pokemon["level"] != 50) {
        pokemon["currentExperience"] += 1000 / pokemon["level"];
        if (pokemon["currentExperience"] >= 100) {
          pokemon["level"]++;
          pokemon["currentHealth"] += 2;
          pokemon["health"] += 2;
          pokemon["currentExperience"] = overExp(pokemon["currentExperience"]);

          if (
            !pokemon["fullyEvolved"] &&
            (pokemon["level"] === 15 || pokemon["level"] === 16)
          ) {
            let newId = pokemon["pokemonId"] + 1;
            let newEvolved = evolution.filter(
              (data) => data.pokemonId === newId
            );
            pokemonVar.splice(i, 1);
            if (Array.isArray(newEvolved)) {
              newEvolved = [...newEvolved];
              pokemonVar.push(newEvolved.pop());
            } else {
              pokemonVar.push(newEvolved);
            }
          }
        }
      }
    }

    chosenVar["currentHealth"] = chosenVar["health"];
    if (chosenVar["level"] != 50) {
      chosenVar["currentExperience"] += 1000 / chosenVar["level"];
      if (chosenVar["currentExperience"] >= 100) {
        chosenVar["level"]++;
        chosenVar["currentHealth"] += 2;
        chosenVar["health"] += 2;
        chosenVar["currentExperience"] = overExp(
          chosenVar["currentExperience"]
        );
        if (
          !chosenVar["fullyEvolved"] &&
          (chosenVar["level"] === 2 || chosenVar["level"] === 16)
        ) {
          let newId = chosenVar["pokemonId"] + 1;
          let newEvolved = evolution.filter((data) => data.pokemonId === newId);
          chosenVar = newEvolved;
          // chosenVar["currentHealth"] = chosenVar["health"];
        }
      }
    }
    let temp;
    if (Array.isArray(chosenVar)) {
      temp = [...chosenVar];
      pokemonVar.push(temp.pop());
    } else {
      pokemonVar.push(chosenVar);
    }
    localStorage["pokemon"] = JSON.stringify(pokemonVar);
  };

  const npcMoves = () => {
    setTemporary((prevState) => ({
      ...prevState,
      start: true,
    }));
    let autoAttack = setInterval(function () {
      let bossVar = temporary["bossChosen"];
      let moves = temporary["bossChosen"].moves;
      let user = temporary["chosen"];
      let npcAttack;

      if (
        moves.filter((move) => move.level === "weak" && move.gauge === 100)
          .length > 0
      ) {
        npcAttack = moves.filter(
          (move) => move.level === "weak" && move.gauge === 100
        );
      }
      if (
        moves.filter((move) => move.level === "medium" && move.gauge === 100)
          .length > 0
      ) {
        npcAttack = moves.filter(
          (move) => move.level === "medium" && move.gauge === 100
        );
      }
      if (
        moves.filter((move) => move.level === "special" && move.gauge === 100)
          .length > 0
      ) {
        npcAttack = moves.filter(
          (move) => move.level === "special" && move.gauge === 100
        );
      }

      for (const temp of moves) {
        if (npcAttack.level !== "weak" && temp["name"] === npcAttack["name"]) {
          temp["gauge"] = 0;
        }
        if (temp["gauge"] != 100) {
          if (temp["level"] === "medium") {
            temp["gauge"] += 50;
          }
          if (temp["level"] === "special") {
            temp["gauge"] += 25;
          }
        }
      }

      let typePokemon = bossVar.type;
      let typeMove = npcAttack[0].type;
      let typeBonus = 1;

      if (typeMove === typePokemon) {
        typeBonus = 1.2;
      }
      typeBonus *= bossVar["level"] * 0.009;

      let test = typeAdvantage(npcAttack[0].type, user.type);
      typeBonus += test;

      const attackedStat = damageCalc(npcAttack[0]["attack"] * typeBonus, user);

      // if (bossVar.currentHealth <= 0) {
      //   setTimeout(function () {
      //     clearInterval(autoAttack);
      //     setTemporary((prevState) => ({
      //       ...prevState,
      //       bossMove: null,
      //       fainted: true,
      //     }));
      //   }, 1500);
      //   exp();
      // } else {]

      if (bossVar.currentHealth <= 0) {
        clearInterval(autoAttack);
      } else if (attackedStat.currentHealth <= 0) {
        const pokemon = temporary["pokemon"];
        let chosen;
        if (pokemon.length > 0) {
          chosen = pokemon.pop();
        } else {
          chosen = null;
        }
        // setTemporary((prevState) => ({ ...prevState, readyMove: false }));
        clearInterval(autoAttack);
        // setNewPokemon(true);
        setTemporary((prevState) => ({ ...prevState, newPokemon: true }));
        setTimeout(
          setTemporary((prevState) => ({
            ...prevState,
            bossChosen: bossVar,
            bossMove: npcAttack[0],
            chosen,
            pokemon,
          })),
          3000
        );
        setTimeout(function () {
          setTemporary((prevState) => ({ ...prevState, newPokemon: false }));
        }, 3000);
        // setTimeout(npcMoves, 3000);
        // setTimeout(setNewPokemon(false), 2500);
      } else {
        setTemporary((prevState) => ({
          ...prevState,
          bossChosen: bossVar,
          bossMove: npcAttack[0],
          chosen: attackedStat,
        }));
      }
    }, 3000);
  };

  const startBattle = () => {
    setTemporary((prevState) => ({
      ...prevState,
      start: true,
      battleShowButton: false,
    }));
    npcMoves();
  };

  const iChoose = (props) => {
    let pokemonVar = temporary["pokemon"];
    pokemonVar.splice(
      pokemonVar.findIndex((item) => item.pokemonId === props.pokemonId),
      1
    );

    setTemporary((prevState) => ({
      ...prevState,
      pokemon: pokemonVar,
      battleShowButton: true,
      chosen: props,
    }));
  };

  return (
    <div className={styles.container}>
      <Categories />
      {temporary["start"] && temporary["chosen"] ? (
        <div className={styles.battleContainer}>
          <div className={styles.rowOption}>
            <NpcPokemon
              chosenMove={temporary["chosenMove"]}
              chosen={temporary["chosen"]}
              npc={temporary["bossChosen"]}
            />
          </div>
          {!temporary["newPokemon"] && (
            <>
              <div>
                <UserPokemon
                  attack={attack}
                  user={temporary["chosen"]}
                  npcMove={temporary["bossMove"]}
                />
              </div>
              <div>
                {temporary["readyMove"] && temporary["chosen"] && (
                  <>
                    {temporary["chosen"].moves.map((move) => (
                      <AttackOptions
                        userMove={userMove}
                        attack={attack}
                        move={move}
                      />
                    ))}
                  </>
                )}
              </div>
            </>
          )}
        </div>
      ) : (
        <div className={styles.rowEach}>
          <p>So you wish to challenge me?!</p>
          <img src="http://pa1.narvii.com/7152/79f43c7ea0ebbd4c7d017d52fc8cca851958aee7r1-200-200_00.gif" />
          {temporary["bossChosen"] && (
            <img src={temporary["bossChosen"].frontImage} />
          )}

          <h5>techjoe</h5>
          {temporary["pokemon"] &&
            temporary["pokemon"].map((pokemon) => (
              <>
                <img src={pokemon.frontImage} />
                <button onClick={() => iChoose(pokemon)}>CHOOSE</button>
              </>
            ))}
          {temporary["battleShowButton"] && (
            <button onClick={() => startBattle()}>BATTLE</button>
          )}
        </div>
      )}
    </div>
  );
}
