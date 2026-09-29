# Pokédex TypeScript Lite

Aplicação de terminal que consulta a PokeAPI por nome ou ID, transforma a resposta e organiza Pokémon em um catálogo em memória. O objetivo é praticar TypeScript, interfaces, classes, métodos de array, JSON e programação assíncrona.

## Tecnologias e pré-requisitos

- Node.js 22 ou superior e npm.
- TypeScript, instalado como dependência de desenvolvimento.
- Git para clonar o repositório.
- Acesso à internet para consultar a PokeAPI durante a execução real.

## Instalação

```sh
git clone https://github.com/thiagoa111-br/POKEMON.git
cd POKEMON
npm ci
```

## Execução

```sh
npm start
```

O comando compila o TypeScript e executa `dist/main.js`. A demonstração é automática, sem entrada interativa: busca Pokémon, testa nome inválido e duplicidade, lista, remove o ID 25 e lista novamente.

| Comando | Função |
| --- | --- |
| `npm run build` | Compilar `src` para `dist` |
| `npm start` | Compilar e executar |
| `npm run dev` | Mesmo fluxo de start, sem modo watch |
| `npm test` | Compilar e executar testes com respostas simuladas |

## Arquitetura

```text
src/
  main.ts
  models/
    pokemonApi.ts
    pokemonResumo.ts
  services/
    buscarPokemon.ts
    catalogo.ts
  utils/
    mapearPokemon.ts
  erro.ts
  personagem.ts
tests/
  pokedex.test.cjs
```

- `main.ts`: cria a instância do catálogo e coordena a demonstração.
- `models`: interfaces para os dados externos e o objeto simplificado.
- `buscarPokemon.ts`: usa fetch e async/await, mapeia a resposta e retorna `PokemonResumo | null`. Trata 404, outros erros HTTP, falha de rede e leitura de JSON com try/catch. Cada requisição tem limite de 10 segundos.
- `catalogo.ts`: classe `CatalogoPokemon`, com array privado e métodos adicionar, listar e remover. Impede IDs duplicados.
- `mapearPokemon.ts`: função tipada que transforma os dados da API em ID, nome, tipos, altura, peso e imagem. Altura e peso mantêm os valores originais da API.
- `erro.ts`: função auxiliar de demonstração de busca inválida; o fluxo principal já demonstra esse caso.
- `personagem.ts`: exercício anterior de classe, não utilizado na execução da Pokédex.
- `tests`: testes automatizados sem dependência de rede.

O catálogo dura apenas durante a execução. Não há persistência em arquivo.

## Conceitos aplicados

As interfaces descrevem parâmetros, propriedades e retornos. A classe encapsula o array com `private`; `this` acessa os dados da instância. A busca retorna uma Promise, aguardada com await; o chamador verifica null antes de adicionar.

| Método de array | Uso |
| --- | --- |
| map | Extrair nomes de tipos da resposta |
| some | Verificar duplicidade e existência para remoção |
| forEach | Exibir cada Pokémon |
| filter | Manter os itens diferentes do ID removido |

## Exemplos de execução

Os trechos abaixo são saídas esperadas. Os cenários também são verificados por testes com fetch simulado; isso não comprova disponibilidade da API externa.

### Busca válida

Entrada: `pikachu` (também aceita `25`). Trecho esperado da busca e listagem:

```text
[OK] Pokémon encontrado: pikachu
[OK] pikachu adicionado ao catálogo.
#25 - pikachu
  Tipos: electric
  Altura: 4
  Peso: 60
```

### Busca inválida

Entrada: `pokemon-inexistente`.

```text
[ERRO] Pokémon não encontrado: pokemon-inexistente
```

A função retorna null e a demonstração continua com o próximo nome.

### Duplicidade

Entrada: adicionar Pikachu duas vezes.

```text
[AVISO] pikachu já está no catálogo.
```

O catálogo mantém apenas um registro com ID 25.

### Remoção

Entrada: `catalogo.remover(25)`.

```text
[OK] Pokémon com ID 25 removido.
```

A listagem seguinte não contém Pikachu. Um ID ausente gera aviso, sem remover outros itens.

## Testes

`npm test` verifica busca por nome e ID, normalização da entrada, mapeamento, retorno null no 404 e em falhas HTTP/rede/JSON, continuidade após busca inválida, catálogo vazio, bloqueio por ID, listagem e remoção.

Para conferir a integração real, execute `npm start` com internet e compare com os exemplos acima.

## Organização, Git e entrega

- Link do Kanban: pendente de criação e publicação pelo autor.
- Etapas sugeridas do quadro: A fazer, Em andamento, Concluído.
- Tarefas: configuração, interfaces, busca e erros, mapeamento, catálogo, duplicidade, testes e documentação.
- Histórico anterior: três commits na branch main; não foi reescrito.
- Branches locais utilizadas: main, develop, feat/pokedex (código e testes) e docs/readme (documentação). As alterações são integradas em develop e main por fast-forward.
- Dois commits semânticos novos registram código/testes e documentação, totalizando cinco commits. Publicação dessas branches no GitHub ainda pendente.
- Para squad, o enunciado solicita feat/api-pokemon e feat/catalogo e ao menos seis commits; para individual, ao menos quatro.

## Pontos a confirmar com o professor

O enunciado contém versões conflitantes: RF07 e a tabela técnica dispensam persistência, enquanto a seção de arquitetura exige pc_box.json; RF13 dispensa menu, enquanto a arquitetura pede um loop; também há conflito sobre vídeo e campos de combate. Esta implementação segue o catálogo em memória dos requisitos funcionais. Confirmar essas exigências antes da entrega, além de publicar o Kanban, conferir a visibilidade pública do repositório e enviar os links no AVA.
