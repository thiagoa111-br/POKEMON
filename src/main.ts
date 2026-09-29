import { buscarPokemon } from "./services/buscarPokemon";
import { CatalogoPokemon } from "./services/catalogo";

async function main(): Promise<void> {
  // Cria o catálogo que será utilizado nesta execução.
  const catalogo = new CatalogoPokemon();

  try {
    const nomesPokemon = [
      "pidgey",
      "pikachu",
      "pokemon-inexistente", // A falha não impede as próximas buscas.
      "charmander",
      "squirtle",
      "bulbasaur",
      "pikachu" // Repetido para demonstrar o bloqueio de duplicidade.
    ];

    for (const nome of nomesPokemon) {
      const pokemonResumo = await buscarPokemon(nome);
      if (pokemonResumo === null) {
        continue;
      }

      // A inclusão passa pela validação da classe.
      catalogo.adicionar(pokemonResumo);
    }

    catalogo.listar();

    catalogo.remover(25);

    // Mostra o catálogo após remover o Pikachu.
    catalogo.listar();
  } catch (erro) {
    console.log(
      "❌ Erro ao executar o fluxo:",
      erro instanceof Error ? erro.message : String(erro)
    );
  }
}

main();
