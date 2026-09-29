import { PokemonApi } from "../models/pokemonApi";
import { PokemonResumo } from "../models/pokemonResumo";

export function mapearPokemon(dados: PokemonApi): PokemonResumo {
  return {
    id: dados.id,
    nome: dados.name,
    tipos: dados.types.map(item => item.type.name),
    altura: dados.height,
    peso: dados.weight,
    imagem: dados.sprites.front_default
  };
}
