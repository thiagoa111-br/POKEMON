import { buscarPokemon } from "./buscarPokemon";

export async function testarErro() {
  try {
    const pokemon = await buscarPokemon("pokemonquenaoexiste");

    console.log(pokemon);

  } catch (erro) {
    console.log("❌ Pokémon não encontrado.");
  }
}