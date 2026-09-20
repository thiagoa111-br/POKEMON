import { PokemonApi } from "./pokemonApi";

export async function buscarPokemon(nome: string): Promise<PokemonApi> {

  const resposta = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${nome.toLowerCase()}`
  );

  if (!resposta.ok) {
    throw new Error(`Erro ao buscar o Pokémon: ${resposta.status}`);
  }

  const dados = await resposta.json() as PokemonApi;

  return dados;
}