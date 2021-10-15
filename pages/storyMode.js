import styles from "../styles/StoryMode.module.css";
import React, { useEffect, useState } from "react";
import LeaderContainer from "./leaderContainer";
import ChoosePokemon from "./choosePokemon";
import ProgressBar from "./storyProgressBar";
import MoveBar from "./moveBar";

export default function StoryMode() {
  const [autoAttack, setAutoAttack] = useState(false);
  const [userDisable, setUserDisable] = useState(false);
  const color = {
    Grass: "green",
    Fire: "red",
    Normal: "white",
    Dragon: "purple",
    Poison: "violet",
    Electric: "yellow",
    Water: "blue",
    Bug: "light green",
    Flying: "white",
    Rock: "dark brown",
    Ground: "light brown",
    Psychic: "pink",
  };
  const [data, setData] = useState({
    userPokemonsTemp: null,
    leader: null,
    pokemonOption: false,
    inventory: null,
    userPokemons: [],
    battle: false,
    userMove: null,
    npcMove: null,
    battleEnd: false,
    evolution: null,
    win: null,
  });
  useEffect(() => {
    const leaders = JSON.parse(sessionStorage.getItem("leaders"));
    let inventory = JSON.parse(sessionStorage.getItem("pokemon"));
    let evolution = JSON.parse(sessionStorage.getItem("evolution"));
    let leader;
    leader = leaders.shift();

    setData((prevState) => ({
      ...prevState,
      leader,
      inventory,
      evolution,
    }));
  }, []);

  const typeAdvantage = (moveType, pokemonType) => {
    switch (moveType) {
      case "Dragon":
        if (pokemonType == "Dragon") {
          return 2;
        } else {
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

  const pokemonChoose = () =>
    setData((prevState) => ({ ...prevState, pokemonOption: true }));

  const chosenPokemon = (props) => {
    let userPokemons = data["userPokemons"];
    let inventory = data["inventory"];
    let index = inventory.findIndex(
      (i) =>
        i.name === props.name && i.currentExperience === props.currentExperience
    );

    inventory.splice(index, 1);
    userPokemons.push(props);

    setData((prevState) => ({
      ...prevState,
      userPokemons,
      userPokemonsTemp: userPokemons,
      inventory,
    }));
  };

  const removePokemon = (props) => {
    let userPokemons = data["userPokemons"];
    let inventory = data["inventory"];
    let index = userPokemons.findIndex(
      (i) =>
        i.name === props.name && i.currentExperience === props.currentExperience
    );

    userPokemons.splice(index, 1);
    inventory.push(props);

    setData((prevState) => ({
      ...prevState,
      userPokemons,
      inventory,
    }));
  };

  const toBattle = () =>
    setData((prevState) => ({ ...prevState, battle: true }));

  const npcAttackFunction = () => {
    if (!autoAttack) {
      const autoNpc = setInterval(function () {
        if (data["leader"].pokemon.length === 0) {
          clearInterval(autoNpc);
        } else {
          let userPokemons = data["userPokemons"];
          let leader = data["leader"];
          let moves = leader.pokemon[0].moves;
          let npcMove = moves.filter(
            (move) =>
              (move.level == "special" && move.gauge == 100) ||
              (move.level == "medium" && move.gauge == 100) ||
              move.level == "weak"
          );

          npcMove = npcMove.pop();

          for (const move of moves) {
            if (move.level != "weak") {
              if (move.gauge >= 100) {
                move.gauge = 0;
              } else {
                if (move.level === "special") {
                  move.gauge += 25;
                } else {
                  move.gauge += 50;
                }
              }
            }
          }

          let typePokemon = leader.pokemon[0].type;
          let typeMove = npcMove.type;
          let typeBonus = 1;

          if (typeMove === typePokemon) {
            typeBonus = 1.2;
          }

          typeBonus *= leader.pokemon[0].level * 0.009;
          let bonus = typeAdvantage(typeMove, leader.pokemon[0].type);

          typeBonus += bonus;

          console.log(npcMove.attack * typeBonus);

          userPokemons[0].currentHealth =
            userPokemons[0].currentHealth - npcMove.attack * typeBonus;

          // console.log(npcMove.attack * typeBonus);

          // userPokemons[0].currentHealth -= npcMove.attack;

          setData((prevState) => ({ ...prevState, npcMove }));
          if (userPokemons[0].currentHealth <= 0) {
            if (userPokemons.length > 1) {
              userPokemons.splice(0, 1);
            } else {
              userPokemons[0].currentHealth = 0;

              setTimeout(function () {
                userPokemons.splice(0, 1);
                setData((prevState) => ({
                  ...prevState,
                  battleEnd: true,
                  win: false,
                }));
              }, 2000);
            }
            clearInterval(autoNpc);
            setAutoAttack(false);
          }
        }
      }, 2000);
    }
    setAutoAttack(true);
  };

  const attackMove = (props) => {
    npcAttackFunction();

    let userMove = props;
    let userCurrent = data["userPokemons"][0];
    let currentNpc = data["leader"].pokemon[0];
    let leader = data["leader"].pokemon;
    let userMoves = userCurrent.moves;
    let typeMove = userMove.type;
    let typePokemon = userCurrent.type;
    let typeBonus = 1;

    if (typeMove === typePokemon) {
      typeBonus = 1.2;
    }

    typeBonus *= userCurrent.level * 0.009;
    let bonus = typeAdvantage(typeMove, currentNpc.type);

    typeBonus += bonus;

    for (const move of userMoves) {
      if (move.name !== props.name) {
        if (move.gauge < 100 && move.level == "special") {
          move.gauge += 25;
        } else if (move.gauge < 100 && move.level == "medium") {
          move.gauge += 50;
        }
      } else {
        if (props.name == move.name && move.level != "weak") {
          move.gauge = 0;
        }
      }
    }

    setTimeout(function () {
      setData((prevState) => ({ ...prevState, userMove: null }));
    }, 2000);

    currentNpc.currentHealth =
      currentNpc.currentHealth - userMove.attack * typeBonus;

    if (currentNpc.currentHealth <= 0 && leader.length > 1) {
      leader.splice(0, 1);
    } else if (leader.length == 1 && currentNpc.currentHealth <= 0) {
      currentNpc.currentHealth = 0;
      setTimeout(function () {
        leader.splice(0, 1);
        setAutoAttack(false);
        setData((prevState) => ({
          ...prevState,
          battleEnd: true,
          win: true,
        }));

        let leaders = JSON.parse(sessionStorage.getItem("leaders"));
        leaders.shift();
        sessionStorage["leaders"] = JSON.stringify(leaders);
      }, 2000);
    }

    setUserDisable(true);
    setTimeout(function () {
      setUserDisable(false);
    }, 2000);

    setData((prevState) => ({ ...prevState, userMove }));
  };

  const switchPokemon = (props) => {
    let userPokemons = data["userPokemons"];
    let index = userPokemons.findIndex(
      (i) =>
        i.name === props.name && i.currentExperience === props.currentExperience
    );
    userPokemons.splice(index, 1);
    userPokemons.unshift(props);
    setData((prevState) => ({ ...prevState, userPokemons }));
  };

  return (
    <div className={styles.container}>
      {!data["battle"] && (
        <>
          {data["pokemonOption"] ? (
            <ChoosePokemon
              userPokemon={data["userPokemons"]}
              inventory={data["inventory"]}
              removePokemon={(e) => removePokemon(e)}
              chosenPokemon={(e) => chosenPokemon(e)}
              toBattle={() => toBattle()}
            />
          ) : (
            <LeaderContainer
              leader={data["leader"]}
              message="introMessage"
              pokemonChoose={() => pokemonChoose()}
              battleEnd={false}
            />
          )}
        </>
      )}
      {data["battle"] &&
        data["userPokemons"].length != 0 &&
        data["leader"].pokemon.length != 0 && (
          <>
            <div className={styles.battleContainer}>
              <div className={styles.npcContainer}>
                <p>
                  LV {data["leader"].pokemon[0].level}{" "}
                  {data["leader"].pokemon[0].name}
                </p>
                <ProgressBar
                  percentage={
                    (data["leader"].pokemon[0].currentHealth /
                      data["leader"].pokemon[0].health) *
                    100
                  }
                  // clssName={true}
                />
                <div className={styles.imageContainer}>
                  {data["userMove"] && (
                    <img
                      className={styles.npcAnimation}
                      src={data["userMove"].animation}
                    />
                  )}
                  <div
                    className={
                      data["npcMove"] === null
                        ? styles.npcImageContainer
                        : styles.npcMoveImageContainer
                    }
                  >
                    <img
                      className={
                        data["leader"].pokemon[0].currentHealth == 0
                          ? styles.npcImageRip
                          : styles.npcImage
                      }
                      src={data["leader"].pokemon[0].frontImage}
                    />
                  </div>
                </div>
              </div>
              <div className={styles.npcContainer}>
                {data["npcMove"] && (
                  <img
                    className={styles.npcAnimation}
                    src={data["npcMove"].animation}
                  />
                )}
                <div
                  className={
                    userDisable
                      ? styles.userMoveImageContainer
                      : styles.userImageContainer
                  }
                >
                  <img
                    className={
                      data["userPokemons"][0].currentHealth == 0
                        ? styles.userImageRip
                        : styles.userImage
                    }
                    src={data["userPokemons"][0].backImage}
                  />
                </div>
                <p>
                  LV{data["userPokemons"][0].level}{" "}
                  {data["userPokemons"][0].name}
                </p>
                <ProgressBar
                  percentage={
                    (data["userPokemons"][0].currentHealth /
                      data["userPokemons"][0].health) *
                    100
                  }
                />
              </div>
            </div>
            <div>
              {data && data["userPokemons"][0].currentHealth != 0 && (
                <>
                  {data["userPokemons"][0].moves.map((move) => (
                    <div className={styles.moveContainer}>
                      {move.gauge >= 100 ? (
                        <div className={styles.chargedMove}>
                          <button
                            disabled={userDisable}
                            onClick={() => attackMove(move)}
                            style={{ backgroundColor: color[`${move.type}`] }}
                          >
                            <b>
                              {move.name.toUpperCase()} - {move.attack}
                            </b>
                          </button>
                        </div>
                      ) : (
                        <div className={styles.unchargedMove}>
                          {move.name.toUpperCase()} - {move.attack}
                          <MoveBar percentage={(move.gauge / 100) * 100} />
                        </div>
                      )}
                    </div>
                  ))}
                </>
              )}
            </div>
            <div className={styles.sparePokemons}>
              {data["userPokemons"].map((pokemon) => (
                <button onClick={() => switchPokemon(pokemon)}>
                  <img src={pokemon.frontImage} />
                </button>
              ))}
            </div>
          </>
        )}
      {data["battleEnd"] && (
        <LeaderContainer
          leader={data["leader"]}
          message={data["win"] ? "winningMessage" : "losingMessage"}
          pokemonChoose={() => pokemonChoose()}
          battleEnd={true}
        />
      )}
    </div>
  );
}
