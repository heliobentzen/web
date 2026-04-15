/**
 * PRÁTICA 02 – Arrays e Objetos
 * Módulo 05 – JavaScript
 *
 * Como executar:
 *   node 02-arrays-objetos.js
 *   OU: cole trechos no console do navegador
 */

console.log('=== PRÁTICA 02: Arrays e Objetos ===\n')

// ══════════════════════════════════════════════════
// 1. MÉTODOS FUNCIONAIS DE ARRAY
// ══════════════════════════════════════════════════

console.log('--- 1. Métodos Funcionais ---')

const produtos = [
  { id: 1, nome: 'Notebook',    preco: 3500, categoria: 'Tech',   estoque: 15, ativo: true  },
  { id: 2, nome: 'Mouse',        preco: 80,   categoria: 'Tech',   estoque: 120,ativo: true  },
  { id: 3, nome: 'Monitor',      preco: 1200, categoria: 'Tech',   estoque: 0,  ativo: false },
  { id: 4, nome: 'Cadeira',      preco: 800,  categoria: 'Móveis', estoque: 30, ativo: true  },
  { id: 5, nome: 'Mesa',         preco: 600,  categoria: 'Móveis', estoque: 10, ativo: true  },
  { id: 6, nome: 'Headset',      preco: 250,  categoria: 'Tech',   estoque: 45, ativo: true  },
  { id: 7, nome: 'Webcam',       preco: 400,  categoria: 'Tech',   estoque: 0,  ativo: false },
  { id: 8, nome: 'Teclado',      preco: 300,  categoria: 'Tech',   estoque: 80, ativo: true  },
]

// filter: produtos em estoque e ativos
const disponiveis = produtos.filter(p => p.ativo && p.estoque > 0)
console.log('Disponíveis:', disponiveis.map(p => p.nome))

// map: apenas nomes e preços formatados
const catalogo = disponiveis.map(p => ({
  nome: p.nome,
  preco: p.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
}))
console.log('Catálogo:', catalogo)

// reduce: valor total em estoque
const valorTotal = produtos.reduce((total, p) => total + (p.preco * p.estoque), 0)
console.log('Valor total em estoque: R$', valorTotal.toFixed(2))

// find e findIndex
const notebook = produtos.find(p => p.nome === 'Notebook')
const indiceNotebook = produtos.findIndex(p => p.nome === 'Notebook')
console.log('Notebook encontrado:', notebook)
console.log('Índice do Notebook:', indiceNotebook)

// some e every
const algumForaEstoque = produtos.some(p => p.estoque === 0)
const todosAtivos = produtos.every(p => p.ativo)
console.log('Algum fora de estoque:', algumForaEstoque) // true
console.log('Todos ativos:', todosAtivos)               // false

// sort: por preço crescente (sem mutar o original)
const porPreco = [...produtos]
  .filter(p => p.ativo)
  .sort((a, b) => a.preco - b.preco)
console.log('Por preço:', porPreco.map(p => `${p.nome}:R$${p.preco}`))

// flat e flatMap
const categorias = [['Tech', 'Móveis'], ['Periféricos']]
const todasCategorias = categorias.flat()
console.log('Flat:', todasCategorias)

const combinados = produtos.flatMap(p => [p.nome, p.categoria])
console.log('FlatMap (primeiros 6):', combinados.slice(0, 6))

// ── Agrupamento com reduce ──
const porCategoria = produtos.reduce((acc, produto) => {
  const cat = produto.categoria
  if (!acc[cat]) acc[cat] = []
  acc[cat].push(produto.nome)
  return acc
}, {})
console.log('\nPor categoria:', porCategoria)

// Object.groupBy (moderno – ES2024)
// const agrupado = Object.groupBy(produtos, p => p.categoria)

// ══════════════════════════════════════════════════
// 2. DESESTRUTURAÇÃO
// ══════════════════════════════════════════════════

console.log('\n--- 2. Desestruturação ---')

// Array
const [primeiro, segundo, ...resto] = [10, 20, 30, 40, 50]
console.log(primeiro, segundo, resto) // 10 20 [30, 40, 50]

