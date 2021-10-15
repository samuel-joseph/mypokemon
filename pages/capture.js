import React, { useState, useEffect } from "react";
import styles from "../styles/Capture.module.css";
import ViewPokemon from "../pages/viewPokemon";
import Link from "next/link";

export default function Capture(props) {
  const [value, setValue] = useState("");
  const [temporary, setTemporary] = useState({
    counter: 2,
    num: 0,
    isClicked: false,
    message: "",
    image: "https://thumbs.gfycat.com/GenerousTimelyBrontosaurus-max-1mb.gif",
    success: false,
  });

  const changeImage = (image, message, success) => {
    setTemporary((prevState) => ({
      ...prevState,
      image,
      message,
      success,
    }));
  };

  const handleSubmit = () => {
    let newPokemon = props.pokemon;
    if (value !== "") {
      newPokemon["name"] = value;
    }
    const data = JSON.parse(sessionStorage.getItem("pokemon") || "[]");
    let myPokemon;
    newPokemon.currentHealth = newPokemon.health;

    if (Array.isArray(data)) {
      myPokemon = [...data];
    } else {
      myPokemon = [data];
    }
    myPokemon.push(newPokemon);
    sessionStorage["pokemon"] = JSON.stringify(myPokemon);
  };

  const tap = () => {
    let temp;
    let num = temporary["num"];
    let counter = temporary["counter"];
    let width = document.getElementById("circ").getBoundingClientRect().width;
    let width1 = document.getElementById("circ1").getBoundingClientRect().width;
    temp = Math.abs(width - width1);
    num += temp;
    counter = counter - 1;

    if (counter == 0) {
      setTimeout(function () {
        console.log(num);
        if (num < 30) {
          changeImage(
            "https://www.freeiconspng.com/thumbs/pokeball-png/pokeball-transparent-png-2.png",
            `You have successfully captured ${props.pokemon.name}! Please provide a nickname`,
            true
          );
        } else {
          changeImage(
            props.pokemon.frontImage,
            `You have failed to capture ${props.pokemon.name}`,
            false
          );
        }
      }, 3000);
    }

    setTemporary((prevState) => ({
      ...prevState,
      num,
      counter,
      isClicked: true,
    }));
  };
  return (
    <>
      <div>
        <div className={styles.base}>
          {temporary["counter"] > 0 ? (
            <div id="circ1" className={styles.circle1}>
              <div
                id="circ"
                className={
                  temporary["isClicked"] ? styles.smallCircle : styles.bigCircle
                }
              >
                <img className={styles.image} src={props.pokemon.frontImage} />
              </div>
            </div>
          ) : (
            <div className={styles.row}>
              <img className={styles.ball} src={temporary["image"]} />
              <p>{temporary["message"]}</p>
              {temporary["success"] && (
                <form onSubmit={handleSubmit}>
                  <label>
                    <input
                      type="text"
                      value={value}
                      onChange={(event) => setValue(event.target.value)}
                    />
                  </label>
                  <input type="submit" value="Submit" />
                </form>
              )}
            </div>
          )}
        </div>
      </div>
      {temporary["counter"] > 0 && (
        <button onClick={tap} className={styles.test}>
          TAP
        </button>
      )}
      {/* <img
        className={styles.test}
        src="https://thumbs.gfycat.com/GenerousTimelyBrontosaurus-max-1mb.gif"
        onClick={tap}
      /> */}
    </>
  );
}

// import React, { useState, useEffect } from "react";
// import styles from "../styles/Capture.module.css";

// http://pixelartmaker-data-78746291193.nyc3.digitaloceanspaces.com/image/abc457fc9571e42.png

// import ViewPokemon from "../pages/viewPokemon";
// import Link from "next/link";

// export default function Capture(props) {
//   const [disable, setDisable] = useState(true);
//   const [result, setResult] = useState("");
//   const [capture, setCapture] = useState(false);
//   const [ball, setBall] = useState(
//     "https://thumbs.gfycat.com/GenerousTimelyBrontosaurus-max-1mb.gif"
//   );
//   useEffect(() => {
//     setTimeout(() => {
//       setDisable(props.current);
//     }, 5000);
//   });

//   const beingCapture = (pokemons, pokemon) => {
//     console.log(pokemon.name + " ==> this is Pokemon, being pushed");
//     // console.log(pokemons + " ==> this is Pokemons");
//     pokemons.push(pokemon);
//     sessionStorage["pokemon"] = JSON.stringify(pokemons);
//   };

//   function getRandomInt(max) {
//     return Math.floor(Math.random() * max);
//   }

//   const startCapture = () => {
//     setCapture(true);
//     let myPokemon;
//     let newPokemon = props.pokemon;
//     const data = JSON.parse(sessionStorage.getItem("pokemon") || "[]");
//     newPokemon.currentHealth = newPokemon.health;
//     const pokemonLevel = newPokemon.level;

//     if (Array.isArray(data)) {
//       myPokemon = [...data];
//     } else {
//       myPokemon = [data];
//     }

//     console.log(data);

//     const len = myPokemon.length;
//     let averageLevel = 0;
//     let theResult;

//     for (let i = 0; i < myPokemon.length; i++) {
//       averageLevel += myPokemon[0].level;
//     }
//     averageLevel = averageLevel / myPokemon.length;
//     if (len < 3 && pokemonLevel <= averageLevel) {
//       beingCapture(myPokemon, newPokemon);
//       theResult = true;
//     } else {
//       if (getRandomInt(pokemonLevel - averageLevel) === 1) {
//         beingCapture(myPokemon, newPokemon);

//         theResult = true;
//       } else {
//         theResult = false;
//       }
//     }
//     setTimeout(function () {
//       if (theResult) {
//         setBall(
//           "https://cdn2.scratch.mit.edu/get_image/user/51701900_60x60.png"
//         );
//         setResult(`You have captured ${props.pokemon.name}!`);
//       } else {
//         setBall(props.pokemon.frontImage);
//         if (len === 3) {
//           setResult(`Too many pokemon, free a pokemon before catching!`);
//         } else {
//           setResult(
//             `You have failed to capture ${props.pokemon.name}, need more level!`
//           );
//         }
//       }
//     }, 3000);
//   };

//   return (
//     <div>
//       {capture ? (
//         <div className={styles.pokemon}>
//           <p className={styles.text}>{result}</p>
//           <img className={styles.image} src={ball} />
//         </div>
//       ) : (
//         <>
//           <p>Capture {props.pokemon.name}?</p>
//           <button disabled={disable} onClick={() => startCapture()}>
//             YES
//           </button>
//           <button>
//             <Link href="/viewPokemon">NO</Link>
//           </button>
//           <img className={styles.image} src={props.pokemon.frontImage} />
//         </>
//       )}
//     </div>
//   );
// }
