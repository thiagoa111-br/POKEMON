import { PokemonResumo } from "../models/pokemonResumo";

// A classe reúne os dados e as operações do catálogo.
export class CatalogoPokemon {
  // Cada instância possui seu próprio array, acessível apenas pela classe.
  private pokemons: PokemonResumo[] = [];

  adicionar(pokemon: PokemonResumo): void {
    const jaExiste = this.pokemons.some(
      (item) => item.id === pokemon.id
    );

    if (jaExiste) {
      console.log(`[AVISO] ${pokemon.nome} já está no catálogo.`);
      return;
    }

    this.pokemons.push(pokemon);
    console.log(`[OK] ${pokemon.nome} adicionado ao catálogo.`);
  }

  listar(): void {
    console.log("\n📚 Catálogo de Pokémon:");

    if (this.pokemons.length === 0) {
      console.log("O catálogo está vazio.");
      return;
    }

    this.pokemons.forEach((pokemon) => {
      console.log(`#${pokemon.id} - ${pokemon.nome}`);
      console.log(`  Tipos: ${pokemon.tipos.join(", ")}`);
      console.log(`  Altura: ${pokemon.altura}`);
      console.log(`  Peso: ${pokemon.peso}`);
      console.log(`  Imagem: ${pokemon.imagem}`);
    });
  }

  remover(id: number): void {
    const existe = this.pokemons.some(
      (pokemon) => pokemon.id === id
    );

    if (!existe) {
      console.log(`[AVISO] Pokémon com ID ${id} não encontrado.`);
      return;
    }

    // Mantém apenas os Pokémon com ID diferente do informado.
    this.pokemons = this.pokemons.filter(
      (pokemon) => pokemon.id !== id
    );

    console.log(`[OK] Pokémon com ID ${id} removido.`);
  }
}