// Trocar valores sem variável auxiliar
let x = 1, y = 2;
[x, y] = [y, x]
console.log('Swap:', x, y) // 2 1

// Objeto
const { nome, preco, categoria, estoque: qtd = 0 } = produtos[0]
console.log(nome, preco, categoria, qtd)

// Desestruturação aninhada
const config = {
  servidor: {
    host: 'localhost',
    porta: 3000,
    tls: { ativo: true, certificado: 'cert.pem' }
  }
}
const { servidor: { host, porta, tls: { ativo } } } = config
console.log(host, porta, ativo)

// Parâmetros de função
function exibirProduto({ nome, preco, estoque = 0, categoria = 'Geral' }) {
  console.log(`${nome} | R$ ${preco} | Estoque: ${estoque} | ${categoria}`)
}
exibirProduto(produtos[0])
exibirProduto({ nome: 'Teste', preco: 99 }) // usa defaults

// ══════════════════════════════════════════════════
// 3. SPREAD E REST
// ══════════════════════════════════════════════════

console.log('\n--- 3. Spread e Rest ---')

// Spread em arrays
const numeros1 = [1, 2, 3]
const numeros2 = [4, 5, 6]
const todos = [...numeros1, 0, ...numeros2] // [1, 2, 3, 0, 4, 5, 6]
console.log('Spread array:', todos)

const max = Math.max(...numeros1, ...numeros2)
console.log('Máximo:', max)

// Spread em objetos
const base = { ativo: true, versao: 1 }
const extendido = { ...base, nome: 'Produto X', versao: 2 } // versao sobrescreve
console.log('Spread objeto:', extendido)

// Copiar e modificar imutavelmente
const produto = produtos[0]
const produtoAtualizado = { ...produto, preco: produto.preco * 1.1, estoque: produto.estoque - 1 }
console.log('Produto original (não mudou):', produto.preco)
console.log('Produto atualizado:', produtoAtualizado.preco.toFixed(2))

// Rest em função
function log(nivel, ...mensagens) {
  console.log(`[${nivel.toUpperCase()}]`, ...mensagens)
}
log('info', 'Sistema iniciado', 'Versão', '1.0')
log('erro', 'Falha na conexão')

// ══════════════════════════════════════════════════
// 4. MAP E SET
// ══════════════════════════════════════════════════

console.log('\n--- 4. Map e Set ---')

// Set: remover duplicatas
const tags = ['html', 'css', 'js', 'html', 'css', 'ts', 'js']
const tagsUnicas = [...new Set(tags)]
console.log('Tags únicas:', tagsUnicas)

// Set como coleção de IDs
const idsVendidos = new Set([1, 2, 5, 8, 2, 5])
console.log('IDs vendidos:', [...idsVendidos])
console.log('ID 3 foi vendido?', idsVendidos.has(3))

// Intersecção de conjuntos
const grupo1 = new Set([1, 2, 3, 4])
const grupo2 = new Set([3, 4, 5, 6])
const intersecao = new Set([...grupo1].filter(x => grupo2.has(x)))
const uniao = new Set([...grupo1, ...grupo2])
const diferenca = new Set([...grupo1].filter(x => !grupo2.has(x)))
console.log('Interseção:', [...intersecao])
console.log('União:', [...uniao])
console.log('Diferença:', [...diferenca])

// Map: dados estruturados
const cache = new Map()
cache.set('user:1', { nome: 'Alice', role: 'admin' })
cache.set('user:2', { nome: 'Bob', role: 'editor' })
cache.set('config', { tema: 'escuro', idioma: 'pt-BR' })

console.log('User 1:', cache.get('user:1'))
console.log('Tamanho do cache:', cache.size)

// Iterar sobre Map
for (const [chave, valor] of cache) {
  console.log(`${chave}:`, valor)
}

// Map a partir de array
const produtoPorId = new Map(produtos.map(p => [p.id, p]))
console.log('Produto ID 3:', produtoPorId.get(3))

