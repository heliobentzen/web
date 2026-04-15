/**
 * PRÁTICA 01 – Escopo e Closures
 * Módulo 05 – JavaScript
 *
 * Como executar:
 *   1. Abra o DevTools do navegador (F12) → Console
 *   2. Copie e cole trechos no console para experimentar
 *   3. OU: execute com Node.js → node 01-escopo-closures.js
 */

console.log('=== PRÁTICA 01: Escopo e Closures ===\n')

// ══════════════════════════════════════════════════
// 1. VAR vs LET vs CONST
// ══════════════════════════════════════════════════

console.log('--- 1. var vs let vs const ---')

// var: escopo de função, pode ser redeclarado
var a = 1
var a = 2 // sem erro
console.log('var redeclarado:', a) // 2

// let: escopo de bloco, não pode redeclarar no mesmo escopo
let b = 1
// let b = 2 // SyntaxError: Identifier 'b' has already been declared

// const: imutável a referência, mas objetos/arrays são mutáveis
const CONFIG = { debug: false }
// CONFIG = {} // TypeError: Assignment to constant variable
CONFIG.debug = true // funciona! (modifica o objeto, não a referência)
console.log('const (objeto mutável):', CONFIG)

// const com array
const LISTA = [1, 2, 3]
LISTA.push(4) // funciona!
console.log('const (array mutável):', LISTA)

// ══════════════════════════════════════════════════
// 2. ESCOPO
// ══════════════════════════════════════════════════

console.log('\n--- 2. Escopo ---')

const global = 'global'

function externa() {
  const deExterna = 'externa'

  function interna() {
    const deInterna = 'interna'
    // Acessa variáveis de todos os escopos acima (scope chain)
    console.log(global, deExterna, deInterna)
  }

  interna()
  // console.log(deInterna) // ReferenceError
}
externa()

// Escopo de bloco com let/const
for (let i = 0; i < 3; i++) {
  const quadrado = i * i
  // i e quadrado existem apenas dentro do bloco do for
}
// console.log(i)       // ReferenceError
// console.log(quadrado) // ReferenceError

// Problema clássico com var em loops (var não tem escopo de bloco)
console.log('\nvar em loop (comportamento antigo):')
var funcoes1 = []
for (var i = 0; i < 3; i++) {
  funcoes1.push(() => console.log('var:', i))
}
funcoes1[0]() // 3 (i já avançou para 3!)
funcoes1[1]() // 3
funcoes1[2]() // 3

console.log('\nlet em loop (comportamento correto):')
const funcoes2 = []
for (let j = 0; j < 3; j++) {
  funcoes2.push(() => console.log('let:', j))
}
funcoes2[0]() // 0 (j é criado a cada iteração)
funcoes2[1]() // 1
funcoes2[2]() // 2

// ══════════════════════════════════════════════════
// 3. HOISTING
// ══════════════════════════════════════════════════

console.log('\n--- 3. Hoisting ---')

// Funções declaradas são totalmente hoisted
console.log(saudar('Mundo')) // Funciona! A função foi elevada
function saudar(nome) {
  return `Olá, ${nome}!`
}

// var é declarada (undefined) mas não inicializada
console.log(typeof varHoisted)  // 'undefined' (não ReferenceError)
var varHoisted = 'valor'
console.log(varHoisted) // 'valor'

// let/const: Temporal Dead Zone (TDZ)
try {
  console.log(letHoisted)  // ReferenceError!
} catch (e) {
  console.log('TDZ (let):', e.message)
}
let letHoisted = 'valor'

// ══════════════════════════════════════════════════
// 4. CLOSURES
// ══════════════════════════════════════════════════

console.log('\n--- 4. Closures ---')

// Uma closure é uma função que "lembra" do escopo onde foi criada

// Exemplo 1: contador
function criarContador(valorInicial = 0) {
  let count = valorInicial // variável "privada"

  return {
    incrementar: (n = 1) => { count += n; return count },
    decrementar: (n = 1) => { count -= n; return count },
    resetar: () => { count = valorInicial; return count },
    valor: () => count,
  }
}

const contadorA = criarContador(0)
const contadorB = criarContador(100)

contadorA.incrementar()
contadorA.incrementar()
contadorA.incrementar(5)
console.log('Contador A:', contadorA.valor()) // 7

contadorB.decrementar(10)
console.log('Contador B:', contadorB.valor()) // 90

// Cada closure tem sua própria cópia de `count`
console.log('Independentes:', contadorA.valor(), contadorB.valor())

