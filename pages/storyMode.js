import styles from "../styles/StoryMode.module.css";
import React, { useEffect, useState } from "react";
import LeaderContainer from "./leaderContainer";
import ChoosePokemon from "./choosePokemon";
import ProgressBar from "./progressBar";

export default function StoryMode() {
  const [data, setData] = useState({
    leader: null,
    pokemonOption: false,
    inventory: null,
    userPokemons: [],
    battle: false,
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

  const attackMove = (props) => {
    console.log(props);
  };

  const switchPokemon = (props) => {
    console.log(props);
    let userPokemons = data["userPokemons"];
    let index = userPokemons.findIndex(
      (i) =>
        i.name === props.name && i.currentExperience === props.currentExperience
    );
    
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
      {data["battle"] && (
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
              <img src={data["leader"].pokemon[0].frontImage} />
            </div>
            <div>
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
                    <button onClick={() => attackMove(move)}>
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
    </div>
  );
}