// ══════════════════════════════════════════════════
// 5. OPTIONAL CHAINING E NULLISH COALESCING
// ══════════════════════════════════════════════════

console.log('\n--- 5. Optional Chaining e Nullish Coalescing ---')

const usuario = {
  nome: 'Carlos',
  endereco: {
    cidade: 'São Paulo',
    cep: null,
  },
  // telefone: undefined
}

// Optional chaining (?.)
console.log(usuario.endereco?.cidade)       // 'São Paulo'
console.log(usuario.endereco?.bairro)       // undefined (sem erro)
console.log(usuario.telefone?.ddd)          // undefined (sem erro)
console.log(usuario.historico?.[0])         // undefined
console.log(usuario.formatar?.())           // undefined (sem erro)

// Nullish coalescing (??)
// Retorna o lado direito apenas se o esquerdo for null ou undefined
const cidade    = usuario.endereco?.cidade    ?? 'Cidade não informada'
const bairro    = usuario.endereco?.bairro    ?? 'Bairro não informado'
const cep       = usuario.endereco?.cep       ?? 'CEP não informado'

console.log(cidade, bairro, cep)

// Diferença entre ?? e ||
const valor = 0
console.log(valor || 'padrão')   // 'padrão' (0 é falsy)
console.log(valor ?? 'padrão')   // 0 (0 não é null/undefined)

// ??= (atribuição com coalesce)
usuario.apelido ??= 'Sem apelido'
console.log(usuario.apelido)

// ══════════════════════════════════════════════════
// 6. EXERCÍCIOS
// ══════════════════════════════════════════════════

console.log('\n--- 6. Exercícios ---')

/**
 * EXERCÍCIO 1:
 * Dado o array de produtos acima, retorne um relatório com:
 * { totalProdutos, totalAtivos, mediaPreco, produtoMaisCaro, produtoMaisBarato }
 */
function gerarRelatorio(produtos) {
  // TODO: implmentar
}

/**
 * EXERCÍCIO 2:
 * Implemente `groupBy(array, fn)` que agrupa um array de objetos
 * por uma chave retornada pela função fn.
 * groupBy(produtos, p => p.categoria) deve retornar:
 * { 'Tech': [...], 'Móveis': [...] }
 */
function groupBy(array, fn) {
  // TODO: implementar
}

/**
 * EXERCÍCIO 3:
 * Implemente `countBy(array, fn)` que conta ocorrências por chave.
 * countBy(produtos, p => p.categoria) → { 'Tech': 6, 'Móveis': 2 }
 */
function countBy(array, fn) {
  // TODO: implementar
}

/**
 * EXERCÍCIO 4:
 * Crie uma função `buscar(produtos, termo)` que filtra produtos
 * cujo nome contenha o termo (case-insensitive).
 */
function buscar(produtos, termo) {
  // TODO: implementar
}

// Gabarito:
/*
function gerarRelatorio(produtos) {
  const ativos = produtos.filter(p => p.ativo)
  const precos = produtos.map(p => p.preco)
  return {
    totalProdutos: produtos.length,
    totalAtivos: ativos.length,
    mediaPreco: precos.reduce((s, p) => s + p, 0) / precos.length,
    produtoMaisCaro: produtos.reduce((max, p) => p.preco > max.preco ? p : max).nome,
    produtoMaisBarato: produtos.reduce((min, p) => p.preco < min.preco ? p : min).nome,
  }
}

function groupBy(array, fn) {
  return array.reduce((acc, item) => {
    const chave = fn(item)
    if (!acc[chave]) acc[chave] = []
    acc[chave].push(item)
    return acc
  }, {})
}

function countBy(array, fn) {
  return array.reduce((acc, item) => {
    const chave = fn(item)
    acc[chave] = (acc[chave] || 0) + 1
    return acc
  }, {})
}

function buscar(produtos, termo) {
  return produtos.filter(p =>
    p.nome.toLowerCase().includes(termo.toLowerCase())
  )
}
*/

console.log('\n✅ Prática 02 concluída!')
