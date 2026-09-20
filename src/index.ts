import { buscarPokemon } from "./buscarPokemon";
import { mapearPokemon } from "./mapearPokemon";
import { catalogo } from "./catalogo";

async function main() {
  try {
    // Busca o Pokémon na API
    const dadosApi = await buscarPokemon("pidgey");

    // Simplifica os dados recebidos
    const pokemonResumo = mapearPokemon(dadosApi);

    // Adiciona ao catálogo
    catalogo.push(pokemonResumo);

    console.log("\n===== POKÉMON ENCONTRADO =====");

    console.log(`ID: ${pokemonResumo.id}`);
    console.log(`Nome: ${pokemonResumo.nome}`);
    console.log(`Tipos: ${pokemonResumo.tipos.join(", ")}`);
    console.log(`Imagem: ${pokemonResumo.imagem}`);

    console.log("\n===== CATÁLOGO =====");

    catalogo.forEach((pokemon) => {
      console.log(
        `#${pokemon.id} - ${pokemon.nome} | Tipo: ${pokemon.tipos.join(", ")}`
      );
    });

  } catch (erro) {
    console.log("❌ Pokémon não encontrado.");
  }
}

main();