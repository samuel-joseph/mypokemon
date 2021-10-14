import styles from "../styles/Explore.module.css";
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
  const [pick, setPick] = useState(false);
  const [newPokemon, setNewPokemon] = useState(false);
  const [ignite, setIgnite] = useState(false);
  const [attack, setAttack] = useState(false);
  const [temporary, setTemporary] = useState({
    chosen: null,
    chosenMove: null,
    start: false,
    pokemon: null,
    wild: null,
    fainted: false,
    wildAppear: null,
    wildLevel: null,
    wildMove: null,
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
  const [userLevel, setUserLevel] = useState(0);

  const level = {
    common: [19, 16, 37, 60, 43],
    rare: [25, 129, 120, 93, 64, 75],
    unique: [134, 135, 136, 142, 147, 143, 131],
    legend: [144, 146, 145],
  };

  useEffect(() => {
    let pokemonVar;

    fetch("https://samuel-joseph.github.io/jsonapi/pokemon.json")
      .then((results) => results.json())
      .then((response) => {
        setRarity((prevState) => ({
          ...prevState,
          common: response.common,
          rare: response.rare,
          unique: response.unique,
          legend: response.legend,
          evolution: response.evolution,
        }));

        const data = JSON.parse(sessionStorage.getItem("pokemon") || "[]");
        if (Array.isArray(data)) {
          pokemonVar = [...data];
        } else {
          pokemonVar = [data];
        }

        let highestLevel = 0;
        for (let pokemon of pokemonVar) {
          if (highestLevel < pokemon.level) {
            highestLevel = pokemon.level;
          }
        }

        setUserLevel(highestLevel);

        setTemporary((prevState) => ({
          ...prevState,
          pokemon: pokemonVar,
        }));
      });
  }, []);

  const randomInt = (rand) => {
    return Math.floor(Math.random() * rand);
  };

  const generatePokemon = (id, props) => {
    console.log("This is ID: " + id);
    console.log(rarity[`${props}`]);

    return rarity[`${props}`].filter((pokemon) => pokemon.pokemonId === id);
  };

  const groupChosen = (props) => {
    // let group = level[`${props}`];
    // let length = group.length;
    // let rand = randomInt(length);

    let group = level[`${props}`];
    console.log(group);
    let length = group.length;
    console.log(length);
    let rand = randomInt(length);
    console.log(rand);
    let chosenLevel = group[rand];
    console.log(chosenLevel);
    let wildPokemon = generatePokemon(chosenLevel, props);

    // let chosenLevel = group[rand];
    // let wildPokemon = generatePokemon(chosenLevel);

    setTemporary((prevState) => ({
      ...prevState,
      wildAppear: wildPokemon,
      wildLevel: wildPokemon[0].level,
    }));
  };

  const updatePokemons = (index) => {
    let temp = temporary["pokemon"];
    temp.splice(index, 1);
    setPokemon(temp);
  };

  const damageCalc = (attacker, attacked) => {
    let newHp = attacked.currentHealth;
    let attackedStat = attacked;
    newHp -= attacker;

    if (newHp <= 0) {
      newHp = 0;
    }

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
    if (newPokemon) {
      npcMoves();
      setNewPokemon(false);
    }
    let npc = temporary["wildAppear"];
    let userMoves = temporary["chosen"].moves;
    let user = temporary["chosen"];

    let typePokemon = temporary["chosen"].type;
    let typeMove = props.type;
    let typeBonus = 1;

    if (typeMove === typePokemon) {
      typeBonus = 1.2;
    }

    typeBonus *= user.level * 0.009;
    let test = typeAdvantage(props.type, npc[0].type);

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
    }, 1500);

    let attackedStat = damageCalc(props.attack * typeBonus, npc[0]);

    setTemporary((prevState) => ({
      ...prevState,
      chosenMove: props,
      wildAppear: [attackedStat],
      chosen: user,
    }));
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
    let bonusExp = 0;
    let pokemonVar = temporary["pokemon"];
    let evolution = rarity["evolution"];
    let chosenVar = temporary["chosen"];

    let x = temporary["wildLevel"];
    x *= 2;
    bonusExp += x * 10;

    pokemonVar.splice(
      pokemonVar.findIndex(
        (data) =>
          data.name == chosenVar.name &&
          data.currentExperience == chosenVar.currentExperience
      ),
      1
    );

    for (const [i, pokemon] of pokemonVar.entries()) {
      pokemon["currentHealth"] = pokemon["health"];
      if (pokemon["level"] != 50) {
        pokemon["currentExperience"] += (500 + bonusExp) / pokemon["level"];
        if (pokemon["currentExperience"] >= 100) {
          pokemon["level"]++;
          pokemon["currentHealth"] += 2;
          pokemon["health"] += 2;
          pokemon["currentExperience"] = overExp(pokemon["currentExperience"]);

          if (
            !pokemon["fullyEvolved"] &&
            (pokemon["level"] === 15 || pokemon["level"] === 30)
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
      chosenVar["currentExperience"] += (1000 + bonusExp) / chosenVar["level"];
      if (chosenVar["currentExperience"] >= 100) {
        chosenVar["level"]++;
        chosenVar["currentHealth"] += 2;
        chosenVar["health"] += 2;
        chosenVar["currentExperience"] = overExp(
          chosenVar["currentExperience"]
        );
        if (
          !chosenVar["fullyEvolved"] &&
          (chosenVar["level"] === 15 || chosenVar["level"] === 30)
        ) {
          let newId = chosenVar["pokemonId"] + 1;
          let newEvolved = evolution.filter((data) => data.pokemonId === newId);
          let nickName = chosenVar.name;
          newEvolved[0].name = nickName;
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

    sessionStorage["pokemon"] = JSON.stringify(pokemonVar);
  };

  const npcMoves = () => {
    setTemporary((prevState) => ({
      ...prevState,
      start: true,
    }));
    let autoAttack = setInterval(function () {
      let wildAppearVar = temporary["wildAppear"];
      let moves = temporary["wildAppear"][0].moves;
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

      let typePokemon = wildAppearVar[0].type;
      let typeMove = npcAttack[0].type;
      let typeBonus = 1;

      if (typeMove === typePokemon) {
        typeBonus = 1.2;
      }
      typeBonus *= wildAppearVar[0]["level"] * 0.009;

      let test = typeAdvantage(npcAttack[0].type, user.type);
      typeBonus += test;

      const attackedStat = damageCalc(npcAttack[0]["attack"] * typeBonus, user);

      if (wildAppearVar[0].currentHealth <= 0) {
        setTimeout(function () {
          clearInterval(autoAttack);
          setTemporary((prevState) => ({
            ...prevState,
            wildMove: null,
            fainted: true,
          }));
        }, 1500);
        exp();
      } else {
        if (attackedStat.currentHealth <= 0) {
          const pokemon = temporary["pokemon"];
          // let chosen = pokemon.pop();
          clearInterval(autoAttack);
          setTemporary((prevState) => ({
            ...prevState,
            wildAppearVar,
            wildMove: npcAttack[0],
            chosen: attackedStat,
            // pokemon,
          }));
          // setNewPokemon(true);
        } else {
          setTemporary((prevState) => ({
            ...prevState,
            wildAppear: wildAppearVar,
            wildMove: npcAttack[0],
            chosen: attackedStat,
          }));
        }
      }
    }, 3000);
  };

  const beginBattle = (chosen) => {
    setTemporary((prevState) => ({
      ...prevState,
      chosen,
    }));
    setIgnite(true);
  };

  return (
    <div className={styles.container}>
      <Categories />
      {temporary["wildAppear"] ? (
        <>
          {!temporary["start"] ? (
            <>
              <div className={styles.wildAppear}>
                {temporary["wildAppear"][0] && (
                  <>
                    <p>A wild {temporary["wildAppear"][0].name} appeared!</p>
                    <div>
                      <img src={temporary["wildAppear"][0].frontImage} />
                    </div>
                    {ignite && (
                      <button className={styles.toBattle} onClick={npcMoves}>
                        BATTLE
                      </button>
                    )}
                  </>
                )}
              </div>
              <p className={styles.unnecessary}>
                Which one of your pokemons should you choose to battle?
              </p>
              <div className={styles.optionPokemon}>
                {temporary["pokemon"].map((pokemon) => (
                  <div className={styles.optionHolder}>
                    <button
                      className={styles.optionButton}
                      onClick={() => beginBattle(pokemon)}
                    >
                      <p>{pokemon.name}</p>
                      <img src={pokemon.frontImage} />
                    </button>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className={styles.row}>
              {temporary["fainted"] ? (
                <Capture pokemon={temporary["wildAppear"][0]} />
              ) : (
                <>
                  {temporary["wildAppear"].map((npc) => (
                    <>
                      <NpcPokemon
                        chosenMove={temporary["chosenMove"]}
                        chosen={temporary["chosen"]}
                        npc={npc}
                      />
                    </>
                  ))}
                </>
              )}
              {!temporary["fainted"] && (
                <>
                  {temporary["chosen"] && (
                    <UserPokemon
                      attack={attack}
                      user={temporary["chosen"]}
                      npcMove={temporary["wildMove"]}
                    />
                  )}
                </>
              )}
            </div>
          )}
          {temporary["start"] && (
            <>
              {temporary["chosen"].currentHealth > 0 &&
                temporary["wildAppear"][0].currentHealth > 0 && (
                  <>
                    {temporary["chosen"].moves.map((move) => (
                      <>
                        {move.gauge && temporary["wildMove"] && (
                          <AttackOptions
                            userMove={userMove}
                            attack={attack}
                            move={move}
                          />
                        )}
                      </>
                    ))}
                  </>
                )}
            </>
          )}
        </>
      ) : (
        <>
          <h1>WELCOME TO THE WILD</h1>
          <div id="test" className={styles.rowOption}>
            <button
              className={styles.rowEach}
              onClick={() => groupChosen("common")}
            >
              COMMON
            </button>
            {userLevel >= 5 && (
              <button
                className={styles.rowEach}
                onClick={() => groupChosen("rare")}
              >
                RARE
              </button>
            )}
            {userLevel >= 15 && (
              <button
                className={styles.rowEach}
                onClick={() => groupChosen("unique")}
              >
                UNIQUE
              </button>
            )}
            {userLevel >= 30 && (
              <>
                <button
                  className={styles.rowEach}
                  onClick={() => groupChosen("legend")}
                >
                  LEGEND
                </button>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
