import { PokemonApi } from "../models/pokemonApi";
import { PokemonResumo } from "../models/pokemonResumo";
import { mapearPokemon } from "../utils/mapearPokemon";

export async function buscarPokemon(nomeOuId: string): Promise<PokemonResumo | null> {
  const consulta = nomeOuId.trim().toLowerCase();
  try {
    if (!consulta) {
      console.log("[ERRO] Informe um nome ou ID de Pokémon.");
      return null;
    }
    const resposta = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(consulta)}`,
      { signal: AbortSignal.timeout(10000) }
    );
    if (resposta.status === 404) {
      console.log(`[ERRO] Pokémon não encontrado: ${consulta}`);
      return null;
    }
    if (!resposta.ok) {
      throw new Error(`HTTP ${resposta.status}`);
    }
    const dados = await resposta.json() as PokemonApi;
    const pokemon = mapearPokemon(dados);
    console.log(`[OK] Pokémon encontrado: ${pokemon.nome}`);
    return pokemon;
  } catch (erro) {
    const mensagem = erro instanceof Error ? erro.message : String(erro);
    console.log(`[ERRO] Não foi possível buscar o Pokémon: ${mensagem}`);
    return null;
  }
}
