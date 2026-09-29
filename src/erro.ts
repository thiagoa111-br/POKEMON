import { buscarPokemon } from "./services/buscarPokemon";

export async function testarErro(): Promise<void> {
  // A busca já trata a falha e retorna null.
  await buscarPokemon("pokemonquenaoexiste");
}