// Exemplo 2: função com memória (memoização)
function criarMemoizado(fn) {
  const cache = new Map()

  return function(...args) {
    const chave = JSON.stringify(args)

    if (cache.has(chave)) {
      console.log(`Cache hit para: ${chave}`)
      return cache.get(chave)
    }

    const resultado = fn(...args)
    cache.set(chave, resultado)
    return resultado
  }
}

function fatorial(n) {
  if (n <= 1) return 1
  return n * fatorial(n - 1)
}

const fatorialMemo = criarMemoizado(fatorial)
console.log(fatorialMemo(5))  // calcula: 120
console.log(fatorialMemo(5))  // cache hit: 120
console.log(fatorialMemo(6))  // calcula: 720

// Exemplo 3: módulo com encapsulamento
const BancoDeNome = (() => {
  const nomes = [] // privado

  return {
    adicionar(nome) {
      if (nomes.includes(nome)) {
        throw new Error(`Nome "${nome}" já existe`)
      }
      nomes.push(nome)
      return this
    },
    remover(nome) {
      const idx = nomes.indexOf(nome)
      if (idx === -1) throw new Error(`Nome "${nome}" não encontrado`)
      nomes.splice(idx, 1)
      return this
    },
    listar: () => [...nomes], // retorna cópia (imutável para o exterior)
    total: () => nomes.length,
  }
})()

BancoDeNome.adicionar('Alice').adicionar('Bob').adicionar('Carlos')
console.log('\nBanco de nomes:', BancoDeNome.listar())
console.log('Total:', BancoDeNome.total())

// ══════════════════════════════════════════════════
// 5. CURRYING E COMPOSIÇÃO
// ══════════════════════════════════════════════════

console.log('\n--- 5. Currying e Composição ---')

// Currying: transformar função(a, b) em função(a)(b)
const multiplicar = (a) => (b) => a * b

const dobrar  = multiplicar(2)
const triplicar = multiplicar(3)
const dezVezes = multiplicar(10)

console.log('Dobrado de 5:', dobrar(5))       // 10
console.log('Triplicado de 4:', triplicar(4)) // 12
console.log([1,2,3,4,5].map(dobrar))           // [2,4,6,8,10]

// Composição de funções
const compor = (...fns) => (valor) => fns.reduceRight((acc, fn) => fn(acc), valor)
const encadear = (...fns) => (valor) => fns.reduce((acc, fn) => fn(acc), valor)

const adicionarPrefix = (s) => `>>> ${s}`
const maiusculas = (s) => s.toUpperCase()
const limpar = (s) => s.trim()

const processar = encadear(limpar, maiusculas, adicionarPrefix)
console.log(processar('  olá mundo  ')) // '>>> OLÁ MUNDO'

// ══════════════════════════════════════════════════
// 6. EXERCÍCIOS
// ══════════════════════════════════════════════════

console.log('\n--- 6. Exercícios ---')

/**
 * EXERCÍCIO 1: Crie uma função `criarEmpilhamento` que retorna um objeto
 * com métodos `empurrar`, `desempilhar`, `topo` e `tamanho`.
 * O array interno deve ser privado (inacessível de fora).
 */
function criarEmpilhamento() {
  // TODO: implementar
}

/**
 * EXERCÍCIO 2: Implemente `uma_vez(fn)` – retorna uma versão de fn
 * que executa apenas na primeira chamada.
 */
function umaVez(fn) {
  // TODO: implementar
}

/**
 * EXERCÍCIO 3: Implemente `atrasar(fn, ms)` – retorna uma versão de fn
 * que aguarda `ms` milissegundos antes de executar.
 */
function atrasar(fn, ms) {
  // TODO: implementar
}

/**
 * EXERCÍCIO 4: Implemente `debounce(fn, ms)` – retorna uma versão de fn
 * que só executa após `ms` ms de silêncio (sem ser chamada novamente).
 * (Útil para pesquisa ao digitar)
 */
function debounce(fn, ms) {
  // TODO: implementar
}

// Gabarito (descomente para ver as respostas):
/*
function criarEmpilhamento() {
  const pilha = []
  return {
    empurrar: (item) => pilha.push(item),
    desempilhar: () => pilha.pop(),
    topo: () => pilha[pilha.length - 1],
    tamanho: () => pilha.length,
  }
}

function umaVez(fn) {
  let chamado = false
  let resultado
  return (...args) => {
    if (!chamado) {
      chamado = true
      resultado = fn(...args)
    }
    return resultado
  }
}

function atrasar(fn, ms) {
  return (...args) => setTimeout(() => fn(...args), ms)
}

function debounce(fn, ms) {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => fn(...args), ms)
  }
}
*/

console.log('\n✅ Prática 01 concluída! Verifique o console para os resultados.')
