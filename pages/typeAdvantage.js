export default typeAdvantage = (moveType, pokemonType) => {
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
