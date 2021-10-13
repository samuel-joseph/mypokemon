import styles from "../styles/StoryMode.module.css";
import React, { useEffect, useState } from "react";
import LeaderContainer from "./leaderContainer";
import ChoosePokemon from "./choosePokemon";
import ProgressBar from "./progressBar";

export default function StoryMode() {
  const [autoAttack, setAutoAttack] = useState(false);
  const [userDisable, setUserDisable] = useState(false);
  const [data, setData] = useState({
    leader: null,
    pokemonOption: false,
    inventory: null,
    userPokemons: [],
    battle: false,
    userMove: null,
    npcMove: null,
    battleEnd: false,
    win: null,
  });
  useEffect(() => {
    const leaders = JSON.parse(sessionStorage.getItem("leaders"));
    let inventory = JSON.parse(sessionStorage.getItem("pokemon"));
    let leader;
    leader = leaders.shift();

    setData((prevState) => ({
      ...prevState,
      leader,
      inventory,
    }));
  }, []);

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
          console.log("STOPPED");
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

          npcMove = npcMove.pop();
          userPokemons[0].currentHealth -= npcMove.attack;
          setData((prevState) => ({ ...prevState, npcMove }));
          if (userPokemons[0].currentHealth <= 0) {
            userPokemons.splice(0, 1);
            clearInterval(autoNpc);
            setAutoAttack(false);
            if (userPokemons.length == 0) {
              setData((prevState) => ({
                ...prevState,
                battleEnd: true,
                win: false,
              }));
            }
          }
        }
      }, 2000);
    }
    setAutoAttack(true);
  };

  const attackMove = (props) => {
    npcAttackFunction();

    let userMove = props;
    let currentNpc = data["leader"].pokemon[0];
    let leader = data["leader"].pokemon;
    let userMoves = data["userPokemons"][0].moves;

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

    currentNpc.currentHealth = currentNpc.currentHealth - userMove.attack;

    if (currentNpc.currentHealth <= 0) {
      leader.splice(0, 1);
    }
    setUserDisable(true);
    setTimeout(function () {
      setUserDisable(false);
    }, 2000);

    setData((prevState) => ({ ...prevState, userMove }));
    if (data["leader"].pokemon.length == 0) {
      setAutoAttack(true);
      setData((prevState) => ({
        ...prevState,
        battleEnd: true,
        win: true,
      }));
    }
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
            <h1>BATTLE</h1>
            <div>
              <div>
                <ProgressBar
                  percentage={
                    (data["leader"].pokemon[0].currentHealth /
                      data["leader"].pokemon[0].health) *
                    100
                  }
                />
                {/* {data["userMove"] && <img src={data["userMove"].animation} />} */}
                <img src={data["leader"].pokemon[0].frontImage} />
              </div>
              <div>
                {/* {data["npcMove"] && <img src={data["npcMove"].animation} />} */}
                <img src={data["userPokemons"][0].frontImage} />
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
              {data["userPokemons"][0].moves.map((move) => (
                <>
                  {move.gauge == 100 ? (
                    <div>
                      <button
                        disabled={userDisable}
                        onClick={() => attackMove(move)}
                      >
                        {move.name}
                      </button>
                    </div>
                  ) : (
                    <div>
                      <ProgressBar percentage={(move.gauge / 100) * 100} />
                    </div>
                  )}
                </>
              ))}
            </div>
            <div>
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
