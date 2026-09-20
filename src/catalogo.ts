import { PokemonResumo } from "./pokemonResumo";

export const catalogo: PokemonResumo[] = [];

export function listarCatalogo(): void {
  console.log("\n📚 Catálogo de Pokémon:");

  if (catalogo.length === 0) {
    console.log("O catálogo está vazio.");
    return;
  }

  catalogo.forEach((pokemon) => {
    console.log(`- ${pokemon.nome} (ID: ${pokemon.id})`);
    console.log(`  Tipos: ${pokemon.tipos.join(", ")}`);
    console.log(`  Imagem: ${pokemon.imagem}`);
  });
}

export function removerPokemon(id: number): void {
  const indice = catalogo.findIndex(
    (pokemon) => pokemon.id === id
  );

  if (indice === -1) {
    console.log(`❌ Pokémon com ID ${id} não encontrado.`);
    return;
  }

  const removido = catalogo.splice(indice, 1);

  console.log(
    `\n🗑️ ${removido[0].nome} foi removido do catálogo.`
  );
}