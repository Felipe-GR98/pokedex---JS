const containePoke = document.querySelector("#ConteinerPoke");
let countpoke = 1000;

const colors = {
  fire: "#FDDFDF",
  grass: "#DEFDE0",
  electric: "#FCF7DE",
  water: "#DEF3FD",
  ground: "#f4e7da",
  rock: "#d5d5d4",
  fairy: "#fceaff",
  poison: "#98d7a5",
  bug: "#f8d5a3",
  dragon: "#97b3e6",
  psychic: "#eaeda1",
  flying: "#F5F5F5",
  fighting: "#E6E0D4",
  normal: "#F5F5F5",
};

const types = Object.keys(colors);

const getPokemons = async () => {
  for (let i = 1; i <= countpoke; i++) {
    await getpokes(i);
  }
};

const getpokes = async (id) => {
  let url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const response = await fetch(url);
  const date = await response.json();
  createCardPoke(date);
  console.log(date);
};

const createCardPoke = (poke) => {
  const cardPoke = document.createElement("div");
  cardPoke.classList.add("pokemom");

  const name = poke.name[0].toUpperCase() + poke.name.slice(1);
  const id = poke.id.toString().padStart(3, "0");

  const typePoke = poke.types.map((type) => type.type.name);
  const typeMain = types.find((type) => typePoke.indexOf(type) > -1);
  const color = colors[typeMain];
  const expBase = poke.base_experience;
  const statsHp = poke.stats[0].base_stat;
  const statsAtk = poke.stats[1].base_stat;
  const statsDef = poke.stats[2].base_stat;
  const statsSa = poke.stats[3].base_stat;
  const statsSd = poke.stats[4].base_stat;
  const statsSpeed = poke.stats[5].base_stat;

  cardPoke.style.backgroundColor = color;

  const pokemonInnerHtml = `
        <div class="imgPoke">
          <img
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${poke.id}.png"
            alt="name"
          />
        </div>
        <div class="info">
          <span class="number">#${id}</span>
          <h3 class="name">${name}</h3>
          <small class="Type">Type: <span>${typeMain}</span> </small>
          <p class="Type"> EXP Base: ${expBase}</p>
          <p class="Type"> HP Base: ${statsHp}</p>
          <p class="Type"> ATK Base: ${statsAtk}</p>
          <p class="Type"> DEF Base: ${statsDef}</p>
          <p class="Type"> ATK S Base: ${statsSa}</p>
          <p class="Type"> DEF S Base: ${statsSd}</p>
          <p class="Type"> SPD Base: ${statsSpeed}</p>
        </div>
 `;
  cardPoke.innerHTML = pokemonInnerHtml;

  containePoke.appendChild(cardPoke);
};
getPokemons();
