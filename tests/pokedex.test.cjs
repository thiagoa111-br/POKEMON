const { test } = require('node:test');
const assert = require('node:assert/strict');
const { buscarPokemon } = require('../dist/services/buscarPokemon');
const { CatalogoPokemon } = require('../dist/services/catalogo');

const resposta = {
  id: 25, name: 'pikachu', height: 4, weight: 60,
  types: [{ type: { name: 'electric' } }],
  sprites: { front_default: 'pikachu.png' }
};

test('busca por nome e ID retorna o objeto simplificado', async (t) => {
  const urls = [];
  t.mock.method(globalThis, 'fetch', async (url) => {
    urls.push(url);
    return new Response(JSON.stringify(resposta), { status: 200 });
  });
  for (const consulta of [' Pikachu ', '25']) {
    assert.deepEqual(await buscarPokemon(consulta), {
      id: 25, nome: 'pikachu', altura: 4, peso: 60,
      tipos: ['electric'], imagem: 'pikachu.png'
    });
  }
  assert.deepEqual(urls, [
    'https://pokeapi.co/api/v2/pokemon/pikachu',
    'https://pokeapi.co/api/v2/pokemon/25'
  ]);
});

test('404 retorna null e uma busca posterior funciona', async (t) => {
  t.mock.method(globalThis, 'fetch', async (url) =>
    url.endsWith('pokemon-inexistente')
      ? new Response('', { status: 404 })
      : new Response(JSON.stringify(resposta), { status: 200 })
  );
  assert.equal(await buscarPokemon('pokemon-inexistente'), null);
  assert.equal((await buscarPokemon('pikachu')).id, 25);
});

test('falhas de rede, HTTP e JSON retornam null', async (t) => {
  const fetchMock = t.mock.method(globalThis, 'fetch', async () => {
    throw new Error('Sem conexão');
  });
  assert.equal(await buscarPokemon('pikachu'), null);
  fetchMock.mock.mockImplementation(async () => new Response('', { status: 500 }));
  assert.equal(await buscarPokemon('pikachu'), null);
  fetchMock.mock.mockImplementation(async () => new Response('JSON inválido'));
  assert.equal(await buscarPokemon('pikachu'), null);
});

test('catálogo bloqueia ID duplicado, lista e remove', (t) => {
  const mensagens = [];
  t.mock.method(console, 'log', (mensagem) => mensagens.push(mensagem));
  const catalogo = new CatalogoPokemon();
  const pokemon = {
    id: 25, nome: 'pikachu', tipos: ['electric'],
    altura: 4, peso: 60, imagem: 'pikachu.png'
  };
  catalogo.listar();
  assert.ok(mensagens.includes('O catálogo está vazio.'));
  catalogo.adicionar(pokemon);
  catalogo.adicionar({ ...pokemon, nome: 'outro nome' });
  assert.ok(mensagens.some((m) => m.includes('já está no catálogo')));
  mensagens.length = 0;
  catalogo.listar();
  assert.equal(mensagens.filter((m) => m.startsWith('#25')).length, 1);
  catalogo.remover(999);
  assert.ok(mensagens.some((m) => m.includes('999 não encontrado')));
  catalogo.remover(25);
  mensagens.length = 0;
  catalogo.listar();
  assert.ok(mensagens.includes('O catálogo está vazio.'));
});
