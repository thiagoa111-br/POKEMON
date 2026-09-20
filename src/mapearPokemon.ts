import { PokemonApi } from "./pokemonApi";
import { PokemonResumo } from "./pokemonResumo";

export function mapearPokemon(dados: PokemonApi): PokemonResumo {
  return {
    id: dados.id,
    nome: dados.name,
    tipos: dados.types.map(item => item.type.name),
    imagem: dados.sprites.front_default
  };
}