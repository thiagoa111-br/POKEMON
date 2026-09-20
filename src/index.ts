

import { buscarPokemon } from "./buscarPokemon";
import { mapearPokemon } from "./mapearPokemon";
import { catalogo, listarCatalogo, removerPokemon } from "./catalogo";

async function main() {
  try {
    const nomesPokemon = [
      "pidgey",
      "pikachu",
      "charmander",
      "squirtle",
      "bulbasaur"
    ];
    
    for (const nome of nomesPokemon) {
      const dadosApi = await buscarPokemon(nome);

      const pokemonResumo = mapearPokemon(dadosApi);

      catalogo.push(pokemonResumo);

      console.log(`✅ ${pokemonResumo.nome} adicionado ao catálogo.`);
    }

    listarCatalogo();
    removerPokemon(25);

  } catch (erro) {
    console.log("❌ Erro ao buscar Pokémon.");
  }
}

main();